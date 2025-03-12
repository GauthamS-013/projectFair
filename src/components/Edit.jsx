import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Row, Col } from "react-bootstrap";
import base_url from "../services/base_url";
import { updateProjectApi } from "../services/allApi";
import { toast } from "react-toastify";
import { editResponseContext } from "../context/ContextApi";

function Edit({ project }) {
  const [show, setShow] = useState(false);
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    languages: "",
    github: "",
    demo: "",
    image: "",
  });
  const [preview, setPreview] = useState("");
  const {setEditResponse}=useContext(editResponseContext)

  useEffect(() => {
    setProjectData({ ...project });
  }, []);

  useEffect(() => {
    if (projectData.image.type) {
      setPreview(URL.createObjectURL(projectData.image));
    } else {
      setPreview("");
    }
  }, [projectData.image]);

  const handleEdit = async () => {
    console.log(projectData);
    const { title, description, languages, github, demo, image } = projectData;
    if (!title || !description || !languages || !github || !demo || !image) {
      toast.warning("Enter valid input !!");
    } else if (
      image.type &&
      image.type != "image/jpg" &&
      image.type != "image/png" &&
      image.type != "image/jpeg"
    ) {
      toast.warning(
        "Invalid image format... Image should be either jpg, jpeg or png !!"
      );
    } else {
      const result = await updateProjectApi(project._id, projectData);
      console.log(result);
      if (result.status == 200) {
        toast.success("Project updated !!");
        handleClose();
        setEditResponse(result)
      } else {
        toast.error("Something went wrong !!");
      }
    }
  };
  const handleClose = () => {
    setShow(false);
    setPreview("");
    
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="btn" onClick={handleShow}>
        <i class="fa-solid fa-pen-to-square fa-lg text-warning"></i>
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Project</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#faef57" }}>
          <Row>
            <Col className="d-flex align-items-center">
              <label htmlFor="f1">
                <input
                  type="file"
                  name=""
                  id="f1"
                  style={{ display: "none" }}
                  onChange={(e) =>
                    setProjectData({ ...projectData, image: e.target.files[0] })
                  }
                />
                <img
                  src={
                    preview
                      ? preview
                      : `${base_url}/uploaded/${projectData.image}`
                  }
                  alt=""
                  className="img-fluid"
                />
              </label>
            </Col>
            <Col>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Title"
                defaultValue={projectData.title}
                onChange={(e) =>
                  setProjectData({ ...projectData, title: e.target.value })
                }
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Description"
                defaultValue={projectData.description}
                onChange={(e) =>
                  setProjectData({
                    ...projectData,
                    description: e.target.value,
                  })
                }
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Languages"
                defaultValue={projectData.languages}
                onChange={(e) =>
                  setProjectData({ ...projectData, languages: e.target.value })
                }
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="GitHub Link"
                defaultValue={projectData.github}
                onChange={(e) =>
                  setProjectData({ ...projectData, github: e.target.value })
                }
              />
              <input
                type="text"
                className="form-control"
                placeholder="Demo Link"
                defaultValue={projectData.demo}
                onChange={(e) =>
                  setProjectData({ ...projectData, demo: e.target.value })
                }
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#faef57" }}>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleEdit}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Edit;
