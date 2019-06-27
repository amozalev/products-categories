export class Category {
  id: string;
  name: string;
  displayName: string;
  parentId: number;
  children: number[];

  constructor(id: string, name: string, displayName: string, parentId = null, children: number[] = null) {
    this.id = id;
    this.name = name;
    this.displayName = displayName;
    this.parentId = parentId;
    this.children = children;
  }

}
