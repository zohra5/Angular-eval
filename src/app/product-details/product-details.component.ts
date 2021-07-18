import { Component, OnInit } from "@angular/core";
import { ProductService } from "../services/product.service";
import { Product } from "../model/product";
import { ActivatedRoute, Params } from "@angular/router";
import { CustomerService } from "../services/customer.service";
@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.css"],
})
export class ProductDetailsComponent implements OnInit {
  productD: Product;
  products: Product[];
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private customerService: CustomerService
  ) {
    productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = String(params.id);
      {
        this.productService.getProductsDetails(id).subscribe((product) => {
          this.productD = product;
        });
      }
    });
  }

  isTheLast() {
    return this.productService.isTheLast(this.productD);
  }
  updateProductD(event: Product): void {
    this.customerService.addProduct(event);
    this.productService.decreaseStock(event);
  }
  isAvailable(product: Product): boolean {
    return this.productService.isAvailable(product);
  }
  isFinished() {
    return this.productService.isFinished(this.productD);
  }
}
