import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { useCallback } from 'react';
import { change } from '../modules/Todo';

export default function useTodo() {
    const number = useSelector((state: RootState) => state.Todo.number);

    const dispatch = useDispatch();

    const onChange = useCallback((number: string) => dispatch(change(number)), [dispatch]);


    return {
        number,
        onChange
    };
}