export class Product {
  id: number;
  title: string;
  price: number;
  description: string;
  picture: string;
  rating: number;

  constructor(id: number, title: string, price: number, description: string, picture: string) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.description = description;
    this.picture = picture;
  }

}
