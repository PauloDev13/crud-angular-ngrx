import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AssociateModel } from '../model/associate.model';

const selectAssociateState = createFeatureSelector<AssociateModel>('associate');

export const selectAssociateList = createSelector(
  selectAssociateState,
  state => {
    return state.list;
  },
);

export const selectAssociate = createSelector(selectAssociateState, state => {
  return state.associateObject;
});
