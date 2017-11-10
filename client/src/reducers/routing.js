import { routerReducer, LOCATION_CHANGE } from 'react-router-redux';

export default function routing(state, action) {
    if (action.type === LOCATION_CHANGE) {
        switch (action.payload.pathname) {
        case '/booking-verify': {
            break;
        }
        case '/settlement/withdraw/history': {
            break;
        }
        default:
        }
    }

    return routerReducer(state, action);
}
