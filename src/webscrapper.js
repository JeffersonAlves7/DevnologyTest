const puppeteer = require("puppeteer");

async function main(marca = "lenovo") {
  const link =
    "https://webscraper.io/test-sites/e-commerce/allinone/computers/laptops";

  const headless = true; // false => showBrowser; true => dontShowBrowser

  const browser = await puppeteer.launch({ headless });
  const page = await browser.newPage();
  await page.goto(link);

  //Colher todas as informações de itens na página principal de notebooks
  const pd = await page.evaluate(function () {
    const all = document.querySelectorAll("div.col-sm-4 > .thumbnail");
    const produtos = [];
    for (let i = 0; i < all.length; i++) {
      produtos.push({
        image: all[i].children[0].src,
        href: all[i].children[1].children[1].children[0].href,
        title: all[i].children[1].children[1].children[0].title,
        description: all[i].children[1].children[2].innerText,
        ratings: all[i].children[2].children[0].innerText,
        stars: all[i].children[2].children[1].dataset.rating,
      });
    }
    return produtos;
  });

  //Filtrar os produtos pela marca enviada pelo usuário
  //Levando em conta tanto o título quanto a descrição do item
  const produtos = pd.filter(
    ({ title, description }) =>
      title.toLowerCase().indexOf(marca) > -1 ||
      description.toLowerCase().indexOf(marca) > -1
  );

  //Acessando a página de cada item para colher informações de compra,
  //dentre elas o preço, os tipos de hdd e se está ou não desabilitado para escolha do usuário
  for (let i = 0; i < produtos.length; i++) {
    const produto = produtos[i];
    await page.goto(produto.href);

    const buy_options = await page.evaluate(() => {
      const buttons = document.querySelectorAll(".swatches > button");

      const values = [];
      for (let j = 0; j < buttons.length; j++) {
        const button = buttons[j]
        button.click();
        values.push({
          price: document.querySelector(".caption > .price").innerText,
          hdd: button.value,
          disabled: button.classList.contains("disabled"),
        });
      }
      return values;
    });
    produtos[i] = { ...produto, buy_options };
  }

  await browser.close();

  //Ordenando do menor preço para o maior
  produtos.sort(
    (a, b) =>
      Number(a.buy_options[0].price.replace("$", "")) -
      Number(b.buy_options[0].price.replace("$", ""))
  );
  console.log(produtos)
  return produtos;
}
main()
// module.exports = main;
