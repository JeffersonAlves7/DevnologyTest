const puppeteer = require("puppeteer");

async function main() {
  const link =
    "https://webscraper.io/test-sites/e-commerce/allinone/computers/laptops";
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(link);

  const produtos = await page.evaluate(function () {
    const all = document.querySelectorAll("div.col-sm-4 > .thumbnail");

    //1) Buscar produtos na página inicial, já salvando as informações
    //que serão necessárias mais para frente.
    const produtos = [];
    for (let i = 0; i < all.length; i++) {
      produtos.push({
        image: all[i].children[0].src,
        href: all[i].children[1].children[1].children[0].href,
        title: all[i].children[1].children[1].children[0].title,
        description: all[i].children[1].children[2].innerText,
        buy_options: [
          {
            price: all[i].children[1].children[0].innerText,
            hdd: "",
            disabled: false,
          },
        ],
        ratings: all[i].children[2].children[0].innerText,
        stars: all[i].children[2].children[1].dataset.rating
      });
    }
    //Filtrar pela marca
    const marca = "lenovo";
    return produtos.filter(
      ({ title, description }) =>
        title.toLowerCase().indexOf(marca) > -1 ||
        description.toLowerCase().indexOf(marca) > -1
    );
  });
  //2)Loop para acessar cada produto do array de produtos
  //Selecionar os botões de cada tipo de HD e seus valores
  for (let i = 0; i < produtos.length; i++) {
    const produto = produtos[i];
    await page.goto(produto.href);

    const buy_options = await page.evaluate(() => {
      const buttons = document.querySelectorAll(".swatches > button");

      const values = [];
      for (let i of buttons) {
        i.click()
        values.push({
          price: document.querySelector(".caption > .price").innerText,
          hdd: i.value,
          disabled: i.classList.contains("disabled"),
        });
      }
      return values;
    });
    produtos[i] = { ...produto, buy_options };
  }

  await browser.close();
  produtos.sort((a, b) => (
    Number(a.buy_options[0].price.replace("$", '')) - Number(b.buy_options[0].price.replace("$", ''))
  ))
  console.log(produtos)
  return produtos;
}
module.exports = main;