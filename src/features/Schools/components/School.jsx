import React from 'react';
import PropTypes from 'prop-types';
import { Box, Skeleton, Typography } from '@mui/material';

School.propTypes = {
    school: PropTypes.object,
};

function School({school}) {
    const thumbnailUrl = school?.logoUrl
                            ? school?.logoUrl
                            : 'https://placehold.co/400'
    return (
        <Box padding={1} >
            <Box padding={1} minHeight={215}>
                <img
                    src={thumbnailUrl}
                    alt={school.name}
                    width='100%'
                />
            </Box>
            <Typography style={{textAlign: 'center'}} variant='h6'>{school.name}</Typography>
        </Box>
    );
}

export default School;