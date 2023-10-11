import { createAction } from '@reduxjs/toolkit';
import { TWebsocketOrders } from 'services/types/live-order-feed';

export const connectProfile = createAction<
  string,
  'PROFILE_LIVE_ORDER_FEED_CONNECT'
>('PROFILE_LIVE_ORDER_FEED_CONNECT');
export const disconnectProfile = createAction(
  'PROFILE_LIVE_ORDER_FEED_DISCONNECT'
);
export const wsConnectingProfile = createAction(
  'PROFILE_LIVE_ORDER_WS_CONNECTING'
);
export const wsOpenProfile = createAction('PROFILE_LIVE_ORDER_WS_OPEN');
export const wsCloseProfile = createAction('PROFILE_LIVE_ORDER_WS_CLOSE');
export const wsMessageProfile = createAction<
  TWebsocketOrders,
  'PROFILE_LIVE_ORDER_WS_MESSAGE'
>('PROFILE_LIVE_ORDER_WS_MESSAGE');
export const wsErrorProfile = createAction<
  string,
  'PROFILE_LIVE_ORDER_WS_ERROR'
>('PROFILE_LIVE_ORDER_WS_ERROR');

export type TOrderFeedActions =
  | ReturnType<typeof connectProfile>
  | ReturnType<typeof disconnectProfile>
  | ReturnType<typeof wsConnectingProfile>
  | ReturnType<typeof wsOpenProfile>
  | ReturnType<typeof wsCloseProfile>
  | ReturnType<typeof wsMessageProfile>
  | ReturnType<typeof wsErrorProfile>;
