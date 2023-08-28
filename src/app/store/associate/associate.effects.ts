import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';

import { AssociateService } from '../../service/associate/associate.service';
import { showAlert } from '../common/app.action';
import {
  addAssociate,
  addAssociateSuccess,
  getAssociate,
  getAssociateSuccess,
  loadAssociate,
  loadAssociateFail,
  loadAssociateSuccess,
  removeAssociate,
  removeAssociateSuccess,
  updateAssociate,
  updateAssociateSuccess,
} from './associate.action';

@Injectable()
export class AssociateEffects {
  _loadAssociate = createEffect(() => {
    return this.action$.pipe(
      ofType(loadAssociate),
      exhaustMap(() => {
        return this.associateService.getAll().pipe(
          map(data => {
            return loadAssociateSuccess({ list: data });
          }),
          catchError(_error =>
            of(loadAssociateFail({ errorMessage: _error.message })),
          ),
        );
      }),
    );
  });

  _getAssociate = createEffect(() => {
    return this.action$.pipe(
      ofType(getAssociate),
      exhaustMap(action => {
        return this.associateService.getByCode(action.code).pipe(
          map(data => {
            return getAssociateSuccess({ obj: data });
          }),
          catchError(() =>
            of(
              showAlert({
                message: 'Falha ao buscar dados.',
                resultType: 'fail',
              }),
            ),
          ),
        );
      }),
    );
  });

  _addAssociate = createEffect(() => {
    return this.action$.pipe(
      ofType(addAssociate),
      switchMap(action => {
        return this.associateService.create(action.inputData).pipe(
          switchMap(data => {
            return of(
              addAssociateSuccess({ inputData: action.inputData }),
              showAlert({
                message: 'Associado adicionado com sucesso.',
                resultType: 'pass',
              }),
            );
          }),
          catchError(() =>
            of(
              showAlert({
                message: 'Falha ao adicionar Associado.',
                resultType: 'fail',
              }),
            ),
          ),
        );
      }),
    );
  });

  _updateAssociate = createEffect(() => {
    return this.action$.pipe(
      ofType(updateAssociate),
      switchMap(action => {
        return this.associateService.update(action.inputData).pipe(
          switchMap(data => {
            return of(
              updateAssociateSuccess({ inputData: action.inputData }),
              showAlert({
                message: 'Associado atualizado com sucesso.',
                resultType: 'pass',
              }),
            );
          }),
          catchError(() =>
            of(
              showAlert({
                message: 'Falha ao atualizar Associado.',
                resultType: 'fail',
              }),
            ),
          ),
        );
      }),
    );
  });

  _removeAssociate = createEffect(() => {
    return this.action$.pipe(
      ofType(removeAssociate),
      switchMap(action => {
        return this.associateService.remove(action.code).pipe(
          switchMap(data => {
            return of(
              removeAssociateSuccess({ code: action.code }),
              showAlert({
                message: 'Associado removido com sucesso.',
                resultType: 'pass',
              }),
            );
          }),
          catchError(() =>
            of(
              showAlert({
                message: 'Falha ao remover Associado.',
                resultType: 'fail',
              }),
            ),
          ),
        );
      }),
    );
  });

  constructor(
    private action$: Actions,
    private associateService: AssociateService,
  ) {}
}
