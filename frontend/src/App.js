import { Route, Routes } from 'react-router-dom';
import './App.css';
import home from './components/home/home'
import login from './components/login/Login'
import Register from './components/register/Register'
import admin from './components/admin/admin'
import {PrivateRoute} from './components/PrivateRoute';
import UserProfile from './components/profile/UserProfile';



function App() {

  return (
    <div>
      <Routes>
        <Route Component={home} path='/' />
        <Route Component={PrivateRoute} path='/auth' />
        <Route Component={login} path='/login' />
        <Route Component={Register} path='/register' />
        <Route Component={admin} path='/admin' />
        <Route Component={UserProfile} path='/profile' />
      </Routes>
    </div>
  )
}

export default App;
