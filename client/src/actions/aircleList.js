import {
    AIRCLE_LIST,
} from 'constants/api';
import { get } from 'assets/js/request';
import URI from 'urijs';
import { AIRCLELIST_GET } from 'constants/actionTypes';
import { actionCreator } from 'assets/js/util';

const aircleList = actionCreator(AIRCLELIST_GET);

export function fetchAircleList(opt = {}) {
    return async (dispatch, getState) => {
        const search = getState().routing.location.search;
        const {
            pageSize,
            pageIndex,
        } = URI.parseQuery(search);

        const params = Object.assign({
            pageSize,
            pageIndex,
        }, opt);

        let payload;

        try {
            payload = await get(AIRCLE_LIST, params);
        } catch (error) {
            return;
        }

        dispatch(aircleList(payload));
    };
}

