import { Component, OnInit } from '@angular/core';
import { Product } from '@app/core/models/product-model/product.model';
import { ProductService } from '@app/core/service/product-service/product.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-products-preview',
    templateUrl: './products-preview.component.html',
    styleUrls: ['./products-preview.component.scss'],
    standalone: true,
    imports: [CommonModule, TranslateModule]
})
export class ProductsPreviewComponent implements OnInit {
  public productList: any;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadAllexitojuntos();
  }

  loadAllexitojuntos() {
    this.productService.getAllexitojuntos().subscribe((coin: Product) => {
      this.productList = coin;
      this.productList.forEach((item: any) => {
        Object.assign(item, { quantity: 1, total: item.salePrice });
      });
    })
  }
}
