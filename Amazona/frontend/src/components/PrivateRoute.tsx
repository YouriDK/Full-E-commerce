import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute: FC<any> = ({
  component: Component,
  ...rest
}): JSX.Element => {
  /*
   * Permet de revenir à la page de connexion
   * rest représente tous les paramètres de Route
   *
   */
  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;
  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to='/signin' />
        )
      }
    ></Route>
  );
};
export default PrivateRoute;
