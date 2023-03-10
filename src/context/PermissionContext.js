import React, { createContext, useReducer, useMemo } from "react";
import PropTypes from "prop-types";

const PermissionContext = createContext({});

const initialState = {
  permission: [],
};

const reducer = (state, action) => {
  return { ...state, permission: action.payload };
};

export const PermissionProvider = ({ children }) => {
  const [{ permission }, dispatch] = useReducer(reducer, initialState);
  const values = useMemo(() => ({
    permission,
    dispatch,
  }));
  return (
    <PermissionContext.Provider value={values}>
      {children}
    </PermissionContext.Provider>
  );
};

PermissionProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
export default PermissionContext;
