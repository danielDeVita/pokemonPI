import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import { Routes, Route } from 'react-router-dom';
import NotFound from './components/NotFound/NotFound';
import Homepage from './components/Homepage/Homepage';
import Detail from "./components/Detail/Detail";
import Form from './components/Form/Form';

function App() {

  return (

    <Routes>

      <Route
        path="/"
        element={<LandingPage />}
      />

      <Route
        path="/home"
        element={<Homepage />}
      />

      <Route
        path="/detail/:id"
        element={<Detail />}
      />

      <Route
        path="/form"
        element={<Form />}
      />

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>

  );
}

export default App;
