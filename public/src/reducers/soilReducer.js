import { GET_SOIL } from '../actions/types';

export default function(state = {}, action) {
    switch(action.type) {
        case GET_SOIL:
            return { ...state, soil: action.payload };
    }
    
    return state;
}