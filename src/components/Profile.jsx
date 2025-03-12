import React, { useState,useEffect } from "react";
import base_url from "../services/base_url";
import { toast } from "react-toastify";
import { updateProfileApi } from "../services/allApi";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../context/ContextApi";

function Profile() {
  const [open, setOpen] = useState(false);
  const [profileData,setProfileData]=useState({
    username:"",github:"",linkedin:"",profile:""
  })
  const [preview,setPreview]=useState("")
  const nav=useNavigate()
  const {setAuth}=useContext(authContext)

  useEffect(()=>{
    if(sessionStorage.getItem('token')){
      setProfileData({username:sessionStorage.getItem('user'),github:sessionStorage.getItem('github'),linkdin:sessionStorage.getItem('linkdin'),profile:sessionStorage.getItem('profile')})
    }
  },[])

  useEffect(()=>{
    if(profileData.profile.type){
      setPreview(URL.createObjectURL(profileData.profile))
    }
    else{
      setPreview("")
    }
  },[profileData.profile])

  const handleUpdate=async()=>{
    console.log(profileData)
    const {username,github,linkdin,profile}=profileData
    if(!username || !github || !linkdin || !profile){
      toast.warning("Enter valid inputs !!")
    }
    else if(profile.type && profile.type!="image/png" && profile.type!="image/jpg" && profile.type!="image/jpeg"){
      toast.warning("Invalid image format.. Image shoud be either png, jpg or jpeg")
    }
    else{
      const result=await updateProfileApi(profileData)
      if(result.status==200){
        toast.success("Profile Updated Successfully !!")
        sessionStorage.clear()
        nav('/auth')
        setAuth(false)
      }
      else{
        toast.error("Something went wrong !! Updation failed !!")
      }
    }
  }

  const changeOpen = () => {
    setOpen(!open);
  };
  return (
    <>
      <div className="border border-shadow p-3">
        <div className="d-flex justify-content-between" onClick={changeOpen} style={{cursor:'pointer'}}>
          <h1>Update Profile</h1>
          <button className="btn">
            {open ? (
              <i class="fa-solid fa-angle-up fa-lg"></i>
            ) : (
              <i class="fa-solid fa-angle-down fa-lg"></i>
            )}
          </button>
        </div>
        {open && (
          <div>
            <div className="d-flex justify-content-center">
              <label htmlFor="pro">
                <input
                  type="file"
                  onChange={(e)=>setProfileData({...profileData,profile:e.target.files[0]})}
                  name=""
                  id="pro"
                  style={{ display: "none" }}
                />
                <img
                  src={preview ? preview : profileData.profile ? `${base_url}/uploaded/${profileData.profile}` : "https://static.vecteezy.com/system/resources/thumbnails/005/544/708/small_2x/profile-icon-design-free-vector.jpg"}
                  alt="profile pic"
                  className="img-fluid"
                />
              </label>
            </div>
            <div className="mt-3">
              <input
                type="text"
                className="form-control mb-3"
                onChange={(e)=>setProfileData({...profileData,username:e.target.value})}
                placeholder="Username"
                defaultValue={profileData.username}
              />
              <input
                type="text"
                className="form-control mb-3"
                onChange={(e)=>setProfileData({...profileData,github:e.target.value})}
                placeholder="GitHub URL"
                defaultValue={profileData.github}
              />
              <input
                type="text"
                className="form-control mb-3"
                onChange={(e)=>setProfileData({...profileData,linkdin:e.target.value})}
                placeholder="LinkedIn URL"
                defaultValue={profileData.linkdin}
              />
              <div className="d-flex justify-content-between">
                <button className="btn btn-success" onClick={handleUpdate}>Update</button>
                <button className="btn btn-danger" onClick={changeOpen}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Profile;
