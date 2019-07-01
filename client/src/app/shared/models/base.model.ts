export class BaseModel {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    if (id) {
      this.id = id;
    }
    this.name = name;
  }
}
