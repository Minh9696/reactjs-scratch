import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SchoolListPage from './pages/SchoolListPage';
import { Box } from '@mui/material';

SchoolFeature.propTypes = {
    
};

function SchoolFeature(props) {
    return (
        <Box pt={4}>
            <Routes>
                <Route path='/' element={<SchoolListPage/>}></Route>
            </Routes>
        </Box>
    );
}

export default SchoolFeature;