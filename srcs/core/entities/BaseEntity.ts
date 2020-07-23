export interface IBaseEntity<DataType> {
  toJSON(): DataType;
  fromJSON(data: DataType): void;
  update(Data: DataType): IBaseEntity<DataType>;
}

export class BaseEntity<DataType> implements IBaseEntity<DataType> {
  private data: DataType;

  constructor(data: DataType) {
    this.data = data;
  }

  toJSON(): DataType {
    return this.data;
  }

  fromJSON(data: DataType): void {
    this.data = data;
  }

  update(data: DataType): IBaseEntity<DataType> {
    this.data = { ...this.data, ...data };
    return new BaseEntity<DataType>(this.data);
  }
}
