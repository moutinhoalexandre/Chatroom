import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import IndexPage from "./pages/IndexPage";


function App() {
  return <Router>
    <Switch>
      <Route path="/" component={IndexPage} exact />
      <Route path="/login" component={LoginPage} exact/>
      <Route path="/register" component={RegisterPage} exact />
      <Route path="/dashboard" component={DashboardPage} exact />

    </Switch>
  </Router>;
}

export default App;
