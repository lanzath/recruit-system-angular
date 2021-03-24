import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import Candidate from './models/candidate.model';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  baseUrl = 'http://127.0.0.1:8000/api/v1';

  constructor(private http: HttpClient) { }

  // List candidates
  getCandidates(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(`${this.baseUrl}/candidates`);
  }

  // Create candidate
  postCandidates(candidate: Candidate): Observable<Candidate> {
    return this.http.post<Candidate>(`${this.baseUrl}/candidates`, candidate);
  }

  // Update candidate
  updateCandidate(candidate: Candidate): Observable<Candidate> {
    return this.http.put<Candidate>(`${this.baseUrl}/candidates/${candidate.id}`, candidate);
  }

  // Delete candidate
  deleteCandidate(candidate: Candidate): Observable<Candidate> {
    return this.http.delete<Candidate>(`${this.baseUrl}/candidates/${candidate.id}`);
  }
}
