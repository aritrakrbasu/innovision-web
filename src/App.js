import Nf from './Nf'
import { useEffect, useState } from 'react';
import Home from './Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Explode from './Explode';
import './styles/app.css'
import Registration from './Registration';
import Login from './Login';
import { AuthProvider } from './context/AuthProvider';
import PrivateRoute from './components/PrivateRoute' 
import Dashboard from './dashboard';
import Vote from './Vote';
import About from './About';
import Teams from './Teams';
import LandingPage from './LandingPage';
import Bannerjee from './Bannerjee';
import Mysubmission from './Mysubmission';
function App() {
  return (
    <>
    <Router>
    <AuthProvider>
      <Switch>
        <Route exact path="/register" component={Registration} />
        <Route exact path="/banerjee" component={Bannerjee} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <Route exact path="/events/:id" component={LandingPage} />
        <PrivateRoute exact path="/vote" component={Vote} />
        <PrivateRoute exact path="/mysubmission" component={Mysubmission} />
        <Route exact path="/about" component={About} />
        <Route exact path="/team" component={Teams} />
        <Route path="/" component={Explode} />
        {/* <Route path="*" component={Nf} /> */}
      </Switch>
      </AuthProvider>
    </Router>
   </>
  );
}

export default App;
