// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { Store } from '@ngrx/store';
// import { of } from 'rxjs';
// import { catchError, map, mergeMap } from 'rxjs/operators';
// import { AuthService } from '../services/authService/auth.service';
// import * as AuthActions from './auth.actions';

// @Injectable()
// export class AuthEffects {
//   constructor(
//     private actions$: Actions,
//     private authService: AuthService,
//     private store: Store
//   ) {}

//   authenticateAdmin$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(AuthActions.authenticateAdmin),
//       mergeMap((action) =>
//         this.authService.authenticateAdmin(action.credentials).pipe(
//           map((user) => AuthActions.loginSuccess({ user, role: 'admin' })),
//           catchError((error) => of(AuthActions.loginFailure({ error })))
//         )
//       )
//     )
//   );

//   authenticateCompany$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(AuthActions.authenticateCompany),
//       mergeMap((action) =>
//         this.authService.authenticateCompany(action.credentials).pipe(
//           map((user) => AuthActions.loginSuccess({ user, role: 'company' })),
//           catchError((error) => of(AuthActions.loginFailure({ error })))
//         )
//       )
//     )
//   );

//   authenticateApplicant$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(AuthActions.authenticateApplicant),
//       mergeMap((action) =>
//         this.authService.authenticateApplicant(action.credentials).pipe(
//           map((user) => AuthActions.loginSuccess({ user, role: 'applicant' })),
//           catchError((error) => of(AuthActions.loginFailure({ error })))
//         )
//       )
//     )
//   );
// }
