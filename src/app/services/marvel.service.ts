import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Md5 } from 'ts-md5/dist/md5';
// import { DefaultResponse } from '../models/default-response';
// import { Character } from '../models/character';
// import { Event } from '../models/event';
// import { Series } from '../models/series';
// import { Story } from '../models/story';

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

  getCharactersByName(name: string): Observable<any> {
    const params = this.httpParams.append('nameStartsWith', name);
    return this.http
      .get<any>(`${environment.marvel_endpoint}/characters`, {
        params,
      })
      .pipe(map((response) => response.data.results));
  }

  getResource(resourseURI: string): Observable<any> {
    return this.http
      .get<any>(resourseURI, { params: this.httpParams })
      .pipe(map((response) => response.data.results));
  }
}
