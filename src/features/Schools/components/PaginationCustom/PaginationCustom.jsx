import React from 'react';
import PropTypes from 'prop-types';
import './PaginationCustom.css'

PaginationCustom.propTypes = {
    
};


function PaginationCustom(props) {
    let {count, page, onChange} = props;
    page = page > count ? count : page;

    const start_page = page > 1 ? 1 : 0;

    const previous_page = page > 2 ? page - 1 : 0;

    const next_page = page + 1 < count ? page + 1 : 0;

    const end_page = page < count ? count : 0;


    let start_ellipsis = [];
    if (previous_page - start_page >= 2 && previous_page > 0 && start_page > 0) {
        for (let i = start_page + 1; i < previous_page; i ++) {
            start_ellipsis.push(i);
        }
    };

    let end_ellipsis = [];
    if (end_page - next_page >= 2 && end_page > 0 && next_page > 0) {
        for (let i = next_page + 1; i < end_page; i ++) {
            end_ellipsis.push(i);
        }
    };

    const endLen = [next_page, end_page, end_page - next_page >= 2].filter(val=>!val).length;
    if (start_ellipsis.length) {
        start_ellipsis = start_ellipsis.slice(-Math.min(start_ellipsis.length, endLen + 1))
    };

    const startLen = [previous_page, start_page, previous_page - start_page >= 2].filter(val=>!val).length;
    if (end_ellipsis.length) {
        end_ellipsis = end_ellipsis.slice(0, Math.min(end_ellipsis.length, startLen + 1))
    };

    const paginationValues = [
        start_page,
        ...start_ellipsis,
        previous_page,
        page,
        next_page,
        ...end_ellipsis,
        end_page
    ]

    if (start_ellipsis.length >= 1 && paginationValues.at(0) + 1 !==  paginationValues.at(1)) {
        paginationValues[1] = '...';
    };


    if (end_ellipsis.length >= 1 && paginationValues.at(-2) + 1 !==  paginationValues.at(-1)) {
        paginationValues[paginationValues.indexOf(paginationValues.at(-2))] = '...';
    };
    
    const handleClick = (e, page) => {
        if (!onChange) return;
        onChange(e, page)
    }

    return (
        <nav style={{
            display: 'flex',
            flexFlow: 'row nowrap',
            marginTop: '20px',
            paddingBottom: '20px',
            justifyContent: 'center'
        }}>
            <ul class="pagination-container" style={{


            }}>
                <li>
                    <button 
                        onClick={() => handleClick(page - 1)}
                        disabled={page === 1}
                    >
                    &lt;
                    </button>
                </li>
                {paginationValues.filter(val=>val).map(val => (
                    <li>
                        <button 
                            className={page === val ? 'selected' : ''} 
                            onClick={() => handleClick(val)}
                            disabled={val === '...'}
                        >{val}</button>
                    </li>
                ))}
                <li>
                    <button
                        onClick={() => handleClick(page + 1)}
                        disabled={page + 1 > end_page}
                    >
                    &gt;
                    </button>
                </li>
            </ul>
    </nav>
    );
}

export default PaginationCustom;