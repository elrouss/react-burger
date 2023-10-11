import { createReducer } from '@reduxjs/toolkit';
import {
  WebsocketStatus,
  TWebsocketOrders,
} from 'services/types/live-order-feed';
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from './actions';

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

export const liveOrderFeedReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnecting, (state) => {
      state.status = WebsocketStatus.CONNECTING;
    })
    .addCase(wsOpen, (state) => {
      state.status = WebsocketStatus.ONLINE;
    })
    .addCase(wsClose, (state) => {
      state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(wsError, (state, action) => {
      state.connectingError = action.payload;
    })
    .addCase(wsMessage, (state, action) => {
      state.orders = action.payload;
    });
});
