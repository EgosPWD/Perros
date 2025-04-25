import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Dog, DogResponse } from "../interface/dog.interface";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class DogService {
  private apiUrl = "https://huachitos.cl/api/animales";

  constructor(private http: HttpClient) {}

  getDogList(limit: number = 20): Observable<DogResponse> {
    return this.http.get<DogResponse>(`${this.apiUrl}?limit=${limit}`);
  }

  getDogDetail(id: number): Observable<Dog> {
    return this.http.get<Dog>(`${this.apiUrl}/${id}`);
  }
}
