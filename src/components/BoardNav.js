import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';

export class BoardNav extends React.Component{
    render(){

        return (
        
        <Nav variant="pills" defaultActiveKey={this.props.mode} onSelect={this.props.onModeChange}>
        <Nav.Item>
            <Nav.Link eventKey={1}  >
            Attack
            </Nav.Link>
        </Nav.Item>                
        <Nav.Item>
            <Nav.Link eventKey={0}>Deploy <Badge variant="light">{this.props.player.units}</Badge></Nav.Link>
        </Nav.Item> 
        </Nav>
        
        )
   }
}