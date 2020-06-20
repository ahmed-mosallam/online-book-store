import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Online Bookstore';

  constructor(private router :Router){}

  // get search keyword and navigate to the view showing search results
  getKeyWord(name:string){
     this.router.navigate(['searchBook',name])
  }
  
}
