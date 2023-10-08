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

        socket.onmessage = (evt) => {
          const { data } = evt;
          const parsedData = JSON.parse(data);

          dispatch(onMessage(parsedData));
        };

        socket.onclose = () => dispatch(onClose());

        if (wsDisconnect.match(action)) {
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
