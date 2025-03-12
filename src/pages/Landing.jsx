import React,{useState,useEffect} from "react";
import ProjectCard from "../components/ProjectCard";
import { Link } from "react-router-dom";
import { sampleProjectsApi } from "../services/allApi";

function Landing() {
  const [loginStatus,setLoginStatus]=useState(false)
  const [sample,setSample]=useState([])

  useEffect(()=>{
    getData()
    if(sessionStorage.getItem('token')){
      setLoginStatus(true)
    }
    else{
      setLoginStatus(false)
    }
  },[])

  const getData=async()=>{
    const result=await sampleProjectsApi()
    console.log(result)
    if(result.status==200){
      setSample(result.data)
    }
  }
  return (
    <>
      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{ height: "75vh", backgroundColor: "#faef57" }}
      >
        <div className="row">
          <div className="col-sm-12 col-lg-6 d-flex flex-column justify-content-center">
            <h1><b>ProjectFair 2k25</b></h1>
            <p style={{textAlign:'justify'}}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. A rerum
              incidunt esse quisquam accusantium beatae facilis excepturi, iure
              rem hic odit minus explicabo nulla temporibus quasi mollitia vel
              eum amet!
            </p>
            <div className="mt-4 d-grid">
              {
                loginStatus ?
                <Link to={'./dash'} className="btn btn-info">Go to Dashboard...</Link>
                :
                <Link to={'./auth'} className="btn btn-info">Start to Explore...</Link>
              }
            </div>
          </div>
          <div className="col-sm-12 col-lg-6">
            <img src="https://cdni.iconscout.com/illustration/premium/thumb/web-development-illustration-download-in-svg-png-gif-file-formats--html-logo-design-ux-illustrations-3181531.png" alt="landing-image" className="img-fluid" />
          </div>
        </div>
      </div>
      <div className="container-fluid p-3 my-4 mb-5">
        <h2 className="text-center">Sample Projects</h2>
        {
          sample.length>0 ?
          <div className="container-fluid">
            <div className="d-flex justify-content-evenly mt-5 flex-wrap gap-3">
            {
              sample.map(item=>(
                <ProjectCard pro={item}/>
              ))
            }
            </div>
            <div className="container-fluid d-flex justify-content-center mt-4">
              <Link to={'/projects'} className=" text-danger text-decoration-none">More Projects <i class="fa-solid fa-angle-right"></i></Link>
            </div>
          </div>
          :
          <h4 className="text-danger text-center mt-4">No Projects Available !!</h4>
        }
        
      </div>
    </>
  );
}

export default Landing;
