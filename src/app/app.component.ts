import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Wishlist';

  imagePath: string = `/assets/logo.webp`;

  imgWidth: number = 437;
  imgHeight: number = 300;

  ngOnInit(): void {
    this.setImgDim();
    window.addEventListener('resize', () => this.setImgDim());
  }


  private setImgDim() {
    const width = window.innerWidth;

    //Mobile View
    if (width < 600) {
      this.imagePath = `/assets/mobile.webp`;
      this.imgWidth = 200;
      this.imgHeight = 137;
    } else {//Desktop View
      this.imagePath = `/assets/logo.webp`;
      this.imgWidth = 437;
      this.imgHeight = 300;
    }
  }

}
