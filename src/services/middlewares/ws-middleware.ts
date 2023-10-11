import {
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
  Middleware,
} from '@reduxjs/toolkit';

import {
  connect as LiveOrderFeedConnect,
  disconnect as LiveOrderFeedDisconnect,
  wsOpen as LiveOrderFeedWsOpen,
  wsClose as LiveOrderFeedWsClose,
  wsMessage as LiveOrderFeedWsMessage,
  wsError as LiveOrderFeedWsError,
  wsConnecting as LiveOrderFeedWsConnecting,
} from 'services/features/live-order-feed/actions';

import {
  connectProfile as ProfileLiveOrderFeedConnect,
  disconnectProfile as ProfileLiveOrderFeedDisconnect,
  wsOpenProfile as ProfileLiveOrderFeedWsOpen,
  wsCloseProfile as ProfileLiveOrderFeedWsClose,
  wsMessageProfile as ProfileLiveOrderFeedWsMessage,
  wsErrorProfile as ProfileLiveOrderFeedWsError,
  wsConnectingProfile as ProfileLiveOrderFeedWsConnecting,
} from 'services/features/profile-live-order-feed/actions';

import { refreshAccessToken } from 'services/features/user/api';

export type TWsActionTypes = {
  wsConnect: ActionCreatorWithPayload<string>;
  wsConnecting: ActionCreatorWithoutPayload;
  wsDisconnect: ActionCreatorWithoutPayload;
  onOpen: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<any>;
};

const wsMiddleware =
  (wsActions: TWsActionTypes): Middleware<{}, unknown> =>
  (store) => {
    let socket: WebSocket | null = null;
    let hasDisconnected = false;

    return (next) => (action) => {
      const { dispatch } = store;
      const {
        wsConnect,
        wsConnecting,
        wsDisconnect,
        onOpen,
        onClose,
        onMessage,
        onError,
      } = wsActions;

      if (wsConnect.match(action)) {
        socket = new WebSocket(action.payload);
        dispatch(wsConnecting());
      }

      if (socket) {
        socket.onopen = () => dispatch(onOpen());

        socket.onerror = () => dispatch(onError('Some error'));

        socket.onmessage = (evt: MessageEvent<string>) => {
          try {
            const { data } = evt;
            const parsedData = JSON.parse(data);

            if (parsedData?.message === 'Invalid or missing token') {
              refreshAccessToken();
            } else {
              dispatch(onMessage(parsedData));
            }
          } catch (error) {
            console.error(error);
          }
        };

        socket.onclose = () => dispatch(hasDisconnected ? onClose() : onOpen());

        if (wsDisconnect.match(action)) {
          hasDisconnected = true;
          socket.close();
          socket = null;
        }
      }

      next(action);
    };
  };

export const liveOrderFeedMiddleware = wsMiddleware({
  wsConnect: LiveOrderFeedConnect,
  wsDisconnect: LiveOrderFeedDisconnect,
  wsConnecting: LiveOrderFeedWsConnecting,
  onOpen: LiveOrderFeedWsOpen,
  onClose: LiveOrderFeedWsClose,
  onError: LiveOrderFeedWsError,
  onMessage: LiveOrderFeedWsMessage,
});

export const profileLiveOrderFeedMiddleware = wsMiddleware({
  wsConnect: ProfileLiveOrderFeedConnect,
  wsDisconnect: ProfileLiveOrderFeedDisconnect,
  wsConnecting: ProfileLiveOrderFeedWsConnecting,
  onOpen: ProfileLiveOrderFeedWsOpen,
  onClose: ProfileLiveOrderFeedWsClose,
  onError: ProfileLiveOrderFeedWsError,
  onMessage: ProfileLiveOrderFeedWsMessage,
});
