import React, { useEffect, useMemo, useState } from 'react';
import { Box, Grid, Pagination, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useLocation, useNavigate, useResolvedPath } from 'react-router-dom';
import queryString from 'query-string';
import PaginationCustom from '../components/PaginationCustom/PaginationCustom';
import schoolApi from '../../../api/schoolApi';
import SchoolList from '../components/SchoolList';
import SchoolSkeletonList from '../components/SchoolSkeletonList';

const useStyles = makeStyles({
    root: {

    },
    grid_item_left: {
        width: '250px'
    },
    grid_item_right: {
        flex: '1 1 0'
    },
    pagination: {
        display: "flex",
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        marginTop: '20px',
        paddingBottom: '20px'
    }
});


function SchoolListPage(props) {
    const classes = useStyles();
    let navigate = useNavigate();
    let location = useLocation();
    const queryParams = useMemo(() => {
        const params = queryString.parse(location.search);
        return {
            ...params,
            page: Number.parseInt(params.page) || 1,
            limit: Number.parseInt(params.limit) || 9,
            sortBy: params.sortBy || 'name',
            sortOrder: params.sortOrder || 'DESC',
        }
    }, [location.search]);
    const url = useResolvedPath("").pathname;

    const [schoolList, setSchoolList] = useState([]);
    const [pagination, setPagination] = useState({
        limit: 10,
        total: 10,
        page: 1
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const data = await schoolApi.getAll(queryParams);
                console.log({dataSchool: data});
                setSchoolList(data.data);
                setPagination(data.pagination);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch school list!');
                setLoading(false);
            }
        })()
    }, [queryParams]);

    const handlePageOnchange = (page) => {

        const filters = {
            ...queryParams,
            page: page
        };
        const search = queryString.stringify(filters);
        navigate(`${url}?${search}`);
    };

    return (
    <Box>
        <Grid container spacing={1}>
            <Grid className={classes.grid_item_left} item>
                <Paper elevation={0}>
                </Paper>
            </Grid>
            <Grid className={classes.grid_item_right} item>
                <Paper elevation={0}>
                    {loading 
                    ? <SchoolSkeletonList/>
                    : <SchoolList data={schoolList}/>}

                    <PaginationCustom 
                        count={Math.ceil(pagination.total / pagination.limit)} 
                        page={pagination.page}
                        onChange={handlePageOnchange}
                    ></PaginationCustom>
                </Paper>
            </Grid>
        </Grid>
    </Box>        
    );
}

export default SchoolListPage;