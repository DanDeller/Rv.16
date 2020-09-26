import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';

export const fetchDaysSuccess = days => ({
  type: actionTypes.FETCH_DAYS_SUCCESS,
  days: days
});

export const fetchDaysStart = () => ({
  type: actionTypes.FETCH_DAYS_START
});

export const setFetchFlag = fetchFlag => ({
  type: actionTypes.FETCH_FLAG,
  fetchFlag: fetchFlag
});

export const fetchDays = city => {
  return dispatch => {
    if (!city.length) {
      return;
    } else {
      dispatch(fetchDaysStart());
      axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=6d5233c17d482d1c20dabfc48d8b3112&units=imperial`)
      .then(res => {
        if (res) {
          const newData = [],
                set     = res.data;

          if (set.list) {
            set.list.map((o) => {
              const date = o.dt_txt.split(' ')[1];
              
              if (date === '15:00:00') {
                newData.push(o);
              }

              return newData.splice(5);
            });
            dispatch(fetchDaysSuccess(newData));
          }
        }
      })
      .catch((error) => console.log(error));
    }
  }
};