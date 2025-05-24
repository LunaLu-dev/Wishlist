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

  constructor(private route: ActivatedRoute) {
  }




  ngOnInit() {

    this.categoryId = this.route.snapshot.paramMap.get('categoryId') || undefined;




    const getItems = async () => {
      try {
        await fetch('https://db-api-wishlist.lunalu.org/?get=items&category=' + this.categoryId)
          .then(response => response.json())
          .then(data => {
            //console.log(data);
            data.forEach((item: any) => {

              //console.log(item);

              const item_display: HTMLDivElement = document.createElement("div");
              item_display.className = "category_display";
              item_display.onclick = () => {
                window.location.pathname = "category/" + item.code_name
              }

              const item_title: HTMLHeadingElement = document.createElement("h1");
              item_title.innerText = item.title;

              const img: HTMLImageElement = document.createElement("img");
              img.src = item.img_url;
              img.height = 200;
              img.width = 200;

              //this.getPrices;


              item_display.appendChild(img);
              item_display.appendChild(item_title);

              const containerElement = document.getElementById("container");
              if (containerElement) {
                containerElement.appendChild(item_display);
              }


            })
          })
      } catch (e) {
        console.log(e);
      }
    }

    getItems();


    const GetPrices = async () => {

      if (!window.localStorage.getItem("currency")) {
        await fetch("https://api.ipify.org?format=json")
          .then(response => response.json())
          .then(async data => {
            console.log(data.ip);
            await fetch("https://api.ipdata.co/" + data.ip + "/currency?api-key=f5da3069cd55c8abd5a67d09e622858c568caa8dde787ccd29e7f8d8")
              .then(response => response.json())
              .then(data => {
                this.localCurrency = data.code;
                window.localStorage.setItem("currency", data.code);
                window.localStorage.setItem("currency-symbol", data.symbol);
              })
          })
      }
    }


  }


}


