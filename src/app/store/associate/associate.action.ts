import { createAction, props } from '@ngrx/store';

import { Associate } from '../model/associate.model';

export const LOAD_ASSOCIATE = '[associate page]load associate';
export const LOAD_ASSOCIATE_SUCCESS = '[associate page]load associate success';
export const LOAD_ASSOCIATE_FAIL = '[associate page]load associate fail';

export const ADD_ASSOCIATE = '[associate page]add associate';
export const ADD_ASSOCIATE_SUCCESS = '[associate page]add associate success';

export const GET_ASSOCIATE = '[associate page]get associate';
export const GET_ASSOCIATE_SUCCESS = '[associate page]ger associate success';
export const OPEN_POPUP = '[associate page]open popup';

export const UPDATE_ASSOCIATE = '[associate page]update associate';
export const UPDATE_ASSOCIATE_SUCCESS =
  '[associate page]update associate success';

export const REMOVE_ASSOCIATE = '[associate page]remove associate';
export const REMOVE_ASSOCIATE_SUCCESS =
  '[associate page]remove associate success';

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

export const getAssociate = createAction(
  GET_ASSOCIATE,
  props<{ code: number }>(),
);
export const getAssociateSuccess = createAction(
  GET_ASSOCIATE_SUCCESS,
  props<{ obj: Associate }>(),
);

export const openPopup = createAction(OPEN_POPUP);

export const updateAssociate = createAction(
  UPDATE_ASSOCIATE,
  props<{ inputData: Associate }>(),
);
export const updateAssociateSuccess = createAction(
  UPDATE_ASSOCIATE_SUCCESS,
  props<{ inputData: Associate }>(),
);

export const removeAssociate = createAction(
  REMOVE_ASSOCIATE,
  props<{ code: number }>(),
);
export const removeAssociateSuccess = createAction(
  REMOVE_ASSOCIATE_SUCCESS,
  props<{ code: number }>(),
);
