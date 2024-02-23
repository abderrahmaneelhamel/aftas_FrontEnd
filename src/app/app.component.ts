import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { FilterMatchMode, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  Login: boolean = true;

  constructor(private primengConfig: PrimeNGConfig, private router: Router) {}

  ngOnInit() {
    this.checkLogin();

    this.primengConfig.ripple = true;
    this.primengConfig.zIndex = {
      modal: 1100,
      overlay: 1000, 
      menu: 1000,
      tooltip: 1100
    };
    this.primengConfig.filterMatchModeOptions = {
      text: [FilterMatchMode.STARTS_WITH, FilterMatchMode.CONTAINS, FilterMatchMode.NOT_CONTAINS, FilterMatchMode.ENDS_WITH, FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS],
      numeric: [FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS, FilterMatchMode.LESS_THAN, FilterMatchMode.LESS_THAN_OR_EQUAL_TO, FilterMatchMode.GREATER_THAN, FilterMatchMode.GREATER_THAN_OR_EQUAL_TO],
      date: [FilterMatchMode.DATE_IS, FilterMatchMode.DATE_IS_NOT, FilterMatchMode.DATE_BEFORE, FilterMatchMode.DATE_AFTER]
    };
  }

  checkLogin() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if(event.url === '/login' || event.url === '/unauthorized'){
          this.Login = false;
        }else{
          this.Login = true;
        }
      }
    });
  }
}
