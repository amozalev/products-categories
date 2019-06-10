import {Product} from '../shared/product.model';
import {Subject} from 'rxjs';

export class ProductService {
    private products: Product[] = [
        new Product(1,
            'Red apple',
            11,
            'Red and tasty',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/300px-Red_Apple.jpg',
            'fruit'),

        new Product(2,
            'Green apple',
            9,
            'Green and bitter',
            'https://ru0.anyfad.com/items/t2@91855199-6b17-4538-8599-55583e517052/Frukty-yabloko-zelenyy-8-sm.jpg',
            'fruit'),
        new Product(3,
            'Yellow apple',
            3,
            'Sweet',
            'https://apolytosdiallaktikos.files.wordpress.com/2018/04/images.jpeg',
            'fruit'),
        new Product(4,
            'Tomato',
            4,
            'Fresh',
            'https://static.ruvita.ru/store/product/243x243_e670ea3a9e423780f3c7787efc204dd1.jpg',
            'vegetable'),
        new Product(5,
            'Cucumber',
            5,
            'Long',
            'https://sklep.swiatkwiatow.pl/images/thumbnails/320/290/detailed/45/010473.jpg',
            'vegetable'),
        new Product(6,
            'Pumpkin',
            13,
            'Big and yellow',
            'https://purepng.com/public/uploads/thumbnail/purepng.com-pumpkinpumpkinvegetablefoodroundedfruitpumpkins-1701527312953yikz1.png',
            'vegetable')
    ];
    private filteredProducts: Product[];

    cartProducts: Product[] = [];
    cartProductsCountChanged = new Subject<number>();
    cartProductsCount = 0;
    productsListChanged = new Subject<Product[]>();
    editedProduct = new Subject<number>();

    getProducts() {
        return this.products.slice();
    }

    getFilteredProducts(filterBy: string = null) {
        this.filteredProducts = filterBy ? this.performFilter(filterBy) : this.getProducts();

        this.productsListChanged.next(this.filteredProducts);
        return this.filteredProducts;
    }

    performFilter(filterBy: string): Product[] {
        return this.products.filter((product: Product) =>
            product.category.indexOf(filterBy) !== -1);
    }

    addProduct(product: Product, editMode = false) {
        if (!editMode) {
            this.products.push(product);
            this.productsListChanged.next(this.products.slice());
        } else {
            const index = this.products.findIndex((c) => {
                return c.id === product.id;
            });
            if (index !== -1) {
                this.products[index] = product;
                this.productsListChanged.next(this.products.slice());
            }
        }

    }

    deleteProduct(id: number) {
        const index = this.products.findIndex((c) => {
            return c.id === id;
        });
        if (index !== -1) {
            this.products.splice(index, 1);
            this.productsListChanged.next(this.products.slice());
        }
    }

    getCartProducts() {
        return this.cartProducts.slice();
    }

    getProductById(id: number) {
        const product = this.products.find((prod) => {
            return prod.id === id;
        });
        return product;
    }

    addToCart(product_id: number) {
        const product = this.getProductById(product_id);
        const product_exists = this.cartProducts.find((prod) => {
            if (prod.id === product_id) {
                return true;
            }
        });
        product.amount++;
        this.cartProductsCount++;
        this.cartProductsCountChanged.next(this.cartProductsCount);
        if (!product_exists) {
            this.cartProducts.push(product);
        }
    }

    removeFromCart(index: number) {
        const product = this.cartProducts[index];
        this.cartProducts.splice(index, 1);
        this.cartProductsCount -= product.amount;
        this.cartProductsCountChanged.next(this.cartProductsCount);
    }
}
