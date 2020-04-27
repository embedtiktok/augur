import {
  IS_MOBILE,
  IS_MOBILE_SMALL,
  UPDATE_APP_STATUS,
  ETH_TO_DAI_RATE,
  REP_TO_DAI_RATE,
  GSN_ENABLED,
  Ox_ENABLED,
  WALLET_STATUS,
  Ox_STATUS,
} from 'modules/app/actions/update-app-status';
import { RESET_STATE } from 'modules/app/actions/reset-state';
import { AppStatus, BaseAction } from 'modules/types';

const DEFAULT_STATE = {
  [IS_MOBILE]: false,
  [IS_MOBILE_SMALL]: false,
  [ETH_TO_DAI_RATE]: null,
  [REP_TO_DAI_RATE]: null,
  [GSN_ENABLED]: false,
  [WALLET_STATUS]: null,
  [Ox_ENABLED]: false,
  [Ox_STATUS]: null,
};

const KEYS = Object.keys(DEFAULT_STATE);

export default function(
  appStatus = DEFAULT_STATE,
  { type, data }: BaseAction
): AppStatus {
  switch (type) {
    case UPDATE_APP_STATUS: {
      const { statusKey, value } = data;
      if (KEYS.includes(statusKey)) {
        return {
          ...appStatus,
          [statusKey]: value,
        };
      }
      return appStatus;
    }
    case RESET_STATE:
      return DEFAULT_STATE;
    default:
      return appStatus;
  }
}
