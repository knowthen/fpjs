import * as R from 'ramda';

export const MSGS = {
  LOCATION_INPUT: 'LOCATION_INPUT',
  ADD_LOCATION: 'ADD_LOCATION',
  UPDATE_LOCATION: 'UPDATE_LOCATION',
  REMOVE_LOCATION: 'REMOVE_LOCATION',
  HTTP_SUCCESS: 'HTTP_SUCCESS',
  HTTP_ERROR: 'HTTP_ERROR',
};

export function locationInputMsg(location) {
  return {
    type: MSGS.LOCATION_INPUT,
    location,
  };
}

export const addLocationMsg = {
  type: MSGS.ADD_LOCATION,
};

export function updateLocationMsg(id, location) {
  return {
    type: MSGS.UPDATE_LOCATION,
    id,
    location,
  };
}

export function removeLocationMsg(id) {
  return {
    type: MSGS.REMOVE_LOCATION,
    id,
  };
}

function apiUrl(q) {
  return `http://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
    q,
  )}&units=imperial&APPID=c679a2284718a3fc54d075ceb57a81ab`;
}

function httpSuccess(response) {
  return {
    type: MSGS.HTTP_SUCCESS,
    resopnse,
  };
}

function httpError(error) {
  return {
    type: MSGS.HTTP_ERROR,
    error,
  };
}

function httpCommand(request, success, error) {
  return {
    request,
    success,
    error,
  };
}

function update(msg, model) {
  switch (msg.type) {
    case MSGS.LOCATION_INPUT: {
      const { location } = msg;
      return [{ ...model, location }];
    }
    case MSGS.ADD_LOCATION: {
      const { location } = model;
      const url = apiUrl(location);
      const command = httpCommand(
        { method: 'get', url },
        httpSuccess,
        httpError,
      );
      return [model, command];
    }
    case MSGS.HTTP_SUCCESS: {
      const { response } = msg;
      const { locations, nextId } = model;
      const temp = R.pipe(R.path(['data', 'main', 'temp']), Math.round)(
        response,
      );
      const low = R.pipe(R.path(['data', 'main', 'temp_min']), Math.round)(
        response,
      );
      const high = R.pipe(R.path(['data', 'main', 'temp_max']), Math.round)(
        response,
      );
      const location = { temp, low, high };
      const updatedLocations = R.append(location, locations);
      return [
        {
          ...model,
          locations: updatedLocations,
          location: '',
          nextId: nextId + 1,
        },
      ];
    }
    case MSGS.HTTP_ERROR: {
    }
    case MSGS.REMOVE_LOCATION: {
      const { id } = msg;
      const { locations } = model;
      const updatedLocations = R.reject(R.propEq('id', id), locations);
      return [{ ...model, locations: updatedLocations }];
    }
    case MSGS.UPDATE_LOCATION: {
      const { id, location } = msg;
      const { locations } = model;
      const updatedLocations = R.map(
        R.when(R.propEq('id', id), R.merge(R.__, location)),
        locations,
      );
      return [{ ...model, locations: updatedLocations }];
    }
    default:
      return [model];
  }
}

export default update;
