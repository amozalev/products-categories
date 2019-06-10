export class Product {
  id: number;
  title: string;
  price: number;
  description: string;
  picture: string;
  category: string;
  rating: number;
  amount: number;

  constructor(id: number, title: string, price: number, description: string, picture: string, category: string, amount = 0) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.description = description;
    this.picture = picture;
    this.category = category;
    this.amount = amount;
  }

}
