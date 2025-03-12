import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div className="container-fluid bg-info p-3">
        <Row>
          <Col lg={6}>
            <h3 style={{color:'#faef57'}}>ProjectFair 2k25</h3>
            <p style={{ textAlign: "justify" }}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid
              vitae minima itaque aliquam illo ex magnam similique culpa
              dolorum, unde dolores officiis? Explicabo amet laborum recusandae
              sint accusantium? Cum, nemo. Lorem ipsum, dolor sit amet
              consectetur adipisicing elit. Vel incidunt excepturi ducimus
              tenetur aperiam et similique rerum quisquam! Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Magnam sit blanditiis minus
              fugiat minima atque, nam ipsa distinctio reiciendis,
              necessitatibus molestias repudiandae provident non nulla veritatis
              
            </p>
          </Col>
          <Col lg={2} className="d-flex flex-column align-items-md-center align-items-start gap-3 mb-3 mb-md-0">
            <h3 style={{color:'#faef57'}}>Links</h3>
            <Link to={"/"} className="text-light text-decoration-none">
              Landing
            </Link>
            <Link to={"/auth"} className="text-light text-decoration-none">
              Sign In
            </Link>
          </Col>
          <Col lg={4}>
            <h3 style={{color:'#faef57'}}  >Feedback</h3>
            <textarea
              name=""
              id=""
              className="form-control my-3"
              placeholder="Enter your message"
            ></textarea>
            <button className="btn btn-dark">Send</button>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Footer;
