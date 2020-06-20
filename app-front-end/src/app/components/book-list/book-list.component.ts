import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/common/book';
import { BookService } from 'src/app/services/book.service';
import { Bookcategory } from 'src/app/common/bookcategory';
import { BookcategoryService } from 'src/app/services/bookcategory.service';
import { Router, ActivatedRoute ,ParamMap} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
 
 books :Book[]
 categoryId:number
 // contains search keyword 
 searchText:string
 // contains the current page number of pagination & default value is 1
 currentPage:number=1
 previousId:number=1
 // contains number of elements per each page & default value is 5
 pageSize:number=5
 // contains number of element in response data & default value is 0 
 totalElements:number=0


  constructor(private bookService :BookService ,private route :ActivatedRoute , private router :Router ,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
   this.showBooks()    
  }


  // show response data from the server in the view
  showBooks(){

    // confirms user that data still loading 
   this.spinner.show() 

    // determines the way data requseted 
   const hasId=this.route.snapshot.paramMap.has('id')
   const hasName=this.route.snapshot.paramMap.has('name') 
   if (hasId){    
      this.getDataById()        
   }
   else{  
     if (hasName){
        this.getDataByName()              
     }
     else{ 
        this.getAll()
     }     
    }
   }


  // get books by it's category 
  getDataById(){
    this.route.paramMap.subscribe((param:ParamMap)=>{this.categoryId=+param.get('id')
      if (this.previousId!==this.categoryId){
      this.currentPage=1
      }
      this.previousId=this.categoryId
      this.bookService.getBooksByCategoryId(this.categoryId,this.pageSize,this.currentPage-1).subscribe(this.responseData())})
  }


  //get books by search keyword 
  getDataByName(){
    this.route.paramMap.subscribe((param:ParamMap)=>{
      this.searchText=param.get('name')
      this.bookService.getBooksByName(this.searchText,this.pageSize,this.currentPage-1).subscribe(this.responseData())
      })
  }

 
  // get all books
  getAll(){
    this.bookService.getBooks(this.pageSize,this.currentPage-1).subscribe(this.responseData())
  }  



  //navigate to book details component and add selectd book's category id as optional route parameter
  bookDetails(bookId:number){
    let selectedCategory= this.categoryId?this.categoryId:null
    this.router.navigate(['bookDetails',bookId,{category:selectedCategory}])
  }



 // get response data from the server & asign values
  responseData(){
    return data=>{
      this.spinner.hide()
      this.books=data._embedded.books
      this.currentPage=data.page.number + 1
      this.pageSize=data.page.size
      this.totalElements=data.page.totalElements              
    }
  }


  // changes number of elements per page
  changePageSize(selectedSize:number){
    this.pageSize=selectedSize
    this.showBooks() 
  }


  // navigate between available pages
  changePage(selectedPage:number){
     this.currentPage=selectedPage
     this.showBooks()
  }
}
