import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import DashBoard from "./DashBoard";
import Main from "./Main";
import Auth from "./Pages/Auth";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/dashboards/*" component={DashBoard} />
        <Route
          exact
          path="/auth/register"
          render={(props) => <Auth {...props} authRouter="register" />}
        />
        <Route
          exact
          path="/auth/login"
          render={(props) => <Auth {...props} authRouter="login" />}
        />
        <Route exact path="/*" component={Main} />
      </Switch>
    </Router>
  );
}

export default App;
