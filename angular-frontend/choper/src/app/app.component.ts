import { Component, AfterViewInit } from '@angular/core';

// declare var Chessground: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'choper';
  // chess = new Chess();
  /*
  options = {
    orientation: 'white'
  };

  ground = Chessground(document.getElementById("ground1"), this.options);
  */
  ngAfterViewInit() {
  }

}
