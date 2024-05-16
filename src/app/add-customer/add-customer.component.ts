import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Customer} from "../model/Customer";
import {CustomersService} from "../services/customers.service";
import {CommonModule} from '@angular/common';
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {

  addCustomerFormGroup: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private customerService: CustomersService,
              private router: Router) { }

  ngOnInit(): void {
    this.addCustomerFormGroup = this.formBuilder.group({
      name: this.formBuilder.control("", [Validators.required, Validators.minLength(3)]),
      email: this.formBuilder.control("", [Validators.required, Validators.email])
    })
  }

  handleSaveCustomer() {
    let customer: Customer = this.addCustomerFormGroup.value;
    this.customerService.saveCustomer(customer).subscribe(
      data => {
        alert("Customer saved successfully");
        //this.addCustomerFormGroup.reset();
        this.router.navigate(["/customers"]);
    }, error =>
    console.log(error.message));
  }
}
