import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCandidatesComponent } from './list-candidates.component';

const routes: Routes = [{ path: '', component: ListCandidatesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListCandidatesRoutingModule { }
