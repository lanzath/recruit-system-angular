import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.scss']
})
export class CreateModalComponent implements OnInit {

  @Output() handleCloseModal = new EventEmitter();

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

  handleTechnology(input): void {
    this.technologySelected.push({ technology: input.target.value });
    this.technology.setValue(this.technologySelected);
  }

  onSubmit(): void {
    if (!this.candidateForm.invalid) {
      console.log(this.candidateForm.value);
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
