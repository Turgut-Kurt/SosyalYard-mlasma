import React from 'react';
import {CommonActions} from '@react-navigation/native';
const navigationRef = React.createRef();
function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}
// add other navigation functions that you need and export them

function navigate12(routeName, params) {
  navigationRef.dispatch(
    CommonActions.navigate({
      routeName,
      params,
    }),
  );
}

export default {
  navigate12,
  navigate,
  navigationRef,
};
