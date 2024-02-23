import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Member } from 'src/app/Interfaces/Member';
import { User } from 'src/app/Interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private apiUrl = 'http://localhost:8080/api/members';

  constructor(private http: HttpClient) {}

  getAllMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.apiUrl);
  }

  getAllJurys(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/jurys`);
  }

  getMemberById(memberId: number): Observable<Member> {
    return this.http.get<Member>(`${this.apiUrl}/${memberId}`);
  }

  createMember(member: Member): Observable<Member> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post<Member>(this.apiUrl, member, httpOptions);
  }
}
