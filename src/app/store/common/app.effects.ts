import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs';

import { emptyAction, showAlert } from './app.action';

@Injectable()
export class AppEffects {
  _showAlert = createEffect(() => {
    return this.actions$.pipe(
      ofType(showAlert),
      exhaustMap(action => {
        return this.showSnackBarAlert(action.message, action.resultType)
          .afterDismissed()
          .pipe(
            map(() => {
              return emptyAction();
            }),
          );
      }),
    );
  });

  constructor(
    private actions$: Actions,
    private snackBar: MatSnackBar,
  ) {}

  showSnackBarAlert(message: string, resultType = 'fail') {
    const _class = resultType === 'pass' ? 'green-snackbar' : 'red-snackbar';
    return this.snackBar.open(message, 'OK', {
      verticalPosition: 'top',
      horizontalPosition: 'end',
      duration: 3000,
      panelClass: [_class],
    });
  }
}
