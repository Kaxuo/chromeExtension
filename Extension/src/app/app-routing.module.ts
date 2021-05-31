import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { CarteComponent } from './components/carte/carte.component';
import { ErrorComponent } from './components/error/error.component';
import { InsertPinComponent } from './components/insert-pin/insert-pin.component';
import { SuccessComponent } from './components/success/success.component';

const routes: Routes = [
  { path: '', redirectTo: 'eID', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'eID', component: CarteComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'authenticate', component: InsertPinComponent },
  { path: 'success', component: SuccessComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
