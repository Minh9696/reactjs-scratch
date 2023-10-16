import React, { useEffect, useMemo, useState } from 'react';
import { Box, Grid, Pagination, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import productApi from '../../../api/productApi';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductList from '../components/ProductList';
import ProductSort from '../components/ProductSort';
import ProductFilter from '../components/ProductFilter';
import FilterViewer from '../components/Filters/FilterViewer';
import { useLocation, useNavigate, useResolvedPath } from 'react-router-dom';
import queryString from 'query-string';

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


function ListPage(props) {
    const classes = useStyles();
    let navigate = useNavigate();
    let location = useLocation();
    const queryParams = useMemo(() => {
        const params = queryString.parse(location.search);
        return {
            ...params,
            _page: Number.parseInt(params._page) || 1,
            _limit: Number.parseInt(params._limit) || 9,
            _sort: params._sort || 'salePrice:ASC',
            isPromotion: params.isPromotion === "true",
            isFreeShip: params.isFreeShip === "true",
        }
    }, [location.search]);
    const url = useResolvedPath("").pathname;

    const [productList, setProductList] = useState([]);
    const [pagination, setPagination] = useState({
        limit: 10,
        total: 10,
        page: 1
    });
    const [loading, setLoading] = useState(true);

    // const [filters, setFilters] = useState(() => ({
    //     ...queryParams,
    //     _page: Number.parseInt(queryParams._page) || 1,
    //     _limit: Number.parseInt(queryParams._limit) || 9,
    //     _sort: queryParams._sort || 'salePrice:ASC',
    // }));

    // useEffect(() => {
    //     const search = queryString.stringify(filters);
    //     navigate(`${url}?${search}`);
    // }, [url, navigate, filters])

    useEffect(() => {
        (async () => {
            try {
                const data = await productApi.getAll(queryParams);
                setProductList(data.data);
                setPagination(data.pagination);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch product list!');
                setLoading(false);
            }
        })()
    }, [queryParams]);

    const handlePageOnchange = (e, page) => {
        // setFilters((prevFilters) => ({
        //     ...prevFilters,
        //     _page: page
        // }))
        const filters = {
            ...queryParams,
            _page: page
        };
        const search = queryString.stringify(filters);
        navigate(`${url}?${search}`);
    };

    const handleSortChange = (newSortValue) => {
        // setFilters((prevFilters) => ({
        //     ...prevFilters,
        //     _sort: newSortValue
        // }))
        const filters = {
            ...queryParams,
            _sort: newSortValue
        };
        const search = queryString.stringify(filters);
        navigate(`${url}?${search}`);
    };

    const handleFiltersChange = (newFilters) => {
        // setFilters((prevFilters) => ({
        //     ...prevFilters,
        //     ...newFilters
        // }));
        const filters = {
            ...queryParams,
            ...newFilters
        };
        const search = queryString.stringify(filters);
        navigate(`${url}?${search}`);
    };

    const setNewFilters = (newFilters) => {
        const search = queryString.stringify(newFilters);
        navigate(`${url}?${search}`);
    };

    return (
    <Box>
        <Grid container spacing={1}>
            <Grid className={classes.grid_item_left} item>
                <Paper elevation={0}>
                    <ProductFilter filters={queryParams} onChange={handleFiltersChange}/>
                    {/*filters -> queryParams*/}
                </Paper>
            </Grid>
            <Grid className={classes.grid_item_right} item>
                <Paper elevation={0}>
                    <ProductSort currentSort={queryParams._sort} onChange={handleSortChange}/>
                    <FilterViewer filters={queryParams} onChange={setNewFilters}/>
                    {loading 
                    ? <ProductSkeletonList/>
                    : <ProductList data={productList}/>}
                    
                    <Pagination className={classes.pagination}
                        color="primary"
                        count={Math.ceil(pagination.total / pagination.limit)}
                        page={pagination.page}
                        onChange={handlePageOnchange}
                    >
                    </Pagination>
                </Paper>

            </Grid>
        </Grid>
    </Box>        
    );
}

export default ListPage;