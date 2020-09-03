import React , {Component} from 'react';
import * as actions from '../../store/actions/index';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Input from '../../components/UI/Input/Input.js';
import Button from '../../components/UI/Button/Button';
 import classes from './Auth.module.css';
 import Spinner from '../../components/UI/Spinner/Spinner.js';
 import {updateObject} from '../../Shared/utility.js';
 import {checkValidity} from '../../Shared/utility.js';

class Auth extends Component  {

    state = {
        controls : {
            email: {
                elementType: "input",
                elementConfig: {
                  type: "email",
                  placeholder: "Mail address",
                },
                value: " ",
                validation:{
                    required : true,
                    isEmail: true
                },
                isValid : false,
                touched : false
              } ,

              password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                isValid: false,
                touched: false
            },

           
        },
        isSignUp : true
    }

    componentDidMount () {
      if(!this.props.buildingBurger &&this.props.authRedirectPath!=='/'){
        this.props.onSetAuthRedirectPth();
      }
    }



         inputChangedHandler = (event,controlName) =>{

          const updatedValue= updateObject(this.state.controls ,{
            [controlName] : updateObject(this.state.controls[controlName] , {
              value : event.target.value,
              isValid : checkValidity(event.target.value , this.state.controls[controlName].validation),
              touched : true
            })
          })
            
            this.setState({controls : updatedValue});
         }

         submitHandler =(event) =>{
          event.preventDefault();
          this.props.onAuth(this.state.controls.email.value ,this.state.controls.password.value , this.state.isSignUp);
          };

          switchAuthModeHandler =() => {
            this.setState(prevState =>{
              return{
                isSignUp:!prevState.isSignUp
              };
            })
          }

    render () {
        const formElementsArray = [];
        for (let key in this.state.controls) {
          formElementsArray.push({
            id: key,
            config: this.state.controls[key],
          });
        }

        let form = formElementsArray.map(formElement => (
            <Input 
            key= {formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            inValid={!formElement.config.isValid}
            touched={formElement.config.touched}
            shouldValidate = {formElement.config.validation}
            valueType = {formElement.id}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />

            
        ));

        if(this.props.loading)
        {
          form =<Spinner />
        }
       
        let errorMessage = null;

        if(this.props.error) {
         errorMessage = <p> {this.props.error.message}</p>
        }
         
        let authRedirect = null;
        if(this.props.isAuthenticated) {
         authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className ={classes.Auth}>
              {authRedirect}
              {errorMessage}
              <form onSubmit={this.submitHandler}> 
            {form}
              <Button btnType="Success" >SUBMIT</Button>
              </form>
              <Button btnType="Danger" 
              clicked= {this.switchAuthModeHandler}> SWITCH TO {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'} </Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
return {
  loading : state.auth.loading,
  error : state.auth.error,
  isAuthenticated : state.auth.token !==null,
  buildingBurger : state.burgerBuilder.building,
  authRedirectPath : state.auth.authRedirectPath
}
}

const mapDispatchToProps =(dispatch) => {
  return {
    onAuth : (email,password,isSignup) => dispatch(actions.auth(email,password,isSignup)),
    onSetAuthRedirectPth : () => dispatch(actions.setAuthRedirectPath('/'))
  }
}
export default connect(mapStateToProps,mapDispatchToProps) (Auth) ;