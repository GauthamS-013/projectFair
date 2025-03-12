import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import base_url from "../services/base_url";

function ProjectCard({pro}) {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Card style={{ width: "22rem" }} className="mb-3">
        <Card.Img variant="top" onClick={handleShow} height={'230px'} src={`${base_url}/uploaded/${pro.image}`} />
        <Card.Body>
          <Card.Title>{pro.title}</Card.Title>
        </Card.Body>
      </Card>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col d-flex align-items-center justify-content-center">
                <img src={`${base_url}/uploaded/${pro.image}`} alt="" className="w-100" />
            </div>
            <div className="col">
                <h4>{pro.title}</h4>
                <p>Description : {pro.description}</p>
                <p>Languages : {pro.languages}</p>
                <div className="d-flex gap-3">
                    <a href={pro.github} target="blank" className="btn"><i class="fa-brands fa-github fa-lg"></i></a>
                    <a href={pro.demo} target="blank" className="btn"><i class="fa-solid fa-link fa-lg"></i></a>
                </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProjectCard;
