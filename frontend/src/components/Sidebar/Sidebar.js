import React, {Component} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import MenuSharpIcon from '@material-ui/icons/MenuSharp';
import {SidebarData} from './SidebarData'
import SidebarItemMenu from './SidebarItemMenu'

const Side = styled.div`
    background: #15171c;
    height: 5vh;
    display:flex;
    justify-content: flex-start;
    align-items: center;
`;

const NavIcon = styled(Link)`
    margin-left:2rem;
    font-size:2rem;
    height: 80px;
    display:flex;
    justify-content: flex-start;
    align-items: center;   
`;



const SidebarNav = styled.nav`
    background: #15171c;
    width: 200px;
    height:95vh;
    display:flex;
    justify-content: center;
    position: fixed;
    top: 5vh;
    left: ${props => props.hide ? '0' : '-15%'};
    transition: left 0.2s ease-in;
`;

const SidebarWrap = styled.div`
    width:100%;
`;


class Sidebar extends Component {

    constructor(props){
        super(props);
        this.state = {
            hide:false
        }
    }

    showSidebar = () => {
        
        this.setState({hide: !this.state.hide})
    }

    render() {
        return(
            <React.Fragment>
            <Side>
                <NavIcon>
                    <MenuSharpIcon color='primary'/>
                </NavIcon>   
            </Side>
                <SidebarNav hide={this.state.hide}>
                    <SidebarWrap>
                        
                        {SidebarData.map((item,index) => {
                            return <SidebarItemMenu item={item} key={index} />;
                        })}
                    </SidebarWrap>
                </SidebarNav> 
            </React.Fragment>
        );
    }
}

export default Sidebar