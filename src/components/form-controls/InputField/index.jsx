import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

InputField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    disable: PropTypes.bool,
};

function InputField(props) {

    const {form, name, label, disable} = props;

    return (
        <Controller
            name={name}
            control={form.control}
            label={label}
            disabled={disable}
            render={({field : {onChange, value}, fieldState: {error}}) => {
                return <TextField 
                    placeholder='Enter the title to create a new task'
                    label={label}
                    onChange={onChange}
                    value={value}
                    error={!!error}
                    helperText={error?.message}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />}}
        />
    );
}

export default InputField;