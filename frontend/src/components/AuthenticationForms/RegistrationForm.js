import React, {Component} from 'react';
import FormPassword from './FormPassword'
import FormPersonalInfo from './FormPersonalInfo'

class RegistrationForm extends Component {
     
    state = {
            step:1,
            email: '',
            password: '',
            password2: '',
            firstName: '',
            lastName: '',
            sex : '',
            age: '',
            phone: '',    
    }

    
    nextStep = () => {
        const { step } = this.state;
        this.setState({ step : step + 1})
    };

    returnStep = () => {
        const { step } = this.state;
        this.setState({ step : step - 1})
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        const {step} = this.state;
        const {email, password1, password2, firstName, lastName, sex, age, phone} = this.state;
        const values =  {email, password1, password2, firstName, lastName, sex, age, phone}
        switch(step) {
            case 1:
                return(
                    <FormPersonalInfo
                        nextStep={this.nextStep}                    
                        handleChange={this.handleChange}
                        values={values}
                    />
                )
            case 2:              
                return(
                    <FormPassword 
                        returnStep={this.returnStep}
                        handleChange={this.handleChange}
                        values={values}
                    />
                )
            default:
                console.log()
        }
        

    }

}

export default RegistrationForm