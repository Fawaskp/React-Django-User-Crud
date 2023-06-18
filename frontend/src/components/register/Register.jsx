import './register.css'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Register() {

  const history = useNavigate()

  return (
          <section className="vh-100 bg-image">
          <div className="mask d-flex align-items-center h-100">
            <div className="container h-75">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-9 col-lg-7 col-xl-6 d-flex justify-content-center">
                  <div className="card" style={{borderRadius: "15px",width:"80%"}}>
                    <div className="card-body p-5">
                      <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                      <form>

                        <div className="form-outline mb-2">
                          <input type="text" id="form3Example1cg" className="form-control form-control-lg" />
                          <label className="form-label" for="form3Example1cg">Your Name</label>
                        </div>

                        <div className="form-outline mb-2">
                          <input type="email" id="form3Example3cg" className="form-control form-control-lg" />
                          <label className="form-label" for="form3Example3cg">Your Email</label>
                        </div>

                        <div className="form-outline mb-2">
                          <input type="password" id="form3Example4cg" className="form-control form-control-lg" />
                          <label className="form-label" for="form3Example4cg">Password</label>
                        </div>

                        <div className="form-outline mb-2">
                          <input type="password" id="form3Example4cdg" className="form-control form-control-lg" />
                          <label className="form-label" for="form3Example4cdg">Repeat your password</label>
                        </div>


                        <div className="d-flex justify-content-center">
                          <button type="button"
                            className="btn btn-success btn-block btn-lg text-body">Register</button>
                        </div>

                        <p className="text-center text-muted mt-4 mb-0">Have already an account? <a href="#!"
                            className="fw-bold text-body"><u onClick={()=>history('/login')} >Login here</u></a></p>

                      </form>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </section>
  )
}

export default Register
