import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectLoggedInUser = createSelector(
  selectAuthState,
  (state) => state.user
);

export const selectAccessToken = createSelector(
  selectAuthState,
  (state) => state.accessToken
);

export const selectRefreshToken = createSelector(
  selectAuthState,
  (state) => state.refreshToken
);
