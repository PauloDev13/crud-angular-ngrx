import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Associate } from '../../store/model/associate.model';

@Injectable({
  providedIn: 'root',
})
export class AssociateService {
  baseUrl = 'http://localhost:3000/associates';

  private readonly httpClient = inject(HttpClient);

  getAll() {
    return this.httpClient.get<Associate[]>(this.baseUrl);
  }

  getByCode(code: number) {
    return this.httpClient.get<Associate>(`${this.baseUrl}/${code}`);
  }

  remove(code: number) {
    return this.httpClient.delete<void>(`${this.baseUrl}/${code}`);
  }

  update(data: Associate) {
    return this.httpClient.put<Associate>(`${this.baseUrl}/${data.id}`, data);
  }

  create(data: Associate) {
    return this.httpClient.post<Associate>(this.baseUrl, data);
  }
}
