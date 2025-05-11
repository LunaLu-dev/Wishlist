import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CategoriesComponent} from './categories/categories.component';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CategoriesComponent, NgOptimizedImage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Wishlist';
}
