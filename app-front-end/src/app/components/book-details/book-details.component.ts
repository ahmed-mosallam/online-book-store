import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router'
import { Book } from 'src/app/common/book';
import { CartItems } from 'src/app/common/cart-items';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  bookDetails:Book 
  bookId:number  
  category:string
  selectedCategory:number=1
  bookQuantity:number
  // property to show error message if quantity is not in available lrange
  hasError:boolean=false 
  // property to disable add to cart button if quantity has error
  isDisabled:boolean=true


  constructor(private bookService :BookService , private route :ActivatedRoute ,private router :Router,private cartService:CartService) { }
 

  ngOnInit(): void {
    this.getBookDetails()
  }


  //get selected book's details
  getBookDetails(){
    this.route.paramMap.subscribe((param:ParamMap)=>{
      this.bookId=+param.get('id')
      this.bookService.getBookDetails(this.bookId).subscribe(data=>this.bookDetails=data)        
    })
  }

  // navigate to the selected book's category or to homepage if the book selected from homepage 
  backToPrevious(){
    this.route.paramMap.subscribe(param=>{this.category=param.get('category')
    console.log(this.category)
    if (this.category.includes(null)){
        this.router.navigate(['books'])
      }
      else{
       this.selectedCategory=+this.category
       this.router.navigate(['booksCategory',this.selectedCategory]) 
       
      }
    })  
 }

// get required quantity value & makes view dispaly error message if quantity has error
 quantityChange(event){
  if(event.target.value > this.bookDetails.stockUnits || event.target.value == 0){
     this.hasError=true
     this.isDisabled=true
  }
  else{
    this.hasError=false
    this.isDisabled=false
  }
}


 //add determinded quantity to cart
  addToCart(quantity:number){
   if(quantity<=this.bookDetails.stockUnits && quantity !== 0){   
    const cartQuantity=+quantity
    const cartItems:CartItems = new CartItems(this.bookDetails,cartQuantity)
    this.cartService.addToCart(cartItems)         
  } 
 } 
}
