import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';


import Form from 'react-bootstrap/Form';



const NavBar = () =>{
  

  
  return (
    
    <Navbar bg="light" expand="lg">
  <Navbar.Brand href="#home">Wasabi event login</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
      <Nav.Link href="#Membership">Become a member</Nav.Link>
      <Nav.Link href="#events">Upcoming Events</Nav.Link>
      <Nav.Link href="/QRCode">QR code</Nav.Link>
    </Nav>
    <Form inline>
      
      
      {/* <SignOut /> */}
    </Form>
  </Navbar.Collapse>
</Navbar>
  );
}



export default NavBar;