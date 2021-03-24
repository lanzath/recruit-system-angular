import { Component, EventEmitter, OnInit, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Candidate from '../../models/candidate.model';

@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.scss']
})
export class CreateModalComponent implements OnInit, OnChanges {

  @Input() data: Candidate;
  @Output() handleCloseModal = new EventEmitter();
  @Output() handleForm = new EventEmitter();

  technologies = ['C#', 'Javascript', 'NodeJS', 'Angular', 'React', 'Ionic', 'Mensageria', 'PHP', 'Laravel'];
  technologySelected = [];

  candidateForm: FormGroup;
  id = this.fb.control('');
  name = this.fb.control('', [Validators.required]);
  email = this.fb.control('', [Validators.required]);
  age = this.fb.control('', [Validators.required]);
  linkedin_url = this.fb.control('', [Validators.required]);
  technology = this.fb.control('', [Validators.required]);

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.candidateForm = this.fb.group({
      id: this.id,
      name: this.name,
      email: this.email,
      age: this.age,
      linkedin_url: this.linkedin_url,
      technology: this.technology,
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data.currentValue) {
      this.populateForm();
    }
  }

  populateForm(): void {
    this.id.setValue(this.data.id);
    this.name.setValue(this.data.name);
    this.email.setValue(this.data.email);
    this.age.setValue(this.data.age);
    this.linkedin_url.setValue(`https://linkedin.com${this.data.linkedin_url}`);
  }

  handleTechnology(input): void {
    this.technologySelected.push({ technology: input.target.value });
    this.technology.setValue(this.technologySelected);
  }

  onSubmit(): void {
    if (!this.candidateForm.invalid) {
      this.handleForm.emit(this.candidateForm.value);
    } else {
      Object.keys(this.candidateForm.controls).forEach(key => {
        if (this[key].value === null || this[key].value.length === 0 && this[key].hasError('required')) {
          this[key].markAsDirty();
        }
      });
    }
  }

  closeModal(): void {
    this.handleCloseModal.emit();
  }

}
