import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';

import { AssociateService } from '../../service/associate/associate.service';
import { showAlert } from '../common/app.action';
import {
  addAssociate,
  addAssociateSuccess,
  loadAssociate,
  loadAssociateFail,
  loadAssociateSuccess,
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

  constructor(
    private action$: Actions,
    private associateService: AssociateService,
  ) {}
}
