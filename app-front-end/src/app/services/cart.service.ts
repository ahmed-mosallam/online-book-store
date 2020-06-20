import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItems } from '../common/cart-items';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  totalPrice:Subject<number>=new Subject<number>()
  totalQuantity:Subject<number>=new Subject<number>()
  cartItems:CartItems[]=[]
  
  
  constructor() { }


  //adding items to the cart or increment existing item
 addToCart(item:CartItems){
  let exisitingItem:CartItems=undefined
  let isExisting:boolean=false
  exisitingItem= this.cartItems.find(tempCartItem=>tempCartItem.id===item.id)
  isExisting=(exisitingItem!==undefined)
  if(isExisting){
    exisitingItem.quantity=exisitingItem.quantity+item.quantity
    this.calculatePriceAndQuantity()
  }
  else{
   this.cartItems.push(item)
   this.calculatePriceAndQuantity()
  }
 }

 
  // increment quantity of cart items in case of quantity is not out of range and update total price & quantity 
 incrementQuantity(cartItem:CartItems){ 
  if(cartItem.quantity<cartItem.stockUnits) 
  cartItem.quantity++
  this.calculatePriceAndQuantity()  
 }


  // decrement quantity of cart items and update total price & quantity 
 decrementQuantity(cartItem:CartItems){
  
  if (cartItem.quantity===1){    
   this.removeFromCart(cartItem)
  }
  else{
   cartItem.quantity--
   this.calculatePriceAndQuantity()
  }
 }

  //removing item from cart
 removeFromCart(cartItem:CartItems){
  let index= this.cartItems.findIndex(data=>data.id===cartItem.id)
  if(index>=0){
    this.cartItems.splice(index,1)
    this.calculatePriceAndQuantity()
  }
   
 }
  //calculating totalPrice & totalQuantity
 calculatePriceAndQuantity(){
   let totalPrice:number=0
   let totalQuantity:number=0 
   for(let cartItem of this.cartItems){
     totalPrice+=cartItem.quantity*cartItem.price
     totalQuantity+=cartItem.quantity
   }   
   this.totalPrice.next(totalPrice)
   this.totalQuantity.next(totalQuantity)
 }
}
