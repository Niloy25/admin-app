import React, { useEffect } from 'react';
import './App.css';
import { Switch, Route } from "react-router-dom";
import Home from './containers/Home';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import PrivateRoute from './components/HOC/PrivateRoute'
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn, getInitialData } from './actions';
import Products from './containers/Products';
import Orders from './containers/Orders';
import Category from './containers/Category';
import NewPAge from './containers/NewPage';

function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    if (auth.authenticate) {
      dispatch(getInitialData());
    }
  })

  return (
    <div className="App">
      <Switch>
        <PrivateRoute path="/" exact={true} component={Home} />
        <PrivateRoute path="/page" component={NewPAge} />
        <PrivateRoute path="/category" component={Category} />
        <PrivateRoute path="/products" component={Products} />
        <PrivateRoute path="/orders" component={Orders} />

        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
      </Switch>
    </div>
  );
}

export default App;
