import React from 'react';
import PropTypes from 'prop-types';

ToDoForm.propTypes = {
    onsubmit: PropTypes.func,
};

function ToDoForm(props) {
    return (
        <div>
            <h3>Todo Form</h3>
        </div>
    );
}

export default ToDoForm;