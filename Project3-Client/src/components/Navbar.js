import { useContext } from "react";
import { AuthContext } from "./../context/auth.context";
import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap'

function Navbar1() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">
        <img src="https://res.cloudinary.com/dfagcghmy/image/upload/v1647452409/mfulbeosa5ziokbpdxma.png" alt="logo" style={{width:"50px", height:"50px"}}/>
        <span style={{color:"white"}}>Merci</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          { isLoggedIn &&(
          <>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/favours">Favours</Nav.Link>
            <Nav.Link href={`/favours/myList/${user?._id}`}>My Favours</Nav.Link>
            <Nav.Link href={`/chats/${user?._id}`}>Chat</Nav.Link>
            <NavDropdown title="Profile" id="basic-nav-dropdown">
              <NavDropdown.Item href={`/profile/${user?._id}`}>My Profile</NavDropdown.Item>
              <NavDropdown.Item href={`/profile/edit/${user?._id}`}>Edit Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logOutUser} href="/login">Log out</NavDropdown.Item>
            </NavDropdown>
            </>
          )
          }
          { !isLoggedIn &&(
          <>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/signup">Sing Up</Nav.Link>
          </>
          )
          }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbar1;
