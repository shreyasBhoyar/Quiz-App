import "./createUser.css"
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, ModalBody } from 'react-bootstrap'


const UserModal = (props)=> {

  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    props.setName(event.target.username.value)
    handleClose();
  }

  return (
    <div>
      <Modal show={show} onHide={handleClose} className="userModal">

        <Modal.Header closeButton>
          <Modal.Title> <h3>User Details</h3> </Modal.Title>
        </Modal.Header>
        <ModalBody>
          <Form className='form' onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Username</InputGroup.Text>

              <Form.Control
                aria-label="Enter your User Name"
                aria-describedby="basic-addon1"
                id="username"
              />
            </InputGroup>
            <Button variant="primary" type="submit" className='createUserbtn' style={{ margin: "1rem" }}>
              Save
            </Button>
          </Form>
        </ModalBody>

      </Modal>

    </div>
  );
}

export default UserModal;