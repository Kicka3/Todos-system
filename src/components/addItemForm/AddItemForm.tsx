import React, {ChangeEvent, useState, KeyboardEvent} from 'react';


type AddItemFormType = {
    addItem: (titleInput: string) => void
}

export const AddItemForm: React.FC<AddItemFormType> = (props) => {
    const {addItem} = props

    const [titleInput, setTitleInput] = useState<string>('');
    const [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        if (titleInput.trim() !== '') {
            addItem(titleInput.trim());
            setTitleInput('');
        } else {
            setError('Title is required')
        }
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newTitle = e.currentTarget.value;
        setTitleInput(newTitle);
        setError('')
    };

    const pressEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addItemHandler()
        }
    }

    return (
        <div>
            <input type="text"
                   value={titleInput}
                   onChange={onChangeHandler}
                   onKeyPress={pressEnterHandler}
                   className={error ? 'error' : ''}
            />
            <button onClick={addItemHandler}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
};

