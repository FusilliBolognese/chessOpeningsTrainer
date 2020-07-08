import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChessboardComponent } from './chessboard/chessboard.component';
import { ChessOpeningTreeComponent } from './opening-tree/opening-tree.component';
import { ChessOpeningTreeListComponent } from './opening-tree-list/opening-tree-list.component';
import { ChessOpeningTrainingEditComponent } from './opening-training-edit/opening-training-edit.component';
import { ChessOpeningTrainingListComponent } from './opening-training-list/opening-training-list.component';
import { ChessOpeningTrainingCreateComponent } from './opening-training-create/opening-training-create.component';
import { ChessOpeningTrainingBaseComponent } from './opening-training-base/opening-training-base.component';

@NgModule({
  declarations: [
    AppComponent,
    ChessboardComponent,
    ChessOpeningTreeComponent,
    ChessOpeningTreeListComponent,
    ChessOpeningTrainingListComponent,
    ChessOpeningTrainingBaseComponent,
    ChessOpeningTrainingEditComponent,
    ChessOpeningTrainingCreateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
