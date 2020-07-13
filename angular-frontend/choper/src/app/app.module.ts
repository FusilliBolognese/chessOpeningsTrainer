import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChessboardComponent } from './chessboard/chessboard.component';
import { ChessOpeningTreeComponent } from './opening-tree/opening-tree.component';
import { ChessOpeningTreeListComponent } from './opening-tree-list/opening-tree-list.component';
import { ChessOpeningTrainingEditComponent } from './opening-training-edit/opening-training-edit.component';
import { ChessOpeningTrainingListComponent } from './opening-training-list/opening-training-list.component';
import { ChessOpeningTrainingCreateComponent } from './opening-training-create/opening-training-create.component';
import { ChessOpeningTrainingBaseComponent } from './opening-training-base/opening-training-base.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DateTimeFormatPipe, ChessOpeningNameFormat } from './app-format.pipe';


import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

// the second parameter 'fr' is optional
registerLocaleData(localeFr, 'fr');

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
    DateTimeFormatPipe,
    ChessOpeningNameFormat,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
