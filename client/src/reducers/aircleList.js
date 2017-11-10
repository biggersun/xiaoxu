import { AIRCLELIST_GET } from 'constants/actionTypes';

const initializeState = {
    sth: 'sth',
};

export default function AircleList(state = initializeState, action) {
    switch (action.type) {
    case AIRCLELIST_GET: {
        const { payload } = action;
        const data = Object.assign(state, payload);
        return data;
    }
    default:
        return state;
    }
}
