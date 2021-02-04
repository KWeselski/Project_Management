import React, {Component} from 'react';
import FormConfirm from './FormConfirm';
import FormCreate from './FormCreate';


class EditProjectForm extends Component {
    state = {
        step:1,
        title: '',
        description: '',
        startDate: new Date(),
        endDate: new Date(),
        users: [],
        status: '',
        project_id:null,
        returnToOverview:false,
        validate:false        
    };

    nextStep = () => {
        const { step }= this.state;
        this.setState({ step : step + 1})
    };

    returnStep = () => {
        const { step } = this.state;
        this.setState({ step : step - 1})
    };

    returnToOverview = e => {
        e.preventDefault();
        this.setState({returnToOverview:true})
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    checkDate = () => {
        const {startDate, endDate, validate} = this.state;
        if(startDate > endDate){
            this.setState({validate: false})
        }
        else
        {
            this.setState({validate: true})
        }
    }

    handleStartDateChange = (date) => {
        this.setState({ startDate: date},() => {
            this.checkDate()
        })
        
    }
    
    handleEndDateChange = (date) => {
        this.setState({ endDate: date},() => {
            this.checkDate()
        })
    }

    handleToogle = (value) => () => {
        const {users} = this.state;
        const currentIndex = users.map((v) => {return v.id}).indexOf(value.id);
        const newChecked = [...users];

        if (currentIndex === -1) {
            newChecked.push(value);
          } else {
            newChecked.splice(currentIndex, 1);
        }
        this.setState({users: newChecked})
    }

    componentDidMount() {
        const { data } = this.props.location.data;
        this.setState({
            title: data.title,
            description: data.description,
            startDate: new Date(data.start_date),
            endDate: new Date(data.end_date),
            users: data.users,
            status: data.status,
            project_id : data.id,
            creator: data.creator
        })
    }
    
    render() {
        const {step} = this.state;
        const {title, description, startDate, endDate, users, returnToOverview, status, validate, project_id, creator} = this.state;
        const values = {title, description, startDate, endDate, users, returnToOverview, status, validate, project_id, creator}
        switch(step){
            case 1:
                return(
                    <FormCreate
                        nextStep={this.nextStep}
                        returnToOverview = {this.returnToOverview}
                        handleChange={this.handleChange}
                        handleStartDateChange={this.handleStartDateChange}
                        handleEndDateChange={this.handleEndDateChange}
                        handleToogle={this.handleToogle}
                        values={values}
                        update={true}
                    />
                )
            case 2:
                return(
                    <FormConfirm
                        returnStep={this.returnStep}
                        returnToOverview = {this.returnToOverview}
                        values={values} 
                        update={true}                 
                    />
                )
        }
    }
}
export default EditProjectForm