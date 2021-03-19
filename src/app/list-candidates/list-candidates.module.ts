import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListCandidatesRoutingModule } from './list-candidates-routing.module';
import { ListCandidatesComponent } from './list-candidates.component';
import { CreateModalComponent } from './components/create-modal/create-modal.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ListCandidatesComponent, CreateModalComponent],
  imports: [
    CommonModule,
    ListCandidatesRoutingModule,
    ReactiveFormsModule,
  ]
})
export class ListCandidatesModule { }
