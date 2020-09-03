import React, { Component } from "react";
import {connect} from 'react-redux';
import classes from "./ContactData.module.css";
import * as actions from '../../../store/actions/index';
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "../../../axios";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import {updateObject} from '../../../Shared/utility';
import {checkValidity} from '../../../Shared/utility';



class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation:{
            required : true
        },
        isValid : false,
        touched : false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation:{
            required : true
        },
        isValid :false,
        touched : false
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP",
        },
        value: "",
        validation:{
            required : true,
            minLength : 5,
            maxLength : 5,
            isNumeric: true
        },
        isValid : false,
        touched :false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation:{
            required : true
        },
        isValid : false,
        touched :false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail",
        },
        value: " ",
        validation:{
            required : true,
            isEmail: true
        },
        isValid : false,
        touched : false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "fastest",
        validation : {},
        isValid : true
      },
    },
    formIsValid : false
  };

 

  inputChangedHandler = (event, inputElement) => {
   const updatedFormElement = updateObject(this.state.orderForm[inputElement],{
         value : event.target.value,
         isValid : checkValidity(event.target.value,this.state.orderForm[inputElement].validation),
         touched : true
   } );

   const updatedOrderForm = updateObject(this.state.orderForm,{
     [inputElement] : updatedFormElement
   });
      
    let formIsValid = true;
    for(let element in updatedOrderForm){
     
      formIsValid = updatedOrderForm[element].isValid && formIsValid
    }
    
   
    this.setState({ orderForm: updatedOrderForm ,formIsValid : formIsValid});
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });

    const formData = {};
    
    for (let key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
      userId : this.props.userId
    };

   this.props.onOrderBurger (this.props.token ,order);
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form>
        {formElementsArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            inValid={!formElement.config.isValid}
            touched={formElement.config.touched}
            shouldValidate = {formElement.config.validation}
            valueType = {formElement.id}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        
        <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state=>{
return {
  ingredients : state.burgerBuilder.ingredients,
  price : state.burgerBuilder.totalPrice,
  loading : state.order.loading,
  token : state.auth.token,
  userId : state.auth.userId
}
}


const mapDispatchToProps = dispatch => {
  return {
 onOrderBurger  : (token ,orderData) => dispatch(actions.purchaseBurger(token ,orderData))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));
