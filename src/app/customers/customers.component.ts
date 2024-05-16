import {Component, OnInit} from '@angular/core';
import {CustomersService} from "../services/customers.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  customers: any;
  errorMessage: string;
  searchFormGroup: FormGroup;

  constructor(private customersService: CustomersService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.searchFormGroup = this.formBuilder.group({
      keyword: this.formBuilder.control("")
    })
  this.getCustomers();

  }

  getCustomers(){
    this.customersService.getCustomers().subscribe(data => {
      this.customers = data.object;
    }, error => {
      this.errorMessage = error.message;
    });
  }

  handleSearchCustomers() {
    let keyword = this.searchFormGroup.get("keyword")?.value;
    this.customersService.searchCustomers(keyword).subscribe(data => {
      this.customers = data.object;
    }, error => {
      this.errorMessage = error.message;
    });
  }

    handleDeleteCustomer(id: string) {
    let conf = confirm("Are you sure?");

    if(!conf)
      return;
        this.customersService.deleteCustomer(id).subscribe(data => {
          this.getCustomers();
        });
    }

  handleCustomerAccounts(id: string) {
    this.router.navigate(['/customer-accounts/'+id]);
  }
}
