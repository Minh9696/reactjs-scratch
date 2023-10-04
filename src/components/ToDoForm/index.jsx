import React from 'react';
import PropTypes from 'prop-types';
import {useForm} from 'react-hook-form';
import InputField from '../form-controls/InputField';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const schema = yup
  .object({
    title: yup.string().required('Title must not be empty!')
                .min(5, 'Title is too short!'),
  })
  .required()

ToDoForm.propTypes = {
    onsubmit: PropTypes.func,
};

function ToDoForm(props) {

    const form = useForm({
        defaultValues: {
            title: '',
        },
        resolver: yupResolver(schema)
    });

    const handleSubmit  = (values) => {
        const {onSubmit} = props;
        if (onSubmit) {
            onSubmit(values);
        };
        form.reset()
    };

    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <h3>Todo Form</h3>
            <InputField form={form} name="title" label="Title"/>
        </form>
    );
}

export default ToDoForm;