// App.jsx
    import React from 'react';
    import { Routes, Route } from 'react-router-dom';
    import Nav from './components/Nav';
    import Home from './components/Home';
    import Form from './components/Form';
    import Complete from './components/Complete';
    import Expire from './components/Expire';
    import Control from './components/Control';
    import Admin from './components/Admin';
    import Dashboard from './components/Dashboard';
    import Confirm from './components/Confirm';

    function App() {
      return (
        <Routes>
          <Route path="/nav" element={<Nav />} />
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<Form />} />
          <Route path="/Complete" element={<Complete />} />
          <Route path="/Expire" element={<Expire />} />
          <Route path="/Control" element={<Control />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Confirm" element={<Confirm />} />
        </Routes>
      );
    }

    export default App;