import { DefaultResponse } from 'src/app/shared/models/marvel/default-response';
import { Story } from 'src/app/shared/models/marvel/story';
import { Series } from 'src/app/shared/models/marvel/series';
import { Event } from 'src/app/shared/models/marvel/event';
import { Character } from 'src/app/shared/models/marvel/character';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable({
  providedIn: 'root',
})
export class MarvelService {
  constructor(private http: HttpClient) {}

  get httpParams(): HttpParams {
    const ts = new Date().getTime().toString();
    const hash = Md5.hashStr(
      `${ts}${environment.marvel_private_key}${environment.marvel_public_key}`
    );

    return new HttpParams()
      .append('ts', ts)
      .append('apikey', environment.marvel_public_key)
      .append('hash', hash.toString())
      .append('limit', '100');
  }

  getCharacterById(id: number): Observable<Character> {
    return this.http
      .get<DefaultResponse>(`${environment.marvel_endpoint}/characters/${id}`, {
        params: this.httpParams,
      })
      .pipe(map((response) => response.data.results[0]));
  }

  getCharactersByName(name: string): Observable<Character[]> {
    const params = this.httpParams.append('nameStartsWith', name);
    return this.http
      .get<DefaultResponse>(`${environment.marvel_endpoint}/characters`, {
        params,
      })
      .pipe(map((response) => response.data.results));
  }

  getCharacterByName(name: string): Observable<Character> {
    const params = this.httpParams.append('name', name);
    return this.http
      .get<DefaultResponse>(`${environment.marvel_endpoint}/characters`, {
        params,
      })
      .pipe(map((response) => response.data.results[0]));
  }

  getResource(
    resourseURI: string
  ): Observable<(Character | Event | Series | Story)[]> {
    return this.http
      .get<DefaultResponse>(resourseURI, { params: this.httpParams })
      .pipe(map((response) => response.data.results));
  }
}
