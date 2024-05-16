import { Injectable } from '@angular/core';

import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ApiResponse} from "../model/ApiResponse";
import {Customer} from "../model/Customer";

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  CUSTOMER_API_URL = environment.serverUrl+"customers";

  constructor(private httpClient: HttpClient) {
  }

  getCustomers(){
   return this.httpClient.get<ApiResponse>(this.CUSTOMER_API_URL);
  }

  searchCustomers(keyword: string) {
    return this.httpClient.get<ApiResponse>(this.CUSTOMER_API_URL+"/search?keyword="+keyword);
  }

  saveCustomer(customer: Customer){
    return this.httpClient.post<ApiResponse>(this.CUSTOMER_API_URL, customer);
  }

  deleteCustomer(id: string) {
    return this.httpClient.delete(this.CUSTOMER_API_URL+"/"+id);
  }
}
