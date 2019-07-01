export class Category {
  id: string;
  name: string;
  displayName: string;
  parentId: string;

  constructor(id: string = null, name: string, displayName: string, parentId: string = null) {
    if (id) {
      this.id = id;
    }
    this.name = name;
    this.displayName = displayName;
    this.parentId = parentId;
  }

}
