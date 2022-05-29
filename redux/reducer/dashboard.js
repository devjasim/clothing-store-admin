import { DASHBOARD } from '../actionTypes';

export const dashboard = (dashboardData = {}, action) => {
  switch (action.type) {
    case DASHBOARD:
      return action.payload;

    default:
      return dashboardData;
  }
};