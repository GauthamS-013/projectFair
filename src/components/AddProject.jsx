import React, { useContext } from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Row, Col } from "react-bootstrap";
import uploadimage from "../assets/imageUpload.png";
import { addProjectApi } from "../services/allApi";
import { toast } from "react-toastify";
import { addResponseContext } from "../context/ContextApi";

function AddProject() {
  const [show, setShow] = useState(false);
  const [project, setProject] = useState({
    title: "",
    description: "",
    languages: "",
    git: "",
    demo: "",
    image: "",
  });
  const [preview, setPreview] = useState("");
  const {addresponse,setAddresponse}=useContext(addResponseContext)

  useEffect(() => {
    if (project.image) {
      setPreview(URL.createObjectURL(project.image));
    } else {
      setPreview("");
    }
  }, [project.image]);

  const handleSubmit = async () => {
    console.log(project);
    const { title, description, languages, git, demo, image } = project;
    if (!title || !description || !languages || !git || !demo || !image) {
      toast.warning("Enter valid input !!");
    }
    else if(image.type!='image/jpg' && image.type!='image/png' && image.type!='image/jpeg'){
      toast.warning("Invalid image format... Image should be either jpg, jpeg or png !!")
    }
    else {
      const result = await addProjectApi(project);
      console.log(result);
      if (result.status == 200) {
        toast.success("Project Added !!");
        handleClose();
        setAddresponse(result)
      } else {
        toast.error("Something went wrong... Project adding failed !!");
      }
    }
  };

  const handleClose = () => {
    setShow(false);
    setProject({
      title: "",
      description: "",
      languages: "",
      git: "",
      demo: "",
      image: "",
    });
    setPreview("");
  };
  const handleShow = () => setShow(true);
  return (
    <>
      <button className="btn btn-info" onClick={handleShow}>
        Add Project<i class="fa-solid fa-plus ms-2"></i>
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>New Project</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#faef57" }}>
          <Row>
            <Col className="d-flex align-items-center">
              <label htmlFor="f1">
                <input
                  type="file"
                  onChange={(e) =>
                    setProject({ ...project, image: e.target.files[0] })
                  }
                  name=""
                  id="f1"
                  style={{ display: "none" }}
                />
                <img
                  src={preview ? preview : uploadimage}
                  alt="Project Image"
                  className="img-fluid"
                />
              </label>
            </Col>
            <Col>
              <input
                type="text"
                onChange={(e) =>
                  setProject({ ...project, title: e.target.value })
                }
                className="form-control mb-2"
                placeholder="Title"
              />
              <input
                type="text"
                onChange={(e) =>
                  setProject({ ...project, description: e.target.value })
                }
                className="form-control mb-2"
                placeholder="Description"
              />
              <input
                type="text"
                onChange={(e) =>
                  setProject({ ...project, languages: e.target.value })
                }
                className="form-control mb-2"
                placeholder="Languages"
              />
              <input
                type="text"
                onChange={(e) =>
                  setProject({ ...project, git: e.target.value })
                }
                className="form-control mb-2"
                placeholder="GitHub Link"
              />
              <input
                type="text"
                onChange={(e) =>
                  setProject({ ...project, demo: e.target.value })
                }
                className="form-control"
                placeholder="Demo Link"
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#faef57" }}>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleSubmit}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddProject;
