export default function ItemRow({id, name, qty, price, items, setItems}){

    const deleteItemHandler = () => {
        const myItems = items.filter(item => item.id !== id )
        setItems(myItems)
    };

    const editItemHandler = (event, itemId) => {
        const editedItem = {
            name: event.target.name,
            value: event.target.value,
        };

        const newItems = items.map((item) => {
            if (item.id === itemId) {
                return { ...item, [editedItem.name]: editedItem.value };
            } else {
                return item;
            }
        });
        setItems(newItems);
    }


    return(
        <tr>
            <td id={id} className="w-full">
                <input className="bg-slate-200 w-full p-2 rounded-lg outline-none" type="text" placeholder=" Item name" name='name' value={name} onChange={(event) => editItemHandler(event, id)} required/>
            </td>
            <td id={id} >
                <input className="bg-slate-200 text-start p-2 rounded-lg outline-none" type="number" min={1} max={100} step={1} name='qty' value={qty} onChange={(event) => editItemHandler(event, id)}  />
            </td>
            <td id={id} > 
                <div className="relative">
                    <i className="absolute left-3 top-1/2 transform -translate-y-1/2 fa-thin fa-dollar-sign"></i>
                    <input className="bg-slate-200 text-end flex-grow p-2 rounded-lg outline-none" type="number" name='price' min={0} step={0.01} value={price} onChange={(event) => editItemHandler(event, id)}/>
                </div>
            </td>
            <td className="flex items-center justify-center">
                <button onClick={deleteItemHandler}>
                    <i className="fa-regular fa-trash-can text-xl md:text-2xl cursor-pointer text-gray-500"></i>
                </button>
            </td>
        </tr>     
    )  
}