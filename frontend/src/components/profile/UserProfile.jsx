import React, { useEffect, useState } from 'react'
import { getLocal } from '../../helpers/auth'
import { useActionData, useNavigate } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import { baseUrl } from '../../api/api'


function UserProfile() {

    const history = useNavigate()
    const [user, setUser] = useState('')
    const [profile_img, setImage] = useState()
    const token = getLocal();
    const decoded = jwtDecode(token)

    async function getUser() {
        const user = await axios.get(`${baseUrl}user-detail/${decoded.user_id}/`)
        setUser(user.data)
    }

    const UserUpdate = async (e) => {
        e.preventDefault();
      
        const username = e.target.elements.username.value;
        const email = e.target.elements.email.value;
      
        const url = `${baseUrl}user-detail/${decoded.user_id}/`;
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            // Include any additional headers if required (e.g., authentication)
          },
          body: JSON.stringify({
            username: username,
            email: email,
          }),
        });
      
        if (response.ok) {
          // Successful update
          const data = await response.json();
          console.log('Updated user:', data);
      
          const closeButton = document.querySelector('.btn-secondary[data-bs-dismiss="modal"]');
          closeButton.click();
        } else {
          const errorData = await response.json();
          alert('Error updating user:', errorData);
        }
      };

    useEffect(() => {
        if (!token) {
            history('/')
        }
        getUser()
    }, [])

    return (
        <div>
            <Navbar heading={'Profile'} homeIcon={true} />
            <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-lg-6 mb-4 mb-lg-0">
                            <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
                                <div className="row g-0">
                                    <div className="col-md-4 gradient-custom text-center text-white"
                                        style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                                        <img src={user.profile_img ? user.profile_img : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"}
                                            alt="Avatar" className="img-fluid my-5" style={{ width: 80 }} />
                                        <h5>{user?.username}</h5>
                                        <i data-bs-toggle="modal" data-bs-target="#updateModal" style={{ cursor: 'pointer' }} className="far fa-edit mb-5"></i>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body p-4">
                                            <h6>Information</h6>
                                            <hr className="mt-0 mb-4" />
                                            <div className="row pt-1">
                                                <div className="col-6 mb-3">
                                                    <h6>Email</h6>
                                                    <p className="text-muted">{user?.email}</p>
                                                </div>
                                                <div className="col-6 mb-3">
                                                    <h6>Phone</h6>
                                                    <p className="text-muted">123 456 789</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="modal fade" id="updateModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update Profile</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={UserUpdate} >
                            <div className="modal-body">
                                <div style={{height:'100px'}} className="mb-3 d-flex justify-content-center">
                                    <div style={{width:'100px'}} className='h-100'>
                                        {
                                        profile_img?
                                            <img className='w-100' src={URL.createObjectURL(profile_img)} ></img>
                                        :
                                            <img className='w-100' src={user.profile_img ? user.profile_img : ""} ></img>
                                        }
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="profile-img" className="col-form-label">Profile image</label>
                                    <input type="file" className="form-control" id="profile-img" 
                                        onChange={(e)=>{ 
                                        if(e.target.value[0] != null)
                                        setImage(e.target.files[0])}} 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="username" className="col-form-label">Username:</label>
                                    <input name='username' type="text" className="form-control" id="username" defaultValue={user?.username} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="col-form-label">Email:</label>
                                    <input name='email' className="form-control" id="email" defaultValue={user?.email} />
                                </div>
                            </div>
                            {/* <div className="accordion accordion-flush" id="accordionFlushExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                            Change Password
                                        </button>
                                    </h2>
                                    <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                        <div className="accordion-body">
                                            <div className="mb-3">
                                                <label htmlFor="password" className="col-form-label">Password</label>
                                                <input type="password" className="form-control" id="password"  />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="confirmPassword" className="col-form-label">Confirm Password:</label>
                                                <input className="form-control" type='password' id="confirmPassword" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary" >Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile
