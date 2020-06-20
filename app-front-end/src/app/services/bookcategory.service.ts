import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bookcategory } from '../common/bookcategory';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookcategoryService {

  baseUrl = "http://localhost:8080/book-store/book-category"


  constructor(private http:HttpClient) { }


  getCategories():Observable<Bookcategory[]>{
    return this.http.get<categoryResponse>(this.baseUrl).pipe(
      map(response=>response._embedded.bookCategory)
    )
  }


  getCategoryId(categoryName:string):Observable<number>{
    const searchUrl=`${this.baseUrl}/search/categoryname?name=${categoryName}`
    return this.http.get<number>(searchUrl)
  }
  
}
interface categoryResponse{
  _embedded:{
    bookCategory : Bookcategory[]
  }
}