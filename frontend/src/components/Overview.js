import React, { Component} from 'react';
import Grid from '@material-ui/core/Grid'
import {connect} from 'react-redux';
import {Link, Redirect} from "react-router-dom"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios'
import styled from 'styled-components';
import { Button, Select, MenuItem } from '@material-ui/core';
import {deleteProject, getProjects} from './actions/projectActions';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import ChatSharpIcon from '@material-ui/icons/ChatSharp';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import AssessmentSharpIcon from '@material-ui/icons/AssessmentSharp';
import Tooltip from '@material-ui/core/Tooltip';

const StatusCell = styled(TableCell)`
    padding: "0px 16px";
    font-size: '1.5rem';   
    
`;

const Status = styled.div `
    background: ${props =>
        (props.type === 'new' && 'lightblue') || 
        (props.type === 'active' && 'yellow') ||
        (props.type === 'hold' && 'pink') || 
        (props.type === 'completed' && 'lightgreen') || 
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
    max-width: 100px;
    
`;

const StyledTableHeadCell = styled(TableCell)` 
    background-color: #15171c; 
    
       
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
            status : ['new', 'active', 'hold',  'canceled','completed']
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

    getTotals = (data, key) => {
        let total = 0;
        data.forEach(item => {
          if(item["status"] == key){
            total += 1;
          }
        });
        return total;
      };

    linkToPath = (pathname,data) => {
        let savedData = JSON.stringify(data)
        localStorage.setItem(`${pathname}`,savedData)
    }


    render() {  
        const {projects} = this.props
        
        return(
            <Grid container xs={12} md={12} style={{marginLeft:220, marginTop:25}}>
                <Grid container xs={9}> 
                <Paper variant="outlined" square>
                    <Table style={{minWidth:1200}}>
                        <StyledTableHead>
                            <TableRow>
                                <StyledTableHeadCell>Title</StyledTableHeadCell>
                                <StyledTableHeadCell style={{width:130}}>Start Date</StyledTableHeadCell>
                                <StyledTableHeadCell style={{width:130}}>End Date</StyledTableHeadCell>
                                <StyledTableHeadCell style={{width:120}}>Status</StyledTableHeadCell>
                                <StyledTableHeadCell>Operations</StyledTableHeadCell>
                            </TableRow>
                        </StyledTableHead>
                        <TableBody>
                            {projects.map(project =>
                                <TableRow key={project.id}>
                                    <StyledCell style={{whiteSpace: 'normal',
                                    wordWrap: 'break-word'}} component='th' scope="row">
                                        <b>{project.title}</b>
                                    </StyledCell>
                                    <StyledCell align='center'>{this.getCurrentDate(project.start_date)}</StyledCell>
                                    <StyledCell align='center'>{this.getCurrentDate(project.end_date)}</StyledCell>
                                    <StyledCell><Status type={project.status}>{project.status}</Status></StyledCell>
                                    <TableCell style={{width:100}}>
                                        <Grid container xs={12} justify="space-between">
                                            <Tooltip title="Detials" aria-label="details"><Link to ="/details/"><i onClick={() => {this.linkToPath('/details',projects[projects.findIndex(x => x.id === project.id)])}}><AssessmentSharpIcon>Details</AssessmentSharpIcon></i></Link></Tooltip>
                                            <Tooltip title="Edit" aria-label="edit"><Link to ="/edit_project/"><i onClick={() => {this.linkToPath('/edit_project/',projects[projects.findIndex(x => x.id === project.id)] )}}><EditSharpIcon/></i></Link></Tooltip>
                                            <Tooltip title="Add Comment" aria-label="comment"><Link to ="/add_comment/"><i onClick={() => {this.linkToPath('/add_comment/',project.id )}}><ChatSharpIcon/></i></Link></Tooltip>
                                            <Tooltip title="Delete" aria-label="delete"><Link><i onClick={() => this.props.deleteProject(project)}><DeleteSharpIcon/></i></Link></Tooltip>                    
                                        </Grid>
                                    </TableCell>
                                </TableRow>    
                            )}
                        </TableBody>
                    </Table>
                </Paper>
                </Grid>
                <Grid container xs={2} style={{marginLeft:15, width:'100%', maxHeight:200}}>
                    <Paper variant="outlined" square>
                        <Table style={{minWidth:60}}>
                                <StyledTableHead>
                                    <TableRow>
                                        <StyledTableHeadCell style={{width:120}}>Status</StyledTableHeadCell>
                                        <StyledTableHeadCell>Total</StyledTableHeadCell>
                                    </TableRow>
                                </StyledTableHead>
                                <TableBody>                    
                                    {this.state.status.map(status => {
                                        return(
                                        <TableRow key={status}>     
                                            <StyledCell component='th' scope="row"><Status type={status}>{status}</Status></StyledCell>
                                            <StyledCell style={{textAlign:'center'}}>{this.getTotals(projects,status)}</StyledCell>
                                        </TableRow>)
                                    })}    
                                </TableBody>
                        </Table>
                       
                    </Paper>
                </Grid>
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