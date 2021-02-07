import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';


const SidebarItem = styled(Link)`
    display: flex;
    color: #e1e9fc;
    align-items: center;
    padding: 20px;
    list-style:none;
    height:60px;
    text-decoration: none;
    &:hover {
        background: #252831;
        cursor:pointer;
    }
`;

const DropdownItem = styled(Link)`
    background: #414757;
    height: 60px;
    display: flex;
    align-items: center;
    color: #f5f5f5;
    justify-content: space-evenly;
    text-decoration: none;

    &:hover {
        background: #632ce4;
        cursor: pointer;
      }
`;

const DropIconDiv = styled.div`
    margin-left:auto;
`;
const SidebarTypography = styled.span`
    margin-left:16px;
`;

const SidebarItemMenu = ({ item }) => {
    const [itemDropdown, setItemDropdown] = useState(false);

    const showItemDropdown = () => setItemDropdown(!itemDropdown)

    return(
        <React.Fragment>
            <SidebarItem to={item.link} onClick={item.dropItem && showItemDropdown}>
                {item.icon}
                <SidebarTypography>
                    <Typography variant='h6'>{item.title}</Typography>  
                </SidebarTypography>
                     
            <DropIconDiv>
                {item.dropItem && itemDropdown
                 ? item.iconOpened
                 : item.itemDropdown
                }
                {item.dropItem && !itemDropdown
                    ? item.iconClosed
                    : item.null
                }
            </DropIconDiv>
            </SidebarItem>
            {itemDropdown &&
                item.dropItem.map((item,index) => {
                    return (
                        <DropdownItem to={item.link} key={index}>
                            {item.icon}
                            <Typography variant='h6'>{item.title}</Typography>
                        </DropdownItem>
                    );
                }
            )}
        </React.Fragment>
    )
}

export default SidebarItemMenu;