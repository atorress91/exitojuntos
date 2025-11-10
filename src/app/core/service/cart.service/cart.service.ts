import { Injectable } from '@angular/core';
import { UserAffiliate } from '@app/core/models/user-affiliate-model/user.affiliate.model';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>('');
  public totalPrice = new BehaviorSubject<number>(0);
  public userReceivesPurchase: BehaviorSubject<UserAffiliate> = new BehaviorSubject<UserAffiliate>(new UserAffiliate());
  public normalUser: BehaviorSubject<UserAffiliate> = new BehaviorSubject<UserAffiliate>(new UserAffiliate());

  constructor(private toast: ToastrService) { }


  showError(message: string) {
    this.toast.error(message);
  }

  getProducts() {
    return this.productList.asObservable().pipe(
      map((products: any[]) => {
        let consolidatedProducts: any[] = [];
        let productMap = {};

        products.forEach(product => {
          if (productMap[product.id]) {
            productMap[product.id].quantity += product.quantity;
            productMap[product.id].total = productMap[product.id].salePrice * productMap[product.id].quantity;
          } else {
            productMap[product.id] = { ...product };
            consolidatedProducts.push(productMap[product.id]);
          }
        });

        return consolidatedProducts;
      })
    );
  }

  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(this.cartItemList);
  }

  addtoCart(product: any) {
    const modelTwo = product.paymentGroup === 2;
    const modelOneA = product.paymentGroup === 7;
    const modelOneB = product.paymentGroup === 8;
    const otherModels = !(modelTwo || modelOneA || modelOneB);

    if (this.cartItemList.length > 0) {
      const cartContainsModelTwo = this.cartItemList.some(item => item.paymentGroup === 2);
      const cartContainsModelOneA = this.cartItemList.some(item => item.paymentGroup === 7);
      const cartContainsModelOneB = this.cartItemList.some(item => item.paymentGroup === 8);
      const cartContainsOtherModels = this.cartItemList.some(item => !(item.paymentGroup === 2 || item.paymentGroup === 7 || item.paymentGroup === 8));

      if ((modelTwo && (cartContainsModelOneA || cartContainsModelOneB || cartContainsOtherModels)) ||
        (modelOneA && (cartContainsModelTwo || cartContainsModelOneB || cartContainsOtherModels)) ||
        (modelOneB && (cartContainsModelOneA || cartContainsModelTwo || cartContainsOtherModels)) ||
        (otherModels && (cartContainsModelOneA || cartContainsModelTwo || cartContainsModelOneB))) {
        this.showError('No puedes mezclar servicios de diferentes modelos en el carrito.');
        return;
      }
    }

    this.cartItemList.push({ ...product, quantity: 1 });

    let grandTotal = this.getTotalPrice();
    this.productList.next(this.cartItemList);
    this.totalPrice.next(grandTotal);
  }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      grandTotal += a.quantity * a.salePrice;
    });
    return grandTotal;
  }

  removeCartItem(product: any) {
    const index = this.cartItemList.findIndex(
      (item: any) => item.id === product.id
    );
    if (index !== -1) {
      this.cartItemList.splice(index, 1);
      this.productList.next(this.cartItemList);
    }
  }

  removeAllCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }

  setPurchaseFromThirdParty(user: UserAffiliate) {
    this.userReceivesPurchase.next(user);
  }

  getPurchaseFromThirdParty() {
    return this.userReceivesPurchase.asObservable();
  }

  clearPurchaseFromThirdParty() {
    this.userReceivesPurchase.next(new UserAffiliate());
  }
}
