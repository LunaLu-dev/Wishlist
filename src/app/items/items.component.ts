import {Component, inject, OnInit} from '@angular/core';
import {collection, collectionData, Firestore, query, where} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
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
  items$: Observable<Items[]>;
  private firestore = inject(Firestore);

  constructor(private route: ActivatedRoute) {
    //TODO: DELETE THIS LATER (TEST API)
    const userid: string = "PemwLD9jrlh1P5vHGSfI";

    const q = query(
      collection(this.firestore, 'users/' + userid + '/items'),
      where('category', '==', this.route.snapshot.paramMap.get('categoryId'))
    );

    console.log(q);
    console.log(this.route.snapshot.paramMap.get('categoryId'));

    this.items$ = collectionData(q) as Observable<Items[]>;
  }

  ngOnInit() {

    this.items$.subscribe(items => {
      const containerElement: HTMLElement | null = document.getElementById("container");
      if (containerElement) {
        containerElement.innerHTML = "";
      }

      items.forEach(item => {
        console.log(item);

        const category_display: HTMLDivElement = document.createElement("div");
        category_display.className = "category_display";
        //category_display.attributes.setNamedItem("(click)") = item.url;
        category_display.onclick = () => {
          window.open(item.url)
        }

        const title: HTMLHeadingElement = document.createElement("h1");
        title.innerText = item.title;

        const img: HTMLImageElement = document.createElement("img");
        img.src = item.img_url;
        img.height = 200;
        img.width = 200;


        category_display.appendChild(img);
        category_display.appendChild(title);

        containerElement?.appendChild(category_display)
      })
    })
  }
}
