import { RootState } from 'services/app/store';

export const getLiveOrderFeedData = (state: RootState) =>
  state.liveOrderFeed.orders?.orders;
export const getLiveOrderFeedTotalAll = (state: RootState) =>
  state.liveOrderFeed.orders?.total;
export const getLiveOrderFeedTotalToday = (state: RootState) =>
  state.liveOrderFeed.orders?.totalToday;
