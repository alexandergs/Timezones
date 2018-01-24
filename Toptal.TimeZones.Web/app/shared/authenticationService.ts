import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {

    constructor(private http: Http) {

    }

    private token: string = "";
    private tokenExpiration: Date;

    //public order: Order = new Order();

    //public products: Product[] = [];

    //public loadProducts(): Observable<Product[]> {
    //  return this.http.get("/api/users")
    //    .map((result: Response) => this.products = result.json());
    //}

    public get tokenRequired(): boolean {
        return this.token.length == 0 || this.tokenExpiration > new Date();
    }

    public loadBearerToken() {
        return this.http.get("/account/getbearertoken")
            .subscribe(data => {
                let tokenInfo = data.json()
                this.token = tokenInfo.token;
                this.tokenExpiration = tokenInfo.expiration;
            });
    }

                

    //public checkout() {
    //  if (!this.order.orderNumber) {
    //    this.order.orderNumber = this.order.orderDate.getFullYear().toString() + this.order.orderDate.getTime().toString();
    //  }

    //  return this.http.post("/api/orders", this.order, {
    //    headers: new Headers({ "Authorization": "Bearer " + this.token })
    //  })
    //    .map(response => {
    //      this.order = new Order();
    //      return true;
    //    });
    //}

    //public AddToOrder(product: Product) {

    //  let item: OrderItem = this.order.items.find(i => i.productId == product.id);

    //  if (item) {

    //    item.quantity++;

    //  } else {

    //    item = new OrderItem();
    //    item.productId = product.id;
    //    item.productArtist = product.artist;
    //    item.productCategory = product.category;
    //    item.productArtId = product.artId;
    //    item.productTitle = product.title;
    //    item.productSize = product.size;
    //    item.unitPrice = product.price;
    //    item.quantity = 1;

    //    this.order.items.push(item);
    //  }
    //}


}