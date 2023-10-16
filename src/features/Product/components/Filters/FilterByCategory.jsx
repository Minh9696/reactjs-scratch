import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import categoryApi from '../../../../api/categoryApi';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '16px 16px 16px 16px'
    },
    menu: {
        padding: 0,
        margin: 0,
        listStyleType: 'none',
        '& > li': {
            marginTop: '8px',
            transition: 'all .25s',
            '&:hover': {
                cursor: 'pointer',
                color: '#1976d2'
            },
        }
    }
}));

FilterByCategory.propTypes = {
    onChange: PropTypes.func
};

function FilterByCategory({onChange}) {

    const classes = useStyles()

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        (async ()=> {
            try {
                const res = await categoryApi.getAll();
                const categs = res.data.map((categ) => ({
                    id: categ.id,
                    name: categ.name
                }));
                setCategories(categs);
            } catch (error) {
                console.error('Failed to fetch product categories!');
            }
        })()
    }, []);

    const handleCategoryClick = (categ) => {
        if (onChange) {
            onChange(categ.id)
        };
    }

    return (
        <Box className={classes.root}>
            <Typography variant='subtitle2'>DANH MỤC SẢN PHẨM</Typography>
            <ul className={classes.menu}>
                {categories.map(categ => (
                    <li key={categ.id} onClick={() => handleCategoryClick(categ)}>
                        <Typography variant="body2">{categ.name}</Typography>
                    </li>
                ))}
            </ul>
        </Box>
    );
}

export default FilterByCategory;