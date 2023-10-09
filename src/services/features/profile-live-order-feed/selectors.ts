import { RootState } from 'services/app/store';

export const getProfileLiveOrderFeedData = (state: RootState) =>
  state.profileOrderFeed.orders;
