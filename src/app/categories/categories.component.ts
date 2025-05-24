import { Component, OnInit } from '@angular/core';

export interface Categories {
  code_name: string;
  img_url: string;
  title:  string;
}

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {

ngOnInit() {


  getCategories();

  async function getCategories() {
    await fetch('https://db-api-wishlist.lunalu.org/?get=categories')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        data.forEach((category: any) => {
          console.log(category);

          const category_display: HTMLDivElement = document.createElement("div");
          category_display.className = "category_display";
          category_display.onclick = () => {window.location.pathname = "category/"+category.code_name}

          const cat_title: HTMLHeadingElement = document.createElement("h1");
          cat_title.innerText = category.title;

          const img:  HTMLImageElement = document.createElement("img");
          img.src = category.img_url;
          img.height = 200;
          img.width = 200;


          category_display.appendChild(img);
          category_display.appendChild(cat_title);

          const containerElement = document.getElementById("container");
          if (containerElement) {
            containerElement.appendChild(category_display);
          }
        })
      });

  }



}

  /*ngOnInit() {
    this.categories$.subscribe(categories => {
      const containerElement: HTMLElement|null = document.getElementById("container");
      if (containerElement) {
        containerElement.innerHTML = "";
      }

      categories.forEach(category => {
        console.log(category);

        const category_display: HTMLDivElement = document.createElement("div");
        category_display.className = "category_display";
        category_display.onclick = () => {window.location.pathname = window.location.pathname + "/category/"+category.code_name}

        const cat_title: HTMLHeadingElement = document.createElement("h1");
        cat_title.innerText = category.title;

        const img:  HTMLImageElement = document.createElement("img");
        img.src = category.img_url;
        img.height = 200;
        img.width = 200;


       category_display.appendChild(img);
       category_display.appendChild(cat_title);

        containerElement?.appendChild(category_display)
      })
    })
  }*/
}
