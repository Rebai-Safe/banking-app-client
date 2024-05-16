import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AccountsService} from "../services/accounts.service";
import {Account} from "../model/Account";
import {error} from "protractor";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  accountFormGroup: FormGroup;
  operationsFormGroup: FormGroup;
  currentPage: number = 0;
  pageSize: number = 5;
  account: Account;

  errorMessage: string;
  constructor(private formBuilder: FormBuilder,
              private accountService: AccountsService) { }

  ngOnInit(): void {
    this.accountFormGroup = this.formBuilder.group({
      accountId: ['']
    })

    this.operationsFormGroup = this.formBuilder.group({
      operationType: this.formBuilder.control(''),
      amount: this.formBuilder.control(0),
      description: this.formBuilder.control(''),
      accountDestination: this.formBuilder.control(null)
    })
  }

  handleSearchAccount() {
    let accountId = this.accountFormGroup.value.accountId;
    this.accountService.getAccount(accountId, this.currentPage, this.pageSize).subscribe(
        data => {
          this.account = data.object;
        }, error =>{
            this.errorMessage = error.error.message;

        }
    )
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.handleSearchAccount();
  }

  handleAccountOperation() {
    let amount :number = this.operationsFormGroup.value.amount;
    let accountId: string = this.accountFormGroup.value.accountId;
    let description: string = this.operationsFormGroup.value.description;
    let operationType: string = this.operationsFormGroup.value.operationType;

    if(operationType == 'DEBIT'){
        this.accountService.debit(accountId, amount, description).subscribe(
            data =>{
              alert("Success debit");
              this.operationsFormGroup.reset();
              this.handleSearchAccount();
            }, error => {
              this.errorMessage = error.error.message;
              console.log(error);
            }
        );
    }else if(operationType == 'CREDIT'){
         this.accountService.credit(accountId, amount, description).subscribe(
             data =>{
               alert("Success credit");
               this.operationsFormGroup.reset();
               this.handleSearchAccount();
             }, error => {
               this.errorMessage = error.error.message;
               console.log(error);
             }
         );

    }else{
      let accountDestination = this.operationsFormGroup.value.accountDestination;
      this.accountService.transfer(accountId,accountDestination, amount, description).subscribe(
          data =>{
            alert("Success transfer");
            this.operationsFormGroup.reset();
            this.handleSearchAccount();
          }, error => {
            this.errorMessage = error.error.message;
            console.log(error);
          }
      );
    }

  }
}
