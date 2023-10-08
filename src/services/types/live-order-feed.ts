export enum WebsocketStatus {
  CONNECTING = 'CONNECTING...',
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
}

export type TWebsocketOrder = {
  _id: string;
  ingredients: string[];
  status: 'created' | 'pending' | 'done';
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
};

export type TWebsocketOrders = {
  success: boolean;
  orders: TWebsocketOrder[];
  total: number;
  totalToday: number;
};
