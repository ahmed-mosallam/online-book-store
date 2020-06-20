import { Component, OnInit } from '@angular/core';
import { CartItems } from 'src/app/common/cart-items';
import { CartService } from 'src/app/services/cart.service';
import {Router} from '@angular/router'
@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {
  cartItems:CartItems[]=[]
  totalPrice:number=0 
  totalQuantity:number=0
  

  constructor(private cartService:CartService , private router :Router) { }

  ngOnInit(): void {
    this.showCartDetails()    
  }

  // show all items of cart and total quantity & price of each item
  showCartDetails(){
    this.cartItems=this.cartService.cartItems    
    this.cartService.totalPrice.subscribe(data=>this.totalPrice=data)
    this.cartService.totalQuantity.subscribe(data=>this.totalQuantity=data)
    this.cartService.calculatePriceAndQuantity()
  }

  // navigate to homepage
  backToHome(){
   this.router.navigate(['books']) 
  }
 

  // increment quantity of selected item 
  increment(cartItem:CartItems){      
      this.cartService.incrementQuantity(cartItem)    
  }

  // decrement quantity of selected item 
  decrement(cartItem:CartItems){
   this.cartService.decrementQuantity(cartItem)
  }
  
  // remove item from the cart
  remove(cartItem:CartItems){
   this.cartService.removeFromCart(cartItem)
  }
}
