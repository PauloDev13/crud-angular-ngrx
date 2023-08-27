import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';

import { Associate } from '../../store/model/associate.model';

@Injectable({
  providedIn: 'root',
})
export class AssociateService {
  baseUrl = 'http://localhost:3000/associates';

  private readonly httpClient = inject(HttpClient);

  getAll() {
    return this.httpClient
      .get<Associate[]>(this.baseUrl)
      .pipe(tap(() => console.log('GetAll Associates')));
  }

  getByCode(code: number) {
    return this.httpClient
      .get<Associate>(`${this.baseUrl}/${code}`)
      .pipe(tap(() => console.log('GetByCode Associate')));
  }

  remove(code: number) {
    return this.httpClient
      .delete<void>(`${this.baseUrl}/${code}`)
      .pipe(tap(() => console.log('Removed')));
  }

  update(data: Associate) {
    return this.httpClient
      .put<Associate>(`${this.baseUrl}/${data.id}`, data)
      .pipe(tap(() => console.log('Update Associate')));
  }

  create(data: Associate) {
    return this.httpClient
      .post<Associate>(this.baseUrl, data)
      .pipe(tap(() => console.log('Create Associate')));
  }
}
