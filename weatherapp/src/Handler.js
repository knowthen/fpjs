import * as R from 'ramda';
import axios from 'axios';
import { addLocationMsg, locationInputMsg, updateLocationMsg } from './Update';

function apiUrl(q) {
  return `http://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
    q,
  )}&units=imperial&APPID=c679a2284718a3fc54d075ceb57a81ab`;
}

export async function addLocationHandler(e, dispatch, model) {
  e.preventDefault();
  const { location: name, nextId } = model;
  const newLocation = { id: nextId, name, low: null, high: null };
  dispatch(addLocationMsg(nextId + 1, newLocation));
  try {
    const url = apiUrl(name);
    const res = await axios.get(url);
    const temp = R.pipe(R.path(['data', 'main', 'temp']), Math.round)(res);
    const low = R.pipe(R.path(['data', 'main', 'temp_min']), Math.round)(res);
    const high = R.pipe(R.path(['data', 'main', 'temp_max']), Math.round)(res);
    dispatch(updateLocationMsg(nextId, { temp, low, high }));
  } catch (err) {
    console.log(err);
  }
}
