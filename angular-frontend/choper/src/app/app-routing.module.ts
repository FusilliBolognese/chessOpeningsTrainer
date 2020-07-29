import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { ChessOpeningTreeComponent } from './opening-tree/opening-tree.component';
import { ChessOpeningTreeListComponent } from './opening-tree-list/opening-tree-list.component';

import { ChessOpeningTrainingListComponent } from './opening-training-list/opening-training-list.component';
import { ChessOpeningTrainingEditComponent } from './opening-training-edit/opening-training-edit.component';
import { ChessOpeningTrainingCreateComponent } from './opening-training-create/opening-training-create.component';


export const routes: Routes = [
  // { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'openings/:id', component: ChessOpeningTreeComponent },
  { path: 'openings', component: ChessOpeningTreeListComponent },
  { path: 'trainings/add', component: ChessOpeningTrainingCreateComponent },
  { path: 'trainings/add/:id', component: ChessOpeningTrainingCreateComponent },
  { path: 'trainings', component: ChessOpeningTrainingListComponent },
  { path: 'trainings/:id', component: ChessOpeningTrainingEditComponent },
  { path: '', component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
