import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    value: string
    onChangeTaskTitle: (newTitle: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = (props) => {
    const {value, onChangeTaskTitle} = props

    const [editMode, setEditMode] = useState<boolean>(false);
    const [newTitle, setNewTitle] = useState<string>(value);
    const [error, setError] = useState('');

    const dbClickHandler = () => {
        setEditMode(true);
        setNewTitle(value)
    };

    const activateViewMode = () => {
        if (newTitle.trim() !== '') {
        setEditMode(false);
        onChangeTaskTitle(newTitle)
        } else {
            setError('Title is required')
        }
    };

    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.currentTarget.value;
            setNewTitle(inputValue.trim());
    };

    return editMode
        ? <input className={error ? 'error' : ''}
                 value={newTitle}
                 onBlur={activateViewMode}
                 onChange={changeTitleHandler}
                 autoFocus/>
        : <span onDoubleClick={dbClickHandler}>{value}</span>
};

