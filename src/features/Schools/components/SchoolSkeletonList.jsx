import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@mui/material';
import {Skeleton} from '@material-ui/lab'

SchoolSkeletonList.propTypes = {
    
};

SchoolSkeletonList.defaultProps = {
    length: 6,
}

function SchoolSkeletonList(length) {
    return (
        <Box>
            <Grid container>
                {Array.from(new Array(6)).map((x, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                        <Skeleton variant="rect" width="100%" height={200}/>
                        <Skeleton />
                        <Skeleton width='60%'/>
                    </Grid>
                ))}
            </Grid>
        </Box>
        );
}

export default SchoolSkeletonList;