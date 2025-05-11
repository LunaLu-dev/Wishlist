import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

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


  private firestore = inject(Firestore);
  categories$: Observable<Categories[]>;


  constructor() {
    const userid = "PemwLD9jrlh1P5vHGSfI";
    const categoriesCollection = collection(this.firestore, 'users/' + userid + '/categories');
    this.categories$ = collectionData(categoriesCollection) as Observable<Categories[]>;
  }

  ngOnInit() {
    this.categories$.subscribe(categories => {
      const containerElement: HTMLElement|null = document.getElementById("container");
      if (containerElement) {
        containerElement.innerHTML = "";
      }

      categories.forEach(category => {
        console.log(category);

        const category_display: HTMLDivElement = document.createElement("div");

        const title: HTMLHeadingElement = document.createElement("h1");
        title.innerText = category.title;

        const img:  HTMLImageElement = document.createElement("img");
        img.src = category.img_url;
        img.height = 200;
        img.width = 200;


       category_display.appendChild(img);
       category_display.appendChild(title);

        containerElement?.appendChild(category_display)
      })
    })
  }
}
