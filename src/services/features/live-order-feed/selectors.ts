import { RootState } from 'services/app/store';

export const getLiveOrderFeedData = (state: RootState) =>
  state.liveOrderFeed.orders;
