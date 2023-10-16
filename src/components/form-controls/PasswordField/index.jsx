import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormHelperText, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


PasswordField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    disable: PropTypes.bool,
};

function PasswordField(props) {
    const [showPassword, setShowPassword] = useState(false);
    const {form, name, label, disable} = props;
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    return (
            <FormControl variant="outlined" fullWidth margin="normal">
                <InputLabel htmlFor={name}>{label}</InputLabel>
                <Controller
                    id={name}
                    name={name}
                    control={form.control}
                    label={label}
                    disabled={disable}
                    render={({field : {onChange, value}, fieldState: {error}}) => {
                        return (<div><OutlinedInput 
                            label={label}
                            onChange={onChange}
                            value={value}
                            error={!!error}
                            variant="outlined"
                            type={showPassword ? 'text' : 'password'}
                            fullWidth
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                        />
                        <FormHelperText errors={!!error}>{error?.message}</FormHelperText></div>
                        )}}
                />
            </FormControl>

    );
}

export default PasswordField;