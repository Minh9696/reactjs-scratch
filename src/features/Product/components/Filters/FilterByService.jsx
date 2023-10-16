import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Checkbox, FormControlLabel, TextField, Typography, createTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';

FilterByService.propTypes = {
    onChange: PropTypes.func,
    filters: PropTypes.object,

};

const theme = createTheme();

const useStyles = makeStyles({
    root: {
        padding: '16px',
        borderTop: `1px solid ${theme.palette.grey[300]}`,
        
    },
    list: {
        padding: theme.spacing(1),
        margin: theme.spacing(1),
        listStyleType: 'none',

        '& li': {
            margin: 0
        }

    }
})


function FilterByService({filters={}, onChange}) {

    const classes = useStyles();

    const handleChange = (e) => {
        if (!onChange) return;
        // Lỗi asynchronus
        const {name, checked} = e.target;
        console.log('FilterByService', e)
        if (onChange) onChange({[name]: checked});
    };

    return (
        <Box className={classes.root}>
            
            <Typography variant='subtitle2'>DỊCH VỤ</Typography>
            <ul className={classes.list}>
                {[
                    {key: 'isPromotion', label: 'Có khuyến mãi'}, 
                    {key: 'isFreeShip', label: 'Miễn phí ship'}
                ].map((serv) => (
                    <li key={serv.key}>
                        <FormControlLabel
                            control={<Checkbox checked={Boolean(filters[serv.key])} onChange={handleChange} name={serv.key} color="primary"/>}
                            label={serv.label}
                        />
                    </li>
                ))}
            </ul>

        </Box>
    );
}

export default FilterByService;