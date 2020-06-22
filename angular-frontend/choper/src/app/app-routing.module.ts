import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'choper', pathMatch: 'full' },
  // { path: 'flights/add', component: FlightCreateComponent },
  // { path: 'flights/add/:id', component: FlightCreateComponent },
  // { path: 'flights/:id', component: FlightEditComponent },
  // { path: 'flights', component: FlightsListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
