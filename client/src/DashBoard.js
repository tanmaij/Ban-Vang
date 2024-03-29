import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import Product from "./Pages/Product";
import Receipt from "./Pages/Receipt";
import Slide from "./Component/Slider/Slide";
import Account from "./Pages/Account";
import AuthContext from "./context/AuthContext";
const DashBoard = ({}) => {
  const authContext = useContext(AuthContext);
  const history = useHistory();
  useEffect(() => {
    if (authContext.accountData != null) {
      if (authContext.accountData.IsAdmin == 0) window.location.replace("/");
    } else history.push("/");
  }, [authContext]);
  return (
    <Router>
      <Slide />
      <Switch>
        <Route exact path="/dashboards/accounts" component={Account} />
        <Route exact path="/dashboards/products" component={Product} />
        <Route exact path="/dashboards/receipts" component={Receipt} />
      </Switch>
    </Router>
  );
};

export default DashBoard;
