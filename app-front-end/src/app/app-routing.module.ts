import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CategoriesComponent } from './components/Categories/categories.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';


const routes: Routes = [
{path:'books',component:BookListComponent},
{path:'booksCategory/:id', component:BookListComponent},
{path:'searchBook/:name',component:BookListComponent},
{path:'bookDetails/:id',component:BookDetailsComponent},
{path:'cart-details',component:CartDetailsComponent},
{path:'checkout',component:CheckoutComponent},
{path:'',redirectTo:'books',pathMatch:'full'},
{path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[BookListComponent,PageNotFoundComponent,CategoriesComponent,BookDetailsComponent,CartDetailsComponent,CheckoutComponent]
