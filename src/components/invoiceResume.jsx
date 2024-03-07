export default function InvoiceResume({items, cashier, customer, invoiceNumber, subTotal, discount, tax, total, setIsModalOpen}){

    return(
            <div>
                <h2 className="text-center mb-6 font-bold">INVOICE</h2>

                <div className="flex flex-row w-full pb-4">
                    <div className="gap-3 flex flex-col w-1/2">
                        <label className="font-bold">Invoice Number :</label>
                        <label className="font-bold">Cashier :</label>
                        <label className="font-bold">Customer :</label>
                    </div>

                    <div className="gap-3 flex flex-col w-1/2">
                        <label>{invoiceNumber}</label>
                        <label>{cashier}</label>
                        <label>{customer}</label>
                    </div>
                </div>
                
                <div className="flex flex-row border-y-2 py-4 font-semibold">
                    <div className="w-2/5"> ITEM </div>
                    <div className="w-1/5 text-center"> QTY </div>
                    <div className="w-1/5 text-center"> PRICE </div>
                    <div className="w-1/5 text-center"> AMOUNT </div>
                </div>

                <div className="flex flex-row py-4">
                    <div className="flex flex-col gap-3 w-2/5">
                        {items? items.map((item)=>{
                                return <div> {item.name} </div>
                        }): ''}
                    </div>

                    <div className="flex flex-col gap-3 w-1/5 text-center">
                        {items && items.map((item)=>{
                                return <div> {item.qty} </div>
                        })}
                    </div>

                    <div className="flex flex-col gap-3 w-1/5 text-center">
                        {items && items.map((item)=>{
                                return <div> ${item.price} </div>
                        })}
                    </div>

                    <div className="flex flex-col gap-3 w-1/5 text-center">
                        {items && items.map((item)=>{
                                return <div> ${item.price * item.qty} </div>
                        })}
                    </div>
                </div>

                <div className="flex flex-row w-full justify-between border-y-2 py-4">
                    <div className="gap-3 flex flex-col">
                        <label className="font-bold">SubTotal :</label>
                        <label className="font-bold">Discount :</label>
                        <label className="font-bold">Tax :</label>
                    </div>

                    <div className="gap-3 flex flex-col">
                        <label className="text-end">${parseFloat(subTotal).toFixed(2)}</label>
                        <label className="text-end">${parseFloat(discount).toFixed(2)}</label>
                        <label className="text-end">${parseFloat(tax).toFixed(2)}</label>
                    </div>
                </div>

                <div className="flex flex-row justify-between pb-16 pt-4">
                    <label className="font-bold">Total :</label>
                    <label className="font-bold">${parseFloat(total).toFixed(2)}</label>
                </div>
            </div>
        
    )
}





