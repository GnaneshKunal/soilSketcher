import axios from 'axios';
import {
    GET_SOIL
} from './types';

const ROOT_URL = 'http://localhost:8080';

export function getSoil() {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/values`)
              .then(response => {
                  dispatch({
                      type: GET_SOIL,
                      payload: response.data
                  });
              })
              .catch(err => {
                  console.log(err.response);
              });
    }
}