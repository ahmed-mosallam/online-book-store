import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms'
import { CartService } from 'src/app/services/cart.service';
import { CartItems } from 'src/app/common/cart-items';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartItems:CartItems[]
  totalPrice:number=0
  totalQuantity:number=0
  
  constructor(private formBuilder:FormBuilder,private cartService:CartService ) { }

  ngOnInit(): void {
    this.getCartDetails()
  }

  // create checkout form controls
  checkoutForm=this.formBuilder.group({
    customer:this.formBuilder.group({
      firstName:[''],
      lastName:[''],
      email:[],
      phoneNumber:[]
    }),
    shippingAddress:this.formBuilder.group({
      address:[''],
      country:[''],
      state:[''],
      zipCode:[''] 
    }),
    billingAddress:this.formBuilder.group({
      address:[''],
      country:[''],
      state:[''],
      zipCode:['']
    }),
    creditCard:this.formBuilder.group({
      cardType:[''],
      nameOnCard:[''],
      cardNumber:[''],
      cvv:[''],
      expirationDate:[''],
      expirationYear:['']
    }) 
  })

  // get cart details to show in the view
  getCartDetails(){
    this.cartItems=this.cartService.cartItems    
    this.cartService.totalPrice.subscribe(data=>this.totalPrice=data)
    this.cartService.totalQuantity.subscribe(data=>this.totalQuantity=data)
    this.cartService.calculatePriceAndQuantity()
  }  

  //copy data from shipping address controls to billing address if checkbox is checked
  onChange(event){
    if(event.target.checked){
      this.checkoutForm.get('billingAddress').patchValue(this.checkoutForm.get('shippingAddress').value)
    }
    else{
      this.checkoutForm.get('billingAddress').reset()
    }
  }

}
