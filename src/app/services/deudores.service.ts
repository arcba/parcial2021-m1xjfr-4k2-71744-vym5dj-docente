import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Deudor } from '../models/deudor';

@Injectable()
export class DeudoresService {

  resourceUrl: string;
  constructor(private httpClient: HttpClient) { 
    this.resourceUrl = " https://pymesbackend.azurewebsites.net/api/deudores/"
  }

  get() {
    return this.httpClient.get(this.resourceUrl);
  }

  post(obj: Deudor) {
    return this.httpClient.post(this.resourceUrl, obj);
  }

  put(Id: number, obj: Deudor) {
    return this.httpClient.put(this.resourceUrl + Id, obj);
  }

}