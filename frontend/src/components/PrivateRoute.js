
import React from 'react'
import { getLocal } from '../helpers/auth'
import Home from '../components/home/home'
import Login from './login/Login'
import Admin from '../components/admin/admin'
import jwt_decode from 'jwt-decode'

export function PrivateRoute() {

  let response = getLocal()

  if (response){
    const decoded = jwt_decode(response)

    if (decoded.is_superuser){
        return <Admin/>
    }
    else{
      console.log("pottanaayirunnu njaan");
        return <Home/>
    }

  }
  else{
      return <Login/>
  }
}


