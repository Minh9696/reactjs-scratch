import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { decrease, increase } from './counterSlice';
import { Button } from '@mui/material';

CounterFeature.propTypes = {
    
};

function CounterFeature(props) {
    const dispatch = useDispatch();
    const counter = useSelector(state => state.counter)
    const handleIncrease = () => {
        const action = increase();
        console.log('action', action);
        dispatch(action);
    };
    const handleDecrease = () => {
        const action = decrease();
        dispatch(action);
    }

    return (
        <div style={{
            textAlign: 'center',
            marginTop: '64px',

        }}>  
            <h3>
                Counter Feature: {counter}
            </h3>
            <div style={{marginTop: '16px'}}>
                <Button style={{margin: '0px 10px', backgroundColor: '#D3D3D3'}} color='primary' onClick={handleIncrease}>+</Button>
                <Button style={{margin: '0px 10px', backgroundColor: '#D3D3D3'}} color='primary' onClick={handleDecrease}>-</Button>
            </div>
        </div>
    );
}

export default CounterFeature;