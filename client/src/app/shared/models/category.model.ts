import {BaseModel} from './base.model';

export class Category extends BaseModel {
  displayName: string;
  parentId: string;

  constructor(id: string = null, name: string, displayName: string, parentId: string = null) {
    super(id, name);
    this.displayName = displayName;
    this.parentId = parentId;
  }

}
