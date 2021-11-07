import Header from "./Component/Header/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Pages/Home";
import Footer from "./Component/Footer/Footer";
import Cart from "./Pages/Cart";
import Detail from "./Pages/Detail";
import Order from "./Pages/Order";
function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/carts" component={Cart} />
        <Route exact path="/details" component={Detail} />
        <Route exact path="/orders" component={Order} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
