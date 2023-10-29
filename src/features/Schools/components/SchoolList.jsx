import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@mui/material';
import School from './School';

SchoolList.propTypes = {
    data: PropTypes.array,
};

SchoolList.defaultProps = {
    data: [],
};

function SchoolList({data}) {
    return (
        <Box>
            <Grid container>
                {data.map((school) => (
                    <Grid item key={school._id} xs={12} sm={6} md={4} lg={3}>
                        <School school={school}/>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default SchoolList;