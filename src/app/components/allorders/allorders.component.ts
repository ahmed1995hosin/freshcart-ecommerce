import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheakOutService } from 'src/app/services/cheak-out.service';
import jwtDecode from 'jwt-decode';
import { CuttitlePipe } from 'src/app/pipes/cuttitle.pipe';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [CommonModule, CuttitlePipe],
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css'],
})
export class AllordersComponent implements OnInit {
  isOrders: boolean = false;
  userId: string = '';
  orders: any[] = [];
  constructor(private _CheakOutService: CheakOutService) {
    this.isOrders = true;
  }
  ngOnInit(): void {
    let token: string = localStorage.getItem('token') || '';
    if (token) {
      let userinfo: any = jwtDecode(token);
      this.userId = userinfo.id;
      this._CheakOutService.getOrder(this.userId).subscribe({
        next: (data) => {
          this.orders = data;
          this.isOrders = true;
        },
        error: (err) => {
          this.isOrders = false;
        },
      });
    }
    this.isOrders = false;
  }
}
