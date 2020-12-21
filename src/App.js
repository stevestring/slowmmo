import './App.css';
import { Game } from './components/Game';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function App() {
  return (
    <div className="App">      
      <Navbar bg="dark" variant="dark">
      
      <Navbar.Brand href="#home">Slow MMO</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link>
         
        </Nav>
      </Navbar.Collapse>
    </Navbar>
<br/>
    <Container>
      <Game/>
      </Container>
    </div>
  );
}

export default App;
