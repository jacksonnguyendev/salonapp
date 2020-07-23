import {BaseInteractor} from '../BaseInteractor';
import {IListStore} from 'core/entities/Store';
import {StoreFilterParams} from 'core/services/ApiService/Store';

export interface SearchStoreService {
  search: (params: StoreFilterParams) => Promise<IListStore>;
}

export class SearchStoreInteractor extends BaseInteractor<
  SearchStoreService,
  StoreFilterParams
> {
  async excute(params: StoreFilterParams): Promise<IListStore> {
    console.log(params)
    return this.getService().search(params);
  }
}
