import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'; 

export default function ItemRow({ id, name, qty, price, items, setItems, isReviewClicked }) {
    const [isNameEmpty, setIsNameEmpty] = useState(!name || name.trim() === '');

    useEffect(() => {
        setIsNameEmpty(!name || name.trim() === '');
    }, [name, qty, price]);

    const deleteItemHandler = () => {
        const myItems = items.filter(item => item.id !== id);
        setItems(myItems);
    };

    const editItemHandler = (event, itemId) => {
        const { name, value } = event.target;

        const newItems = items.map(item => {
            if (item.id === itemId) {
                const isEmpty = value.trim() === '';
                setIsNameEmpty(isEmpty);
                return { ...item, [name]: value };
            }
            return item;
        });
        setItems(newItems);
    };

    return (
        <>
            <tr>
                <td id={id} className="w-3/5">
                    <input
                        className={`bg-slate-200 w-full p-2 rounded-lg outline-none ${
                            isNameEmpty && isReviewClicked ? 'border border-red-500' : ''}`}
                        type="text"
                        placeholder=" Item name"
                        name="name"
                        value={name}
                        onChange={event => editItemHandler(event, id)}
                        required
                    />
                </td>
                <td id={id} className='min-w-1/5'>
                     <input
                         className="bg-slate-200 w-full text-start p-2 rounded-lg outline-none"
                         type="number"
                         min={1}
                         max={100}
                         step={1}
                         name="qty"
                         value={qty}
                         onChange={event => editItemHandler(event, id)}
                     />
                 </td>
                <td id={id} className="min-w-1/5">
                    <div className="relative">
                        <FontAwesomeIcon icon={faDollarSign} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <input
                            className="bg-slate-200 w-full text-end p-2 rounded-lg outline-none"
                            type="number"
                            name="price"
                            min={0}
                            step={0.01}
                            value={price}
                            onChange={event => editItemHandler(event, id)}
                        />
                    </div>
                </td>
                <td className="h-full min-w-1/5">
                    <div className='flex items-center justify-center h-full'>
                        <button onClick={deleteItemHandler}>
                            <FontAwesomeIcon icon={faTrashAlt} className="text-xl md:text-2xl cursor-pointer text-gray-500" />
                        </button>
                    </div>
                </td>
            </tr>
            {isNameEmpty && isReviewClicked && (
                <tr>
                    <td colSpan="4" className="pl-2 text-red-600 text-sm">Please fill this field</td>
                </tr>
            )}
        </>
    );
}
