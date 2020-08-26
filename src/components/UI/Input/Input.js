import React from 'react';
import classes from './Input.module.css';

const input = (props) =>{
    let inputElement = null;
    const inputClasses=[classes.InputElement];

    let validationError = null;
if (props.inValid && props.touched) {
    validationError = <p className={classes.ValidationError} >Please enter a valid {props.valueType}!</p>;
}

    if(props.inValid && props.shouldValidate &&props.touched){
        inputClasses.push(classes.Invalid);
    }


    switch(props.elementType){
        case('input'):
           inputElement= <input className={inputClasses.join(' ')}  onChange={props.changed} {...props.elementConfig} value={props.value}/>
           break ;

        case('textarea'):
           inputElement = <textarea className={inputClasses.join(' ')} onChange={props.changed} {...props} />
           break ;
        
        case('select'):
        inputElement = (<select className={inputClasses.join(' ')} onChange={props.changed} value={props.value}>
         {props.elementConfig.options.map(op =>
            <option key={op.value} value={op.value}>{op.displayValue}</option>)}
        </select>);
        break;

        default :
        inputElement = <input className={inputClasses.join(' ')} onChange={props.changed} {...props} />
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}> {props.label} </label>
            {inputElement}
            {validationError}
        </div>
    )
}

export default input;