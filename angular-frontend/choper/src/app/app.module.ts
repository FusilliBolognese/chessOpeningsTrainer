import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChessboardModule } from './chessboard/chessboard.module';
import { OpeningTreeComponent } from './opening-tree/opening-tree.component';
import { OpeningTrainingComponent } from './opening-training/opening-training.component';

@NgModule({
  declarations: [
    AppComponent,
    OpeningTreeComponent,
    OpeningTrainingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChessboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
