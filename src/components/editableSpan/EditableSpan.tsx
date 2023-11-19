import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    value: string
    onChangeTaskTitle: (newTitle: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = (props) => {
    const {value, onChangeTaskTitle} = props

    const [editMode, setEditMode] = useState<boolean>(false);
    const [newTitle, setNewTitle] = useState<string>(value);

    const dbClickHandler = () => {
        setEditMode(true);
        setNewTitle(value)
    };

    const activateViewMode = () => {
        setEditMode(false);
        onChangeTaskTitle(newTitle)
    };

    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.currentTarget.value;
        setNewTitle(inputValue);
    };

    return editMode
        ? <input value={newTitle} onBlur={activateViewMode} onChange={changeTitleHandler} autoFocus/>
        : <span onDoubleClick={dbClickHandler}>{value}</span>
};

