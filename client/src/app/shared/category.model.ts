export class Category {
  id: number;
  name: string;
  normal_name: string;
  parent: number;
  children: number[];

  constructor(id: number, name: string, normal_name: string, parent = null, children: number[] = null) {
    this.id = id;
    this.name = name;
    this.normal_name = normal_name;
    this.parent = parent;
    this.children = children;
  }

}
