import { Component, AfterViewInit } from '@angular/core';

// declare var Chessground: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'choper';
  ngAfterViewInit() {
  }

}

