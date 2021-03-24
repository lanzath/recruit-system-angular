import { Component, OnInit } from '@angular/core';
import { CandidateService } from './candidate.service';

import Candidate from './models/candidate.model';

@Component({
  selector: 'app-list-candidates',
  templateUrl: './list-candidates.component.html',
  styleUrls: ['./list-candidates.component.scss']
})
export class ListCandidatesComponent implements OnInit {

  isCreateModalOpen = false;
  candidates: Candidate[];
  candidateData: Candidate;

  constructor(private candidateService: CandidateService) { }

  ngOnInit(): void {
    this.candidateService.getCandidates().subscribe((response: Candidate[]) => {
      this.candidates = response;
      this.candidates.forEach((candidate) => this.handleCandidateLinkedin(candidate));
    });

  }

  handleCandidateLinkedin(candidate: Candidate): void {
    candidate.linkedin_url = candidate.linkedin_url.split('.com')[1];
  }

  navigateToUrl(url: string): void {
    window.location.href = `https://linkedin.com${url}`;
  }

  editCandidate(id: number): void {
    const index = this.candidates.findIndex(candidate => candidate.id === id);
    this.candidateData = this.candidates[index];
    this.toggleModal();
  }

  deleteCandidate(candidate: Candidate): void {
    this.candidateService.deleteCandidate(candidate).subscribe(() => {
      this.candidates = this.candidates.filter(c => c.id !== candidate.id );
    });
  }

  toggleModal(): void {
    this.isCreateModalOpen = !this.isCreateModalOpen;
  }

  handleCandidate(value: Candidate): void {
    if (value.id) {
      this.candidateService.updateCandidate(value).subscribe((response: Candidate) => {
        const index = this.candidates.findIndex(i => i.id === response.id);
        this.candidates[index] = response;
      });
      return;
    }

    this.candidateService.postCandidates(value).subscribe((response: Candidate) => {
      this.handleCandidateLinkedin(response);
      this.candidates.push(response);
      this.toggleModal();
    });
  }
}
