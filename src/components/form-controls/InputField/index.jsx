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
            fullWidth
            label={label}
            disabled={disable}
            render={({field : {onChange, value}, fieldState: {error}}) => {
                return <TextField 
                    placeholder='Todo Field'
                    label={label}
                    onChange={onChange}
                    value={value}
                    error={!!error}
                    helperText={error?.message}
                />}}

        />
    );
}

export default InputField;