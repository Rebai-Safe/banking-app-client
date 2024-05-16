import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ApiResponse} from "../model/ApiResponse";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  ACCOUNT_API_URL = environment.serverUrl + "accounts";

  constructor(private httpClient: HttpClient) {
  }


  public getAccount(accountId: string, page,size: number) {
    return this.httpClient.get<ApiResponse>(this.ACCOUNT_API_URL+"/"+accountId+"/PageOperations?page="+page+"&size="+size);
  }

  public debit(accountId: string, amount: number, description: string){
    let data = {accountId: accountId, amount: amount, description: description}
    return this.httpClient.post(this.ACCOUNT_API_URL+"/debit", data);
  }

  public credit(accountId: string, amount: number, description: string){
    let data = {accountId: accountId, amount: amount, description: description}
    return this.httpClient.post(this.ACCOUNT_API_URL+"/credit", data);
  }

  public transfer(accountSource: string, accountDestination: string, amount: number, description: string){
    let data = {accountSource, accountDestination, amount, description}
    return this.httpClient.post(this.ACCOUNT_API_URL+"/transfer", data);
  }
}