import React, {Component} from 'react';
import FormConfirm from './FormConfirm';
import FormCreate from './FormCreate';


class CreateProjectForm extends Component {
    state = {
        step:1,
        title: '',
        description: '',
        startDate: new Date(),
        endDate: new Date(),
        users: [],
        returnToOverview:false,      
    };

    nextStep = () => {
        const { step } = this.state;
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

    handleStartDateChange = (date) => {
        this.setState({ startDate: date})
    }
    
    handleEndDateChange = (date) => {
        this.setState({ endDate: date})
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
    
    render() {
        const {step} = this.state;
        const {title, description, startDate, endDate, users, returnToOverview} = this.state;
        const values = {title, description, startDate, endDate, users, returnToOverview}
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
                    />
                )
            case 2:
                return(
                    <FormConfirm
                        returnStep={this.returnStep}
                        values={values}                  
                    />
                )
        }
    }
}
export default CreateProjectForm