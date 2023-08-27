import { createAction, props } from '@ngrx/store';

import { Associate } from '../model/associate.model';

export const LOAD_ASSOCIATE = '[associate page]load associate';
export const LOAD_ASSOCIATE_SUCCESS = '[associate page]load associate success';
export const LOAD_ASSOCIATE_FAIL = '[associate page]load associate fail';

export const ADD_ASSOCIATE = '[associate page]add associate';
export const ADD_ASSOCIATE_SUCCESS = '[associate page]add associate success';

export const loadAssociate = createAction(LOAD_ASSOCIATE);
export const loadAssociateSuccess = createAction(
  LOAD_ASSOCIATE_SUCCESS,
  props<{ list: Associate[] }>(),
);
export const loadAssociateFail = createAction(
  LOAD_ASSOCIATE_FAIL,
  props<{ errorMessage: string }>(),
);

export const addAssociate = createAction(
  ADD_ASSOCIATE,
  props<{ inputData: Associate }>(),
);
export const addAssociateSuccess = createAction(
  ADD_ASSOCIATE_SUCCESS,
  props<{ inputData: Associate }>(),
);
