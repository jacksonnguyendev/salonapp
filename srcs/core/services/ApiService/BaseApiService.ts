import * as queryString from "query-string";
import { BaseListEntity } from "core/entities/BaseListEntity";
import { BaseEntity, IBaseEntity } from "core/entities/BaseEntity";
import { axiosClient } from "core/adapters";

export class BaseApiService<EntityDataType> {
  private path: string = "";

  private deserialize = (data: any) => {return data}

  setPath(path: string) {
    this.path = path;
  }

  setDeserialize = (deserialize: (data: any) => any) => {
    this.deserialize = deserialize
  }

  async detail(id: string | number): Promise<IBaseEntity<EntityDataType>> {
    try {
      const result = await axiosClient.get(`${this.path}/${id}`);

      let data = result.data;
      
        data = this.deserialize(data) ;
      
      return new BaseEntity<EntityDataType>(data);
    } catch (e) {
      throw e.response.data;
    }
  }

  async get(filter: any) {
    try {
      const query = queryString.stringify(filter as Object, {
        skipEmptyString: true,
        skipNull: true,
      });
      const result = await axiosClient.get(
        `${this.path}/${(query && `filter?${query}`) || ""}`
      );

      let data = result?.data || [];
      
      data = data.map((item: any) => this.deserialize(item));

      return new BaseListEntity<EntityDataType>(data);
    } catch (e) {
      throw e.response.data;
    }
  }

  async create(data: EntityDataType): Promise<IBaseEntity<EntityDataType>> {
    try {
      const result = await axiosClient.post(this.path, data);

      return new BaseEntity<EntityDataType>(result.data);
    } catch (e) {
      throw e.response.data;
    }
  }

  async update(): Promise<boolean> {
    try {
      await axiosClient.post(this.path);

      return true;
    } catch (e) {
      throw e.response.data;
    }
  }

  async delete(): Promise<boolean> {
    try {
      await axiosClient.post(this.path);

      return true;
    } catch (e) {
      throw e.response.data;
    }
  }
}
