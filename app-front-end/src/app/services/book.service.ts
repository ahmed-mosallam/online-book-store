import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../common/book';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  baseUrl = "http://localhost:8080/book-store/books"
  constructor(private http:HttpClient) { }
 
  getBooks(pageSize:number,currentPage:number):Observable<BookResponse>{
    const allUrl=`${this.baseUrl}?size=${pageSize}&page=${currentPage}`
     return this.http.get<BookResponse>(allUrl)
    
  }


  getBooksByCategoryId(categoryId:number,pageSize:number,currentPage:number):Observable<BookResponse>{
    const searchUrl=`${this.baseUrl}/search/category?id=${categoryId}&size=${pageSize}&page=${currentPage}`
    return this.http.get<BookResponse>(searchUrl)
  }


  getBooksByName(searchText:string,pageSize:number,currentPage:number):Observable<BookResponse>{
    const searchUrl=`${this.baseUrl}/search/bookname?name=${searchText}&size=${pageSize}&page=${currentPage}`
    return this.http.get<BookResponse>(searchUrl)
  }


  getBookDetails(bookId:number):Observable<Book>{
    const searchUrl=`${this.baseUrl}/${bookId}`
    return this.http.get<Book>(searchUrl)      
  }
}


interface BookResponse{
  _embedded:{
    books:Book[]
  },
  page:{
    size:number ,
    totalElements:number,
    totalPages:number,
    number:number
  }
}