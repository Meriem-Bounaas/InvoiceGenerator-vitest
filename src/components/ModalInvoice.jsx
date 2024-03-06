import { useEffect } from "react";
 import InvoiceResume from "./invoiceResume";
 
export default function ModalInvoice({nextHandler, downloadHandler, items, cashier, customer, invoiceNumber, setInvoiceNumber, subTotal, discount, tax, total, setIsModalOpen}){

    useEffect(() => {
        function handleClickOutside(event) {
            if (event.target.classList.contains('bg-gray-800')) {
                setIsModalOpen(false); 
            }
        }

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    });
    
    return(
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
            <div className="bg-white p-4 w-1/3 rounded-lg flex flex-col justify-between">
                <div id="invoice-resume">
                    <InvoiceResume items={items} cashier={cashier} customer={customer} invoiceNumber={invoiceNumber} subTotal={subTotal} discount={discount} tax={tax} total={total} />
                </div>
                <div className="flex flex-row justify-between gap-3">
                    <button className="border-b-2 bg-yellow-300 p-2 rounded-md ml-3 w-1/2" onClick={downloadHandler} >Download</button>
                    <button className="border-b-2 bg-yellow-300 p-2 rounded-md mr-3 w-1/2" onClick={nextHandler}>Next</button>
                </div>
            </div>
        </div>
    )
}





