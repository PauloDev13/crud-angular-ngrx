import { createReducer, on } from '@ngrx/store';

import {
  addAssociateSuccess,
  getAssociateSuccess,
  loadAssociateFail,
  loadAssociateSuccess,
  openPopup,
  removeAssociateSuccess,
  updateAssociateSuccess,
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

  on(getAssociateSuccess, (state, action) => {
    return {
      ...state,
      associateObject: action.obj,
      errorMessage: '',
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

  on(updateAssociateSuccess, (state, action) => {
    const _newData = state.list.map(obj => {
      return obj.id === action.inputData.id ? action.inputData : obj;
    });
    return {
      ...state,
      list: _newData,
      errorMessage: '',
    };
  }),

  on(removeAssociateSuccess, (state, action) => {
    const _newData = state.list.filter(obj => obj.id !== action.code);
    return {
      ...state,
      list: _newData,
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

  on(openPopup, (state, action) => {
    return {
      ...state,
      associateObject: {
        id: 0,
        name: '',
        email: '',
        phone: '',
        type: 'COSTUMER',
        address: '',
        associateGroup: 'level1',
        status: true,
      },
    };
  }),
);

export function AssociateReducer(state: any, action: any) {
  return _associateReducer(state, action);
}
