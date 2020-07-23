import get from "lodash/get";

import { IBaseEntity, BaseEntity } from "./BaseEntity";
export interface IBaseListEntity<EntityDataType> {
  getData(): IBaseEntity<EntityDataType>[];
  toJSON(): EntityDataType[];
  fromJSON(data: EntityDataType[]): void;
  getItem(id: number): IBaseEntity<EntityDataType> | undefined;
  addItem(entity: IBaseEntity<EntityDataType>): void;
  addItems(entities: IBaseListEntity<EntityDataType>): void;
}

export class BaseListEntity<EntityDataType>
  implements IBaseListEntity<EntityDataType> {
  private data: IBaseEntity<EntityDataType>[] = [];

  constructor(data: EntityDataType[] = []) {
    this.fromJSON(data);
  }

  getData(): IBaseEntity<EntityDataType>[] {
    return this.data;
  }

  toJSON(): EntityDataType[] {
    return this.data.map((item) => item.toJSON());
  }

  fromJSON(data: EntityDataType[]): void {
    this.data = data.map(
      (itemData) => new BaseEntity<EntityDataType>(itemData)
    );
  }

  getItem(id: number): IBaseEntity<EntityDataType> | undefined {
    return this.data.find(
      (item: IBaseEntity<EntityDataType>) =>
        get(item?.toJSON(), "id", -1) === id
    );
  }

  addItem(entity: IBaseEntity<EntityDataType>) {
    this.data.push(entity);
  }

  addItems(listEntity: IBaseListEntity<EntityDataType>) {
    this.data = [...this.data, ...listEntity.getData()];
  }

  updateItem(id: number, data: EntityDataType) {
    const item = this.getItem(id);
    item?.update(data);

    return new BaseListEntity(this.toJSON());
  }
}
