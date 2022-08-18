<h1>Como utilizar?</h1>
<ol>
  <li>
    <p><code>npm install</code> para instalar as dependências</p>
  </li>
  <li>
    <p><code>npm start</code> para iniciar o server</p>
  </li>
  <li>
    <p>Acesse <a href="http://localhost:8080?marca=lenovo" target="_blank">http://localhost:8080?marca=lenovo</a> no seu navegador </p>
  </li>
  <li>
    <p>Trocando a marca 'lenovo' para outra qualquer, você poderá ter acesso a outros itens</p>
  </li>
  <li>
    <p>Agora é só aguardar a resposta do servidor &#128077</p>
  </li>
</ol>

<p style="text-decoration: underline">Abaixo está um exemplo de resposta desse crawler:</p>

```json
{
  "notebooks": [
    {
      "notebook": {
        "image": "https://webscraper.io/images/test-sites/e-commerce/items/cart2.png",
        "href": "https://webscraper.io/test-sites/e-commerce/allinone/product/548",
        "title": "Lenovo V110-15IAP",
        "description": "Lenovo V110-15IAP, 15.6\" HD, Celeron N3350 1.1GHz, 4GB, 128GB SSD, Windows 10 Home",
        "ratings": "5 reviews",
        "stars": "3",
        "buy_options": [
          {
            "price": "$321.94",
            "hdd": "128",
            "disabled": false
          },
          {
            "price": "$341.94",
            "hdd": "256",
            "disabled": false
          },
          {
            "price": "$361.94",
            "hdd": "512",
            "disabled": false
          },
          {
            "price": "$381.94",
            "hdd": "1024",
            "disabled": true
          }
        ],
        "marca": "lenovo"
      }
    },
  ]
}
```