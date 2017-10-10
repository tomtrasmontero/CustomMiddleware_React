export default function({ dispatch }) {
  // es5 equivalent
  // return function(next) {
  //   return function(action) {
  //     console.log(action);
  //     next(action);
  //   }
  // }

  return next => action => {
    console.log(action);
    // if there is no action.payload or if there is no promise helper .then
    if(!action.payload || !action.payload.then) {
      // return the action with out changing it in this middleware and send it
      // to the next middleware
      return next(action);
    }

    // make sure the action's promise resolves
    action.payload
      .then(response => {
        // take all the action but send the payload with final response data
        const newAction = {...action, payload: response};
        // dispatch = take this action and send it to All the middleware, do a
        // whole cycle of actions being dispatch to all the middleware
        dispatch(newAction);
      })
  };
}
