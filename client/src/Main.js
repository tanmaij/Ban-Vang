import Header from "./Component/Header/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Pages/Home";
import Footer from "./Component/Footer/Footer";
import Cart from "./Pages/Cart";
import Detail from "./Pages/Detail";
import Order from "./Pages/Order";
import AuthContext from "./context/AuthContext";
import { useContext, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { NotFound } from "./Component/NotFound/NotFound";
const Main = () => {
  const authContext = useContext(AuthContext);
  const history = useHistory();
  useEffect(() => {
    if (authContext.accountData != null)
      if (authContext.accountData.IsAdmin == 1)
        history.push("/dashboards/accounts");
  }, [authContext]);
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/carts" component={Cart} />
        <Route exact path="/details/:id" component={Detail} />
        <Route exact path="/orders" component={Order} />
        <Route exact path="/*" component={NotFound} />
      </Switch>
      <Footer />
    </>
  );
};

export default Main;
