import { createAction, props } from '@ngrx/store';

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: any; role: string; accessToken: string; refreshToken: string }>()
);

export const logout = createAction('[Auth] Logout');