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

  constructor(private candidateService: CandidateService) { }

  ngOnInit(): void {
    this.candidateService.getCandidates().subscribe((response: Candidate[]) => {
      this.candidates = response;

      this.handleCandidateLinkedin(this.candidates);
    });

  }

  handleCandidateLinkedin(candidates: Candidate[]): void {
    candidates.forEach((candidate: Candidate) => {
      candidate.linkedin_url = candidate.linkedin_url.split('.com')[1];
    });
  }

  navigateToUrl(url: string): void {
    window.location.href = `https://linkedin.com${url}`;
  }

  toggleCreateModal(): void {
    this.isCreateModalOpen = !this.isCreateModalOpen;
  }
}
