import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fish } from 'src/app/Interfaces/Fish';

@Injectable({
  providedIn: 'root'
})
export class FishService {
  private apiUrl = 'http://localhost:8080/api/fish';

  constructor(private http: HttpClient) {}

  getAllfishes(): Observable<Fish[]> {
    return this.http.get<Fish[]>(this.apiUrl);
  }

}
