import React from 'react'
export const InputComponent = (props) => {
    return (
        <div className={`form_field ${props.classes}`}>
            <input onFocus={props.handleFocus} onBlur={props.handleBlur}
            className="form_field--input"
            autoComplete="off"
            type={props.type} 
            name={props.name} 
            value={props.value} 
            id={`field-${props.id}`}
            onChange={props.handleChange}
            required={props.required}
            maxLength={props.maxlength}
            />
            <label className="form_field--label" htmlFor={`field-${props.id}`}>{props.placeholder}</label>
            <span className="form_field--error">{props.errorText}</span>
        </div>
    )
}
export default InputComponent
