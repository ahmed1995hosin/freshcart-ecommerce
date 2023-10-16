import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CheakOutService } from 'src/app/services/cheak-out.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/app/environments/environment';

@Component({
  selector: 'app-order-address',
  templateUrl: './order-address.component.html',
  styleUrls: ['./order-address.component.css'],
})
export class OrderAddressComponent implements OnInit {
  cartId: string = '';
  constructor(
    private _CheakOutService: CheakOutService,
    private _ActivatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private _router: Router
  ) {}
  ngOnInit(): void {
    console.log(
      this._ActivatedRoute.paramMap.subscribe((para) => {
        // console.log();
        this.cartId = para.get('cartId') || '';
      })
    );
  }
  shippingAddress: FormGroup = new FormGroup({
    details: new FormControl('', Validators.required),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(((\+|00)[0-9]{3})|0)[0-9]{10}$/),
    ]),
    city: new FormControl('', Validators.required),
  });
  // cash order
  cashOrder(shippingAddress: FormGroup): void {
    shippingAddress.markAllAsTouched();
    if (shippingAddress.valid) {
      console.log(shippingAddress);
      this._CheakOutService
        .cashOrder(this.cartId, shippingAddress.value)
        .subscribe({
          next: (data) => {
            this.toastr.success('checked ', data.status);
            this._router.navigate(['/allorders']);
          },
          error: (err) => {
            this.toastr.error('no products in the cart try again', 'error');
            this._router.navigate(['/card']);
          },
        });
    }
  }
  // payment online
  payOnline(shippingAddress: FormGroup): void {
    shippingAddress.markAllAsTouched();
    if (shippingAddress.valid) {
      this._CheakOutService
        .payOnline(this.cartId, shippingAddress.value, environment.backUrl)
        .subscribe({
          next: (data) => {
            if (data.status === 'success') {
              window.open(data.session.url, '_self');
            }
          },
          error: (err) => {
            this.toastr.error('error', 'try again');
          },
        });
    }
  }
}
