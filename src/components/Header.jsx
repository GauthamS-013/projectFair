import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { authContext } from '../context/ContextApi';

function Header() {
  const nav=useNavigate()
  const {setAuth}=useContext(authContext)

  const logout=()=>{
    sessionStorage.clear()
    toast.info("Thank you and Bye..")
    nav('/')
    setAuth(false)
  }
  return (
    <>
        <Navbar className="bg-info">
        <Container>
          <Link to={"/"} style={{textDecoration:'none'}}><Navbar.Brand>
          <i className="fa-solid fa-diagram-project fa-lg me-3" style={{color:'#faef57'}}></i>
            {' '}
            <b>ProjectFair</b>
          </Navbar.Brand></Link>
          <button className="btn btn-danger" onClick={logout}>
            Logout
            <i className="fa-solid fa-right-from-bracket ms-2"></i>
          </button>
        </Container>
      </Navbar>
    </>
  )
}

export default Header