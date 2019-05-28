import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ViewChildren, QueryList } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit,AfterViewInit {
 
  ngAfterViewInit(): void {
  
  }
  ngOnInit(): void {
    
  }
  title = 'Portfolio';

  jump(el){
    el.scrollIntoView({behavior:"smooth"});
  }

  inView(data){
    console.log(data);
    
  }

  handleScroll(e){
    console.log(e);
  }
}
