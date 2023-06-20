import axios from 'axios'
import './admin.css'

import React, { useEffect, useState } from 'react'
import { baseUrl } from '../../api/api'
import { useNavigate } from 'react-router-dom'
import { getLocal } from '../../helpers/auth'

function Admin() {

  const [users,setUsers] = useState([])
  const history = useNavigate()
  const token = getLocal()

  async function getUserList(){
    const request = await axios.get(`${baseUrl}user-list/`)
    setUsers(request.data)
  }

  useEffect(()=>{
    if (!token){
      history('/')
    }
    getUserList()
  },[])

  const deleteUser = (id) =>{
    const user = axios.delete(`${baseUrl}user-detail/${id}/`).then(
    async function getUserList(){
      const request = await axios.get(`${baseUrl}user-list/`)
      setUsers(request.data)
    }
  )
  }

  const logout = ()=>{
    localStorage.removeItem('authToken')
    history('/login')
  }

  const searchUser =  async (keyword) =>{
    if (!keyword == ''){
    const request = await axios.get(`${baseUrl}user-list/?search=${keyword}`)
    setUsers(request.data)
  }else{
    getUserList()
  }
  } 

  return (
    <div className='d-flex ' >
      <div className='vh-100 bg-dark px-3 pt-3' style={{width:'19%'}} >
      <button className='btn btn-outline-success'> <i className='fa fa-home' ></i> Home page</button>
      <button onClick={logout} style={{position:'fixed',bottom:20,left:30}} className='btn btn-danger mx-auto'> <i className='fa fa-exit' ></i> Logout </button>
      </div>
      <div className='m-4 w-75'>
      <div className='tabelHead d-flex justify-content-between align-items-center' >
        <h2>Users</h2>
        <input type="text" onChange={(e)=>searchUser(e.target.value)} className="form-control w-25 my-3" placeholder='Search here' />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">User Id</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">

          {
            users.length>0 ?
            users.map((user,idx)=>{
              return(
                <tr key={idx}>
                <th scope="row">{user.id}</th>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td><button className='btn btn-sm btn-warning' ><i className='fa fa-edit' ></i></button></td>
                <td><button onClick={()=>deleteUser(user.id)} className='btn btn-sm btn-danger'style={{color:'white!important'}} ><i className='fa fa-trash' ></i></button></td>
              </tr>
              )
            })
            : <tr><td colSpan={3} ><h2>Users doesn't found</h2></td></tr>
          }
          
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default Admin;
