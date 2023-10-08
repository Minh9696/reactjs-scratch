import React from 'react';
import PropTypes from 'prop-types';
import {useForm} from 'react-hook-form';
import InputField from '../../../../components/form-controls/InputField';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Avatar, Button, Grid, LinearProgress, Typography } from '@mui/material';
import { LockClockOutlined } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import PasswordField from '../../../../components/form-controls/PasswordField';

const schema = yup.object({
    identifier: yup.string().required('Required!')
                .email('Must be email format'),
    password: yup.string()
            .required('Required')
            .min(6),
});


LoginForm.propTypes = {
    onsubmit: PropTypes.func,
};

const useStyles = makeStyles({
    root: {
        marginTop: 32,
    },
    avatar: {
        margin: '0 auto',
    },
    title: {
        textAlign: 'center',
        marginTop: 16,
        marginBottom: 32,
    },
    submit: {
        marginTop: 32,
        marginBottom: 32,
    },
    progress: {
        position: 'absolute',
        top: 8,
        left: 0,
        right: 0
    }

})

function LoginForm(props) {

    const classes = useStyles();

    const form = useForm({
        defaultValues: {
            identifier: '',
            password: '',
        },
        resolver: yupResolver(schema),
    });

    const {isSubmitting, } = form.formState;

    const handleSubmit  = async (values) => {
        const {onSubmit} = props;
        if (onSubmit) {
            await onSubmit(values);
        };
        form.reset()
    };

    return (
        <div className={classes.root}>
            {isSubmitting && <LinearProgress className={classes.progress}/>}
            <Avatar className={classes.avatar} sx={{ m: '0 auto', bgcolor: 'secondary.main' }}>
                <LockClockOutlined/>
            </Avatar>
            <Typography className={classes.title} component="h3" variant="h5">
                Sign in
            </Typography>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <Grid item xs={12}><InputField form={form} name="identifier" label="Email"/></Grid>
                <Grid item xs={12}><PasswordField form={form} name="password" label="Password"/></Grid>
                <Button
                    disabled={isSubmitting} 
                    type="submit" 
                    sx={{ mt: 3, mb: 2 }} 
                    variant="contained" 
                    color='primary' 
                    fullWidth
                    size="large"
                    >
                    Sign in
                </Button>
            </form>
        </div>
    );
}

export default LoginForm;
