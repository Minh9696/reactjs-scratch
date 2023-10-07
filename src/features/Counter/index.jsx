import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { decrease, increase } from './counterSlice';

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
        <div>   
            Counter Feature: {counter}
            <div>
                <button onClick={handleIncrease}>Increase</button>
                <button onClick={handleDecrease}>Decrease</button>
            </div>
        </div>
    );
}

export default CounterFeature;