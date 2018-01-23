import * as R from 'ramda';

export const MSGS = {
  LOCATION_INPUT: 'LOCATION_INPUT',
  ADD_LOCATION: 'ADD_LOCATION',
  REMOVE_LOCATION: 'REMOVE_LOCATION',
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

function update(msg, model) {
  switch (msg.type) {
    case MSGS.LOCATION_INPUT: {
      const { location } = msg;
      return { ...model, location };
    }
    case MSGS.ADD_LOCATION: {
      const { nextId, location, locations } = model;
      const newLocation = {
        id: nextId,
        name: location,
        temp: '?',
        low: '?',
        high: '?',
      };
      const updatedLocations = R.prepend(newLocation, locations);
      return {
        ...model,
        location: '',
        locations: updatedLocations,
        nextId: nextId + 1,
      };
    }
    case MSGS.REMOVE_LOCATION: {
      const { id } = msg;
      const { locations } = model;
      const updatedLocations = R.reject(R.propEq('id', id), locations);
      return { ...model, locations: updatedLocations };
    }
  }
  return model;
}

export default update;
