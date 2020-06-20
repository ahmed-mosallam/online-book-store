import { Component, OnInit } from '@angular/core';
import { Bookcategory } from 'src/app/common/bookcategory';
import { BookcategoryService } from 'src/app/services/bookcategory.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories:Bookcategory[]
  
  constructor( private categoryService:BookcategoryService,private router:Router) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data=>this.categories=data)
  } 
 
}