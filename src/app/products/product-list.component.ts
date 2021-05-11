import { Component, OnInit, OnDestroy } from "@angular/core";
import { IProduct } from "./product"
import { ProductService} from './product.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy{

    constructor ( private productService: ProductService) {}

    pageTitle: string = "Product List";
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    filteredProducts: IProduct[] = [];
    products: IProduct[] = [];
    errorMessage: string = "";
    sub!: Subscription;
    //listFilter: string = 'cart';
    private _listFilter: string = '';
    get listFilter(): string {
        return this._listFilter;
    }

    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.performFilter(value);
    }    

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) =>
            product.productName.toLocaleLowerCase().includes(filterBy));
     }


    toggleImage() : void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        //console.log("in Oninit");
        this.sub = this.productService.getProducts().subscribe({
            next: products => {
                this.products = products;
                this.filteredProducts = this.products;
            },
            error: err => this.errorMessage = err
        });
        //this.listFilter = 'cart';
    }

    onRatingClicked(message: string): void {
        console.log('Consider yourself notified');
        this.pageTitle = 'Product List: ' + message;
    }

    ngOnDestroy(): void{
        this.sub.unsubscribe();
    }
}