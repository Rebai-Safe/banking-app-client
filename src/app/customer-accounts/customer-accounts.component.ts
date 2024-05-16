import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  styleUrls: ['./customer-accounts.component.scss']
})
export class CustomerAccountsComponent implements OnInit {

  customerId: string
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.customerId = this.activatedRoute.snapshot.params['id'];
  }

}
