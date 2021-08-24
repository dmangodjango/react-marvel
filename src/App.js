import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavigationBar from './components/core/navigation/Navigation';
import Footer from './components/core/footer/Footer';
import Characters from './components/pages/characters/Characters';
import Creators from './components/pages/creators/Creators';


function App() {
  return (
    <>
      <Router>
          <NavigationBar/>
        <main className="container main">
        <Switch>
          <Route path="/characters">
            <Characters/>
          </Route>
          <Route path="/creators">
              <Creators/>
          </Route>
        </Switch>
        </main>
      </Router>
      <Footer/>
    </>
  );
}

export default App;
