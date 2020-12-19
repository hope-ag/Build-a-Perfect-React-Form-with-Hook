import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core";

export function useForm(modelObject, validateOnChange = false, validate) {


    const [values, setValues] = useState(modelObject);
    const [errors, setErrors] = useState({});

    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
        if (validateOnChange)
            validate({ [name]: value })
    }

    const resetForm = () => {
        setValues(modelObject);
        setErrors({})
    }


    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm

    }
}

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(1)
        }
    }
}))

export function Form(props) {

    const classes = useStyles();
    const { children, onSubmit, ...other } = props;
    return (
        <form className={classes.root}
            autoComplete="off"
            noValidate
            onSubmit={onSubmit}
            {...other}>
            {children}
        </form>
    )
}