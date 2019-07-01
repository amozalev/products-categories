import {BaseModel} from './base.model';

export class Product extends BaseModel {
  price: number;
  description: string;
  picture: string;
  categoryId: string;
  rating: number;
  amount: number;
  volume: number;
  units: string;
  producer: string;

  constructor(id: string = null,
              name: string,
              price: number,
              description: string,
              picture: string,
              categoryId: string,
              volume: number,
              units: string,
              producer: string,
              amount = 0) {
    super(id, name);
    this.price = price;
    this.description = description;
    this.picture = picture;
    this.categoryId = categoryId;
    this.amount = amount;
    this.volume = volume;
    this.units = units;
    this.producer = producer;
  }

}
