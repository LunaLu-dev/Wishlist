import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

export interface Items {
  code_name: string;
  img_url: string;
  title: string;
  url: string;
  price: number;
  category: string;
}

@Component({
  selector: 'app-items', imports: [], templateUrl: './items.component.html', styleUrl: './items.component.css'
})
export class ItemsComponent implements OnInit {

  categoryId?: string;
  localCurrency?: string;
  specialCase = [
    "SEK",
    "DKK",
    "NOK",
    "CZK",
    "PLN",
    "HUF",
    "RON",
    "ISK",
    "RUB",
    "UAH",
    "BYN",
    "KZT",
    "AMD",
    "GEL",
    "VND",
    "CVE",
    "EEK",
    "FIM",
    "LVL",
    "HRK"
  ]
  price?: string;

  constructor(private route: ActivatedRoute) {
    this.categoryId = this.route.snapshot.paramMap.get('categoryId') || undefined;
  }

  async getCurrency() {

    await fetch("https://api.ipify.org?format=json")
      .then(response => response.json())
      .then(async data => {
        await fetch("https://api.ipdata.co/" + data.ip + "/currency?api-key=f5da3069cd55c8abd5a67d09e622858c568caa8dde787ccd29e7f8d8")
          .then(response => response.json())
          .then(data => {
            this.localCurrency = data.code;
            console.log("SET", this.localCurrency);
            window.localStorage.setItem("currency", data.code);
            window.localStorage.setItem("currency-symbol", data.symbol);
          })
          .catch(() => {
            this.localCurrency = "SEK";
            window.localStorage.setItem("currency", "SEK");
            window.localStorage.setItem("currency-symbol", "Skr");
          })
      })

  }

  async getItems() {
    try {
      await fetch('https://db-api-wishlist.lunalu.org/?get=items&category=' + this.categoryId)
        .then(response => response.json())
        .then(data => {
          //console.log(data);
          data.forEach(async (item: any) => {

            //console.log(item);

            const item_display: HTMLDivElement = document.createElement("div");
            item_display.className = "category_display";
            item_display.onclick = () => {
              window.location.pathname = "category/" + item.code_name
            }

            const item_title: HTMLHeadingElement = document.createElement("h1");
            item_title.innerText = item.title;

            const item_price: HTMLHeadingElement = document.createElement("h1");
            item_price.innerText = "Loading...";

            const img: HTMLImageElement = document.createElement("img");
            img.src = item.img_url;
            img.height = 200;
            img.width = 200;

            if (!window.localStorage.getItem("currency")) {
              await this.getCurrency();
            } else {
              this.localCurrency = window.localStorage.getItem("currency") || undefined;
            }

            if (this.localCurrency === item.currency) {
              item_price.innerText = item.price + " " + window.localStorage.getItem("currency-symbol");
            } else if (this.localCurrency && item.currency) {
              await this.convertPrice(item.price, item.currency, this.localCurrency)
              item_price.innerText = this.price || "Error";

            }


            item_display.appendChild(img);
            item_display.appendChild(item_title);
            item_display.appendChild(item_price);

            const containerElement = document.getElementById("container");
            if (containerElement) {
              containerElement.appendChild(item_display);
            }


          })
        })
    } catch (e) {
      console.error("error, cant reach the database ", e);
    }
  }

  async convertPrice(price: number, fromCurr: string, toCurr: string) {
    try {
      await fetch("https://api-wishlist.lunalu.org?amount=" + price + "&from_curr=" + fromCurr + "&to_curr=" + toCurr)
        .then(response => response.json())
        .then(data => {

            if(this.specialCase.includes(toCurr)){

              this.price = data + " " + window.localStorage.getItem("currency-symbol");
              console.log(this.price);


            }else{
              this.price = window.localStorage.getItem("currency-symbol") + " " + data;
              console.log(this.price);
            }
          }
        )

    } catch (e) {
      console.error("error", e);
    }

  }


  async ngOnInit() {
    this.getItems();
  }


}


