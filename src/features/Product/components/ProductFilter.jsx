import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import FilterByCategory from './Filters/FilterByCategory';
import FilterByPrice from './Filters/FilterByPrice';
import FilterByService from './Filters/FilterByService';

ProductFilter.propTypes = {
    
};

function ProductFilter({filters, onChange}) {

    const handleCategoryChange = (newCategoryId) => {
        if (onChange) {
            const newFilters = {
                ...filters,
                'category.id': newCategoryId
            };
            onChange(newFilters);
        };
    };

    const handlePriceChange = (values) => {
        console.log({values});
        if (onChange) {
            onChange(values);
        };
    };

    const handleChange = (values) => {
        console.log({values});
        if (onChange) {
            onChange(values);
        };
    };

    return (
        <Box>
            <FilterByCategory onChange={handleCategoryChange}/>
            <FilterByPrice onChange={handleChange}/>
            <FilterByService filters={filters} onChange={handleChange}/>
        </Box>
    );
}

export default ProductFilter;