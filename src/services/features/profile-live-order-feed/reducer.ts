import { createReducer } from '@reduxjs/toolkit';
import {
  WebsocketStatus,
  TWebsocketOrders,
} from 'services/types/live-order-feed';
import {
  wsCloseProfile,
  wsConnectingProfile,
  wsErrorProfile,
  wsMessageProfile,
  wsOpenProfile,
} from './actions';

export type TLiveOrderFeedStore = {
  status: WebsocketStatus;
  orders: TWebsocketOrders | null;
  connectingError: string;
};

const initialState: TLiveOrderFeedStore = {
  status: WebsocketStatus.OFFLINE,
  orders: null,
  connectingError: '',
};

export const profileLiveOrderFeedReducer = createReducer(
  initialState,
  (builder) => {
    builder
      .addCase(wsConnectingProfile, (state) => {
        state.status = WebsocketStatus.CONNECTING;
      })
      .addCase(wsOpenProfile, (state) => {
        state.status = WebsocketStatus.ONLINE;
      })
      .addCase(wsCloseProfile, (state) => {
        state.status = WebsocketStatus.OFFLINE;
      })
      .addCase(wsErrorProfile, (state, action) => {
        state.connectingError = action.payload;
      })
      .addCase(wsMessageProfile, (state, action) => {
        state.orders = action.payload;
      });
  }
);
