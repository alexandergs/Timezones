import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';
import { UserInfoViewModel } from "./userInfoViewModel"

@Injectable()
export class DataService {

    constructor(private http: Http) {

    }

    private token: string = "";
    private tokenExpiration: Date;

    //public order: Order = new Order();

    public allUsers: UserInfoViewModel[] = [];

    public loadAllUsersInfo(): Observable<UserInfoViewModel[]> {
        return this.http.get("/account/getallusers")
            .map((result: Response) => this.allUsers = result.json());
    }

    public updateUserRole(userInfo: UserInfoViewModel) {
        return this.http.put("/account/updateUserRole?id=" + userInfo.email, userInfo,
            {
                headers: new Headers({ "Authorization": "Bearer " + this.token })
            }
        );
    }

    public deleteUser(userInfo: UserInfoViewModel) {
        return this.http.delete("/account/deleteUser/" + userInfo.email,
            {
                headers: new Headers({ "Authorization": "Bearer " + this.token })
            }
        );
    }

    //public get loginRequired(): boolean {
    //  return this.token.length == 0 || this.tokenExpiration > new Date();
    //}

    //public login(creds) {
    //  return this.http.post("/authentication/createtoken", creds)
    //    .map(response => {
    //      let tokenInfo = response.json();
    //      this.token = tokenInfo.token;
    //      this.tokenExpiration = tokenInfo.expiration;
    //      return true;
    //    });
    //}

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