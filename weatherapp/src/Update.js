import * as R from 'ramda';

const API_KEY = 'c679a2284718a3fc54d075ceb57a81ab';

export const MSGS = {
  LOCATION_INPUT: 'LOCATION_INPUT',
  ADD_LOCATION: 'ADD_LOCATION',
  REMOVE_LOCATION: 'REMOVE_LOCATION',
  HTTP_SUCCESS: 'HTTP_SUCCESS',
  HTTP_ERROR: 'HTTP_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
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

export function removeLocationMsg(id) {
  return {
    type: MSGS.REMOVE_LOCATION,
    id,
  };
}

function httpSuccessMsg(response) {
  return {
    type: MSGS.HTTP_SUCCESS,
    response,
  };
}

function httpErrorMsg(error) {
  return {
    type: MSGS.HTTP_ERROR,
    error,
  };
}

export const clearErrorMsg = {
  type: MSGS.CLEAR_ERROR,
};

function httpCommand(request, successMsg, errorMsg) {
  return {
    request,
    successMsg,
    errorMsg,
  };
}

function apiUrl(q) {
  return `http://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
    q,
  )}&units=imperial&APPID=${API_KEY}`;
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
        httpSuccessMsg,
        httpErrorMsg,
      );
      return [model, command];
    }
    case MSGS.HTTP_SUCCESS: {
      const { response } = msg;
      const { location, locations, nextId } = model;
      const { temp, temp_min, temp_max } = R.pathOr(
        {},
        ['data', 'main'],
        response,
      );

      const newLocation = {
        id: nextId,
        name: location,
        temp: Math.round(temp),
        low: Math.round(temp_min),
        high: Math.round(temp_max),
      };
      const updatedLocations = R.prepend(newLocation, locations);
      return [
        {
          ...model,
          locations: updatedLocations,
          location: '',
          nextId: nextId + 1,
          error: null,
        },
      ];
    }
    case MSGS.HTTP_ERROR: {
      const { error } = msg;
      console.log(JSON.stringify(error));
      return [{ ...model, error: error.message }];
    }
    case MSGS.REMOVE_LOCATION: {
      const { id } = msg;
      const { locations } = model;
      const updatedLocations = R.reject(R.propEq('id', id), locations);
      return [{ ...model, locations: updatedLocations }];
    }
    case MSGS.CLEAR_ERROR: {
      return [{ ...model, error: null }];
    }
  }
  return [model];
}

export default update;
