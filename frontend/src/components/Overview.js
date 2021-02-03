import React, { Component} from 'react';
import Grid from '@material-ui/core/Grid'
import {connect} from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios'
import styled from 'styled-components';
import { Select, MenuItem } from '@material-ui/core';


const StatusCell = styled(TableCell)`
    padding: "0px 16px";
    font-size: '1.5rem';   
    
`;

const Status = styled.div `
    background-color: ${props =>
        (props.type === 'new' && 'blue') || 
        (props.type === 'active' && 'yellow') ||
        (props.type === 'canceled' && 'red')
    };  
    text-align: center;
    border-radius: 30px;
    width: 75%;
    margin: 0 auto;
    font-weight: bold;
    text-transform: capitalize;
`;

const StyledCell = styled(TableCell)`
    & .MuiTableCell-root {
        text-align: center;
    }
    height: "30px";
    padding: "0px 16px";
    width: "200px";  
`;

const StyledTableHeadCell = styled(TableCell)` 
    background-color: #15171c; 
    width: 200px;
       
`;

const StyledTableHead = styled(TableHead)`
    & .MuiTableCell-head {
        color: white;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
    }
    
`;




class Overview extends Component {
    constructor(props){
        super(props);
        this.state = {
            projects : [],
            operation : ''
        };
    }

    getProjects = () => {
        axios.get('/api/get_projects_list/',
        { headers: {Authorization: `${localStorage.getItem("token")}`}}
        ).then(res => {
            this.setState({projects: res.data})
        })
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    componentDidMount() {
        this.getProjects()
    }

    getCurrentDate = d => {
        let date = new Date(d)
        let separator = '/'
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let hour = date.getHours();
        let minutes = date.getMinutes();      
        return `${day}${separator}${month<10?`0${month}`:`${month}`}${separator}${year} - ${hour}:${minutes}`
    }

    render() {
        const {projects,operation} = this.state;
        return(
            <Grid container xs={12} md={12} style={{marginTop:50}}>
                <Paper>
                    <Table style={{minWidth:700}}>
                        <StyledTableHead>
                            <TableRow>
                                <StyledTableHeadCell>Title</StyledTableHeadCell>
                                <StyledTableHeadCell>Start Date</StyledTableHeadCell>
                                <StyledTableHeadCell>End Date</StyledTableHeadCell>
                                <StyledTableHeadCell>Status</StyledTableHeadCell>
                                <StyledTableHeadCell>Operations</StyledTableHeadCell>
                            </TableRow>
                        </StyledTableHead>
                        <TableBody>
                            {projects.map(project =>
                                <TableRow key={project.id}>
                                    <StyledCell component='th' scope="row">
                                        {project.title}
                                    </StyledCell>
                                    <StyledCell>{this.getCurrentDate(project.start_date)}</StyledCell>
                                    <StyledCell>{this.getCurrentDate(project.end_date)}</StyledCell>
                                    <StyledCell><Status type="active">{project.status}</Status></StyledCell>
                                    <TableCell style={{width:100}}>
                                    <Select value={operation}      
                                    onChange={this.handleChange}
                                    name="operations"
                                    fullWidth
                                    displayEmpty
                                    >
                                    <MenuItem value='' disabled>Operations</MenuItem>
                                    <MenuItem value="edit">Edit</MenuItem>
                                    <MenuItem value="add_comment">Add Comment</MenuItem>
                                    <MenuItem value="details">Details</MenuItem>
                                    <MenuItem value="delete">Delete</MenuItem>
                                    </Select>
                                    </TableCell>
                                </TableRow>    
                            )}
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>
        )
    }
}

export default (Overview);