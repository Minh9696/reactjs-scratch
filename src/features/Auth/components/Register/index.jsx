import React from 'react';
import PropTypes from 'prop-types';
import RegisterForm from '../RegisterForm';
import { useDispatch } from 'react-redux';
import { register } from '../../userSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';

Register.propTypes = {
    closeDialog: PropTypes.func,
};

function Register(props) {
    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();
    const handleSubmit = async (values) => {
        try {
            const payload = {
                email: values.email,
                username: values.email,
                password: values.password,
                fullName: values.firstName
            }
            console.log('Form Register Submit', values);
            const action = register(payload);
            const resultAction = await dispatch(action);
            const user = unwrapResult(resultAction);
            console.log({user});
            enqueueSnackbar('Register successfully!', {varriant: 'success'})
            const {closeDialog} = props;
            if (closeDialog) {
                closeDialog();
            };
        } catch (error) {
            enqueueSnackbar(error.message, {variant: 'error'}) 
        }
    };

    return (
        <div>
            <RegisterForm onSubmit={handleSubmit}/>
        </div>
    );
}

export default Register;