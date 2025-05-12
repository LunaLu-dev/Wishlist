import { Routes } from '@angular/router';
import {CategoriesComponent} from './categories/categories.component';
import {ItemsComponent} from './items/items.component';

export const routes: Routes = [
  {path: '', component: CategoriesComponent},
  {path: 'category/:categoryId', component: ItemsComponent},
  {path: '**', redirectTo: ''}
];
