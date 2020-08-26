import React, { Component } from "react";
import classes from "./ContactData.module.css";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "../../../axios";
import Input from "../../../components/UI/Input/Input";

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
            maxLength : 5
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
            required : true
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
    formIsValid : false,
    loading : false
  };

   checkValidity =(value,rules)=>{
  let isValid = true;

  if(rules){
    return true;
  }

  if(rules.required){
      isValid= value.trim()!=='' && isValid; 
  }

  if(rules.minLength){
    isValid= value.length>=rules.minLength  && isValid; 
}   
   
if(rules.maxLength){
    isValid= value.length<=rules.minLength  && isValid; 
}

return isValid;
   }

  inputChangedHandler = (event, inputElement) => {
    const updatedValue = {
      ...this.state.orderForm,
    };

    const updatedElement = {
      ...updatedValue[inputElement],
    };
    updatedElement.value = event.target.value;
    updatedElement.isValid= this.checkValidity(updatedElement.value,updatedElement.validation);
    updatedElement.touched= true;
    console.log(updatedElement);
    updatedValue[inputElement] = updatedElement;
   
    let formIsValid = true;
    for(let element in updatedValue){
     
      formIsValid = updatedValue[element].isValid && formIsValid;
    }
    
    console.log(formIsValid);
    this.setState({ orderForm: updatedValue ,formIsValid : formIsValid});
  };

  orderHandler = (event) => {
    event.preventDefault();
    console.log(this.props.ingredients);
    this.setState({ loading: true });

    const formData = {};
    
    for (let key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
    };

    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
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

    if (this.state.loading) {
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

export default ContactData;
