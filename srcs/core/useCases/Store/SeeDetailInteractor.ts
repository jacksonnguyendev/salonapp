import {BaseInteractor} from '../BaseInteractor';
import {IStore} from 'core/entities/Store';

export interface StoreDetailExcuteParams {
  id: number;
}

export interface SeeStoreDetailService {
  detail: (id: number) => Promise<IStore>;
}

export class SeeStoreDetailInteractor extends BaseInteractor<
  SeeStoreDetailService,
  StoreDetailExcuteParams
> {
  async excute(params: StoreDetailExcuteParams): Promise<IStore> {
    return this.getService().detail(params.id);
  }
}
