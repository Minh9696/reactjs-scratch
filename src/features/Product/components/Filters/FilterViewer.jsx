import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { Box, Chip, createTheme } from '@mui/material';
import { formatCurrency } from '../../../../constants/ulti';

const theme = createTheme();

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexFlow: 'row wrap',
        alignItems: 'center',
        margin: theme.spacing(2,0),
        listStyleType: 'none',
        padding: theme.spacing(1),

        '& > li': {
            padding: theme.spacing(1),
            margin: 0
        }
    }, 
});




const FILTER_LIST = [
    {
        id: 1,
        getLabel: filter => 'Giao hàng miễn phí',
        isActive: filters => filters.isFreeShip,
        isVisible: filters => true,
        isRemovable: false,
        onRemove: () => {},
        onToggle: (filters) => {
            const newFilters = {...filters};
            if (newFilters.isFreeShip) {
                delete newFilters.isFreeShip;
            } else {
                newFilters.isFreeShip = true;
            }
            console.log({newFilters})
            return newFilters;
        }
    },
    {
        id: 2,
        getLabel: () => 'Có khuyến mãi',
        isActive: () => true,
        isVisible: (filters) => filters.isPromotion,
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters = {...filters};
            if (newFilters.isPromotion) {
                delete newFilters.isPromotion;
            } else {
                newFilters.isPromotion = true;
            }
            console.log({newFilters})
            return newFilters;
        },
        onToggle: () => {}
    },
    {
        id: 3,
        getLabel: (filters) => `Từ ${formatCurrency(filters.salePrice_gte)} đến ${formatCurrency(filters.salePrice_lte)}`,
        isActive: () => true,
        isVisible: filters => filters.salePrice_lte,
        isRemovable: true,
        onRemove: filters => {
            const newFilters = {...filters};
            delete newFilters.salePrice_lte;
            delete newFilters.salePrice_gte;
            return newFilters;
        },
        onToggle: () => {}
    },
    {
        id: 4,
        getLabel: filters => {
            if (filters['category.id']) {
                return `Danh mục: ${filters['category.id']}`;
            };
            return 'Danh mục';
        },
        isActive: filters => true,
        isVisible: filters => filters['category.id'],
        isRemovable: true,
        onRemove: filters => {
            const newFilters = {...filters};
            delete newFilters['category.id'];
            return newFilters;
        },
        onToggle: () => {}
    }
]


FilterViewer.propTypes = {
    filters: PropTypes.object,
    onChange: PropTypes.func
};

function FilterViewer({filters = {}, onChange = () => {}}) {
    const visibleFilters = useMemo(()=> {
        return FILTER_LIST.filter(x => x.isVisible(filters));
    }, [filters]);

    const classes = useStyles();
    
    return (
        <Box component='ul' className={classes.root}>
            {visibleFilters.map(x=> (
                <li key={x.id}>
                    <Chip
                        label={x.getLabel(filters)}
                        color={x.isActive(filters) ? 'primary' : 'default'}
                        clickable={!x.isRemovable ? null : () => {}}
                        onClick={x.isRemovable ? null : () => {
                            if (!onChange) return;
                            const newFilters = x.onToggle(filters);
                            onChange(newFilters);
                        }}
                        onDelete={x.isRemovable ? () => {
                            if (!onChange) return;
                            const newFilters = x.onRemove(filters);
                            onChange(newFilters)
                        } : null}
                    />
                </li>
            ))}
        </Box>
    );
}

export default FilterViewer;