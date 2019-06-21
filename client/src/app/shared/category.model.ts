export class Category {
  id: number;
  name: string;
  displayName: string;
  parentId: number;
  children: number[];

  constructor(id: number, name: string, displayName: string, parentId = null, children: number[] = null) {
    this.id = id;
    this.name = name;
    this.displayName = displayName;
    this.parentId = parentId;
    this.children = children;
  }

}
