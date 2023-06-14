import { Route, Routes } from 'react-router-dom';
import './App.css';
import home from './components/home/home'
import login from './components/login/login'
import register from './components/register/register'
import admin from './components/admin/admin'
 
function App() {

  return (
    <Routes>
      <Route Component={home} path='/' />
      <Route Component={login} path='/login' />
      <Route Component={register} path='/register' />
      <Route Component={admin} path='/admin' />
    </Routes>
  )
}

export default App;
