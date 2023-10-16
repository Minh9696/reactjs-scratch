import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, TextField, Typography, createTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';

FilterByPrice.propTypes = {
    onChange: PropTypes.func
};

const theme = createTheme();

const useStyles = makeStyles({
    root: {
        padding: '16px',
        borderTop: `1px solid ${theme.palette.grey[300]}`,
        
    },
    range: {
        marginTop: '16px',
        marginBottom: theme.spacing(1),

        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',

        '& > span': {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1)

        }
    }
})


function FilterByPrice({onChange}) {

    const classes = useStyles();

    const [values, setValues] = useState({
        'salePrice_gte': 0,
        'salePrice_lte': 0
    });

    const handleChange = (e) => {
        // Lỗi asynchronus
        const {name, value} = e.target;
        setValues( preValues => ({
            ...preValues,
            [name]: value
        }))
    };

    const handleSubmit = () => {
        console.log({values});
        if (onChange) {
            onChange(values);
        };
        setValues({
            'salePrice_gte': 0,
            'salePrice_lte': 0
        })
    };

    return (
        <Box className={classes.root}>
            
            <Typography variant='subtitle2'>GIÁ</Typography>

            <Box className={classes.range}>
                <TextField size='small' name="salePrice_gte" value={values.salePrice_gte} onChange={handleChange}></TextField>
                <span>-</span>
                <TextField size='small' name="salePrice_lte" value={values.salePrice_lte} onChange={handleChange}></TextField>
            </Box>
            <Button variant="outlined" size="small" color="primary" onClick={handleSubmit}>Áp dụng</Button>
        </Box>
    );
}

export default FilterByPrice;