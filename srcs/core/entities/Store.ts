import {get} from 'lodash';
import {BaseEntity, IBaseEntity} from './BaseEntity';
import {BaseListEntity, IBaseListEntity} from './BaseListEntity';
import {Attachment} from './Attachment';

export interface CategoryInfo {
  readonly id: number;
  readonly name: string;
  readonly color: string;
}

export interface StoreInfo {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly address: string;
  readonly latitude: number;
  readonly longitude: number;
  readonly attachments: Attachment[];
  readonly rating: number | null;
}

export interface StylistInfo {
  readonly id: number;
  readonly userName: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly avatar?: Attachment;
}

export interface ServiceInfo {
  readonly serviceId: number;
  readonly serviceName: string;
  readonly description: string;
  readonly serviceTime: number;
  readonly unitTime: string;
  readonly currency: string;
  readonly price: number;
  readonly serviceCategory: CategoryInfo;
  readonly attachments: Attachment[];
}

export interface StoreDataType {
  readonly storeInfo: StoreInfo;
  readonly stylistInfo: StylistInfo;
  readonly servicesInfo?: ServiceInfo[];
}

export interface IStore extends IBaseEntity<StoreDataType> {}

export class Store extends BaseEntity<StoreDataType> {
  static deserialize(data: any): StoreDataType {
    return {
      storeInfo: {
        id: get(data, 'storeInfo.id', -1),
        name: get(data, 'storeInfo.name', ''),
        address: get(data, 'storeInfo.address', ''),
        description: get(data, 'storeInfo.description', ''),
        latitude: get(data, 'storeInfo.latitude', -1),
        longitude: get(data, 'storeInfo.longitude', -1),
        attachments: get(data, 'storeInfo.attachments', []),
        rating: get(data, 'storeInfo.rating', null),
      },
      stylistInfo: {
        id: get(data, 'stylistInfo.id', -1),
        userName: get(data, 'stylistInfo.userName', ''),
        firstName: get(data, 'stylistInfo.firstName', ''),
        lastName: get(data, 'stylistInfo.lastName', ''),
        avatar: get(data, 'stylistInfo.avatar', null),
      },
      servicesInfo: get(data, 'servicesInfo', []),
    };
  }
}

export interface IListStore extends IBaseListEntity<StoreDataType> {}

export class ListStore extends BaseListEntity<StoreDataType> {}
