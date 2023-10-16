import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs } from '@mui/material';

ProductSort.propTypes = {
    currentSort: PropTypes.string.isRequired,
    onChange: PropTypes.func
};

function ProductSort({currentSort, onChange}) {
    console.log({currentSort, onChange})
    const handleSortChange = (event, newValue) => {
        console.log({event, newValue});
        if (onChange) {
            onChange(newValue);
        };
    };
    return (
        <Tabs
            textColor='primary'
            onChange={handleSortChange}
            value={currentSort}
            indicatorColor="primary"
            aria-label="disabled tabs example"
        >
            <Tab label="Lowest Price First" value='salePrice:ASC'></Tab>
            <Tab label="Highest Price First" value="salePrice:DESC"></Tab>
        </Tabs>
    );
}

export default ProductSort;