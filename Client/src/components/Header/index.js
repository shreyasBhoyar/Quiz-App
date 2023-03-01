import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import "./header.css"

function Header() {
  return (
    <>
      <Navbar bg="dark" variant="dark" className='navBar' >
        <Container>
          <Navbar.Brand className='Navbar-text ' href="/">Quiz Application</Navbar.Brand>
        </Container>
      </Navbar> 
    </>
  );
}

export default Header;