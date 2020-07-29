import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DateTimeFormatPipe, ChessOpeningNameFormatPipe } from './app-format.pipe';

import { AppMaterialModule } from './app-material.module';
import { ChessOpeningTreeComponent } from './opening-tree/opening-tree.component';
import { ChessOpeningTreeListComponent } from './opening-tree-list/opening-tree-list.component';
import { ChessOpeningTrainingListComponent } from './opening-training-list/opening-training-list.component';
import { ChessOpeningTrainingBaseComponent } from './opening-training-base/opening-training-base.component';
import { ChessOpeningTrainingEditComponent } from './opening-training-edit/opening-training-edit.component';
import { ChessOpeningTrainingCreateComponent } from './opening-training-create/opening-training-create.component';


// the second parameter 'fr' is optional
registerLocaleData(localeFr, 'fr');

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    //ReactiveFormsModule,
    AppMaterialModule,
  ],
  declarations: [
    AppComponent,
    ChessOpeningTreeComponent,
    ChessOpeningTreeListComponent,
    ChessOpeningTrainingListComponent,
    ChessOpeningTrainingBaseComponent,
    ChessOpeningTrainingEditComponent,
    ChessOpeningTrainingCreateComponent,
    DateTimeFormatPipe,
    ChessOpeningNameFormatPipe,
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
