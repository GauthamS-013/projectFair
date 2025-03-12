import React,{useState,useEffect} from 'react'
import ProjectCard from '../components/ProjectCard'
import Header from '../components/Header'
import { allProjectsApi } from '../services/allApi'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Projects() {
  const [projects,setProjects]=useState([])
  const [search,setSearch]=useState("")
  const nav=useNavigate()
  useEffect(()=>{
    getData()
  },[search])


  const getData=async()=>{
    if(sessionStorage.getItem('token')){
      const result=await allProjectsApi(search)
      console.log(result)
      if(result.status==200){
        setProjects(result.data)
      }
    }
    else{
      nav('/auth')
    }
  }
  return (
    <>
    <Header/>
      <div className="container-fluid p-3" style={{minHeight:'80vh'}}>
        <div className="d-flex justify-content-between my-4">
          <h1>All Projects</h1>
          <input type="search" placeholder='Search with language' onChange={(e)=>setSearch(e.target.value)} className='form-control w-25 text-dark' style={{backgroundColor:'#faef57'}} />
        </div>

        <div className="my-3">
          {
            projects.length>0 ?
            <div className="container-fluid d-flex justify-content-evenly flex-wrap">
              {
                projects.map(item=>(
                  <ProjectCard pro={item} />
                ))
              }
            </div>
            :
            <h3 className='text-center text-danger mt-4'>No Projects Available !!</h3>
          }
        </div>
      </div>
    </>
  )
}

export default Projects