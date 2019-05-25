export class Category {
  id: number;
  name: string;
  normal_name: string;
  parent: number;

  constructor(id: number, name: string, normal_name: string, parent = null) {
    this.id = id;
    this.name = name;
    this.normal_name = normal_name;
    this.parent = parent;
  }

}
