import { createReducer, on } from '@ngrx/store';

import {
  addAssociateSuccess,
  loadAssociateFail,
  loadAssociateSuccess,
} from './associate.action';
import { associateState } from './associate.state';

const _associateReducer = createReducer(
  associateState,
  on(loadAssociateSuccess, (state, action) => {
    return {
      ...state,
      list: [...action.list],
      errorMessage: '',
    };
  }),
  on(loadAssociateFail, (state, action) => {
    return {
      ...state,
      list: [],
      errorMessage: action.errorMessage,
    };
  }),
  on(addAssociateSuccess, (state, action) => {
    const _maxId = Math.max(...state.list.map(item => item.id));
    const _newData = { ...action.inputData };
    _newData.id = _maxId + 1;
    return {
      ...state,
      list: [...state.list, _newData],
      errorMessage: '',
    };
  }),
);

export function AssociateReducer(state: any, action: any) {
  return _associateReducer(state, action);
}
