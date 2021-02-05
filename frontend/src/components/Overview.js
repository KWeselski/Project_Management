import React, { Component} from 'react';
import Grid from '@material-ui/core/Grid'
import {connect} from 'react-redux';
import {Link, Redirect} from "react-router-dom"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import axios from 'axios'
import styled from 'styled-components';
import { Button, Select, MenuItem } from '@material-ui/core';
import {deleteProject, getProjects} from './actions/projectActions';

const StatusCell = styled(TableCell)`
    padding: "0px 16px";
    font-size: '1.5rem';   
    
`;

const Status = styled.div `
    background: ${props =>
        (props.type === 'new' && 'lightblue') || 
        (props.type === 'active' && 'yellow') ||
        (props.type === 'canceled' && 'red')
    };  
    text-align: center;
    border-radius: 30px;
    width: 75%;
    margin: 0 auto;
    font-weight: bold;
    text-transform: capitalize;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
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
            operation : ''
        };
    }

    deleteProject(project){
        const {projects} = this.state;
        axios.delete('/api/delete_project',{
            data: {id: project.id}
        },
        { headers: {Authorization: `${localStorage.getItem("token")}`}})
        .then(()=>{
            const index = projects.indexOf(project);
            if (index > -1) {
                projects.splice(index, 1);
            }
            this.setState({projects: projects} )
        })
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    componentDidMount(){
        this.props.getProjects()
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
        const {operation} = this.state;
        const {projects} = this.props
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
                                    <StyledCell><Status type={project.status}>{project.status}</Status></StyledCell>
                                    <TableCell style={{width:100}}>
                                    <Select value={operation}      
                                    onChange={this.handleChange}
                                    name="operations"
                                    fullWidth
                                    displayEmpty
                                    >
                                    <MenuItem value='' disabled>Operations</MenuItem>
                                    <MenuItem value="edit"><Link to={{
                                        pathname:"/edit_project",
                                        data:{
                                            data: projects[projects.findIndex(x => x.id === project.id)]                       
                                        }
                                    }}>Edit</Link></MenuItem>
                                    <MenuItem value="add_comment"><Link to={{
                                        pathname:'/add_comment',
                                        data:{id: project.id}    
                                    }}>Add Comment</Link></MenuItem>
                                    <MenuItem value="details"><Link to={{
                                        pathname:"/details",
                                        data:{
                                            data: projects[projects.findIndex(x => x.id === project.id)]                       
                                        }
                                    }}>Details</Link></MenuItem>
                                    <MenuItem onClick={() => this.props.deleteProject(project)} value="delete"><Button fullWidth variant='contained' color='primary'>Delete</Button></MenuItem>
                                    </Select>
                                    </TableCell>
                                </TableRow>    
                            )}
                        </TableBody>
                    </Table>
                    <Link to="/create_project">
                        <Button
                        type="submit"
                        variant='contained'
                        color="primary">
                        Create project
                        </Button>
                    </Link>
                </Paper>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return{
      projects: state.project.projects,
    }
};

const mapDispatchToProps = (dispatch) => {
    return{
        getProjects: () => {dispatch(getProjects())},
        deleteProject: (project) => {dispatch(deleteProject(project))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Overview)