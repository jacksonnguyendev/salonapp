import {get} from 'lodash';
import {BaseApiService} from '../BaseApiService';
import {IListStore, StoreDataType, IStore, Store} from 'core/entities/Store';
import {SearchStoreService, SeeStoreDetailService} from 'core/useCases/Store';

export interface StoreFilterParams {
  /**
   * @param SearchText is stylist name or store name
   */
  searchText?: string;
  /**
   * Location to get nearest stores
   */
  latitude?: number;
  longitude?: number;
  /**
   * Get store has rating in range @param ratingFrom and @param ratingTo
   */
  ratingFrom?: number;
  ratingTo?: number;
}

export class StoreApiService extends BaseApiService<StoreDataType>
  implements SearchStoreService, SeeStoreDetailService {
  constructor() {
    super();
    this.setPath('/store');
    this.setDeserialize(Store.deserialize);
  }

  async search(filter: StoreFilterParams): Promise<IListStore> {
    return this.get(filter);
  }
}
