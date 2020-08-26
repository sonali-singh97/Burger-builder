import React from 'react';
import classes from './Order.module.css';

const order = (props) =>
{
const ingredients =[];

for(let ing in props.ingredients){
    ingredients.push({
        name : ing,
        amount : props.ingredients[ing]
    });
}

const output = ingredients.map(ing=>{
  return  <span style={{
      textTransform : "capitalize",
      display : "inline-block",
      margin : "0 8px",
      border : "1px solid #ccc",
      padding : "5px"
  }}>
      {ing["name"]}({ing["amount"]})
    </span>
})
return (<div className = {classes.Order}>
<p> Ingredients : {output}</p>
<p> Price : <strong>Rs {props.price}</strong></p>
</div>)

}

export default order;