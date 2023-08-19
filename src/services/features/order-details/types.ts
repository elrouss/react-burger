export interface IOrderResponseSuccess {
  success: true;
  name: string;
  order: {
    number: number;
  };
}

export interface IOrderResponseFail {
  success: false;
  message: string;
}
