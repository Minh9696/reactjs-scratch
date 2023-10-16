import React from 'react';
import PropTypes from 'prop-types';
import { Box, Skeleton, Typography } from '@mui/material';
import { STATIC_HOST } from '../../../constants';

Product.propTypes = {
    product: PropTypes.object,
};

function Product({product}) {
    const thumbnailUrl = product.thumbnail?.url
                            ? `${STATIC_HOST}/${product.thumbnail?.url}`
                            : 'https://placehold.co/400'
    return (
        <Box padding={1} >
            <Box padding={1} minHeight={215}>
                <img
                    src={thumbnailUrl}
                    alt={product.name}
                    width='100%'

                />
            </Box>
            <Typography variant='body2'>{product.name}</Typography>
            <Typography variant='body2'>
                <Box component="span" mr={1} fontSize="16px" fontWeight="bold">
                    {new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(product.salePrice)}
                </Box>
                {product.promotionPercent > 0 ? ` - ${product.promotionPercent} %` : ''}</Typography>
        </Box>
    );
}

export default Product;