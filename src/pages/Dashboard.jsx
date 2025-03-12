import React, { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import { Row, Col } from "react-bootstrap";
import AddProject from "../components/AddProject";
import Edit from "../components/Edit";
import Profile from "../components/Profile";
import { deleteUserProjectApi, getUserProjectApi } from "../services/allApi";
import { addResponseContext } from "../context/ContextApi";
import { toast } from "react-toastify";
import { editResponseContext } from "../context/ContextApi";

function Dashboard() {
  const [username, setUsername] = useState("");
  const [projects, setProjects] = useState([]);
  const {addresponse,setAddresponse}=useContext(addResponseContext)
  const {editResponse}=useContext(editResponseContext)

  useEffect(() => {
    getData();
    if (sessionStorage.getItem("user")) {
      setUsername(sessionStorage.getItem("user"));
    } else {
      setUsername("");
    }
  }, [addresponse,editResponse]);

  const getData = async () => {
    const result = await getUserProjectApi();
    console.log(result);
    if (result.status == 200) {
      setProjects(result.data);
    }
  };

  const deleteProject=async(id)=>{
    const result=await deleteUserProjectApi(id)
    if(result.status==200){
      getData()
    }
    else{
      toast.error("Something went wrong !!")
      console.log(result)
    }
  }

  return (
    <>
      <Header />
      <div className="container-fluid p-3" style={{ minHeight: "80vh" }}>
        <div className="d-flex justify-content-end my-3">
          <h2>
            Welcome, <span className="text-info fw-bolder">{username}</span>
          </h2>
        </div>
        <Row>
          <Col lg={8}>
            <h1>Project List</h1>
            <AddProject />
            {projects.length > 0 ? 
              <div className="mt-3 p-3 border border-2 border-dark shadow">
                {projects.map(item => (
                  <div className="border border-2 p-2 d-flex justify-content-between my-2">
                    <h3>{item.title}</h3>
                    <div className="d-flex justify-content-around">
                      <a href={item.github} target="blank"  className="btn">
                        <i class="fa-brands fa-github fa-lg"></i>
                      </a>
                      <Edit project={item}/>
                      <button className="btn" onClick={()=>{deleteProject(item._id)}}>
                        <i class="fa-solid fa-trash fa-lg text-danger"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
             : 
              <h3 className="text-danger text-center">No Projects Listed</h3>
            }
          </Col>
          <Col lg={4} className="mt-4 mt-md-0">
            <Profile />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
