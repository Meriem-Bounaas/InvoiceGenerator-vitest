import { uid } from 'uid';
import ItemRow from "./ItemRow"
import { useState } from 'react';
import ModalInvoice from './ModalInvoice';
import Button from './button';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function InvoiceForm(){

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [invoiceNumber, setInvoiceNumber] = useState(1)
    const [cashier, setCashier] = useState('')
    const [customer, setCustomer] = useState('')
    const [discountRate, setDiscountRate] = useState(0)
    const [taxRate, setTaxRate] = useState(0)
    const [items, setItems] = useState([
        {
            id: uid(6),
            name: '',
            qty: 1,
            price: '1.00',
          },
    ])
    const [isCustomerEmpty, setIsCustomerEmpty] = useState(false);
    const [isCashierEmpty, setIsCashierEmpty] = useState(false);
    const [isReviewClicked , setIsReviewClicked ] = useState(false);

    const date = ()=>{
        const getDate = new Date()
        const year = getDate.getFullYear()
        const month = String(getDate.getMonth() + 1).padStart(2, '0')
        const day = String(getDate.getDate()).padStart(2, '0')

        return (`${day}-${month}-${year}`)
    }

    const subtotal = items.reduce((prev, curr) => {
        if (curr.name.trim().length > 0)
          return prev + Number(curr.price * Math.floor(curr.qty));
        else return prev;
      }, 0);
      
      const tax = (taxRate * subtotal) / 100;
      const discount = (discountRate * subtotal) / 100;
      const total = subtotal - discount + tax;

      const AddHandler = () => {
        setItems([...items, {
            id: uid(6),
            name: '',
            qty: 1,
            price: '1.00',
          }])
          setIsReviewClicked(false)
      }

        const isNameEmpty = () => {
            return items.some(item => item.name.trim() === '');
        };

      const ReviewHandler = () => {
        if(cashier.trim() === ''){
            setIsCashierEmpty(true);
        }
        if(customer.trim() === ''){
            setIsCustomerEmpty(true);
        }
        
        if(cashier && customer && !isNameEmpty()){ 
            setIsModalOpen(true);
            
        }
        setIsReviewClicked(true)
      }

      const clearAll = () => {   
        setDiscountRate(0)
        setTaxRate(0)
        setItems([])
       }

      const nextHandler = () => {
        setInvoiceNumber(invoiceNumber + 1)
        setIsModalOpen(false);
        clearAll()
      }

    const downloadHandler = () => {
            // Capture du contenu du composant InvoiceResume en tant qu'image
            const doc = new jsPDF();     
            html2canvas(document.querySelector("#invoice-resume")).then(canvas => {
            const imgData = canvas.toDataURL('image/png');

            // Ajout de l'image au PDF
            doc.addImage(imgData, 'PNG', 10, 10, 180, 160);

            // Enregistrement du PDF
            doc.save("invoice.pdf");
      })
    }

    return(
        <div className="flex flex-col lg:flex-row lg:px-28 w-full bg-gray-500 items-center">
            <div className='flex w-full lg:flex-row flex-col px-2 lg:px-0'>
                {/* first column */}
                <div className="flex flex-col lg:p-6 w-full bg-white rounded-xl mx-4 lg:w-3/4 lg:mx-0 p-4 self-center">
                
                {/* header invoice */}
                <div className="text-xl flex flex-col lg:flex-row justify-between mb-6">
                    <div className="flex flex-row gap-3">
                        <label className='font-semibold text-base md:text-xl self-end'>Current Date :</label>
                        <div data-testid='current-date' className='self-end'>{date()}</div>
                    </div>
                    <div className="flex flex-row gap-3 pt-4 lg:pt-0">
                        <div className='font-semibold text-base md:text-xl self-end'>Invoice Number : </div>
                        <input type="number" value={invoiceNumber} onChange={(e)=>{setInvoiceNumber(e.target.value)}} className="text-sm bg-slate-200 rounded-md outline-none pl-3 lg:w-32 p-2 self-end"/>
                    </div>
                </div>

                <div className="self-center text-xl py-3 border-t-2 w-full text-center font-bold "> Invoice </div>

                {/* cashier and customer name */}
                <div className="text-xl flex flex-col lg:flex-row pt-2 w-full lg:gap-12 gap-4">
                    <div className="flex flex-col gap-3 w-full">
                        <label className='font-semibold'> Cashier : </label>
                        <input className={`bg-slate-200 p-1 rounded-md outline-none ${isCashierEmpty ? 'border border-red-500' : ''}`} type="text" name='cashier' value={cashier} 
                        onChange={(e)=>{setCashier(e.target.value); setIsCashierEmpty(false)}} 
                        placeholder="Cashier name" 
                        required
                        />
                        {isCashierEmpty && 
                            <p className='text-red-600 text-sm pl-2'>Cashier name cannot be empty</p>
                        }
                    </div>
                    <div className="flex flex-col gap-3 w-full">
                        <label className='font-semibold'> Customer : </label>
                        <input className={`bg-slate-200 p-1 rounded-md outline-none ${isCustomerEmpty ? 'border border-red-500' : ''}`} type="text" name='customer' value={customer} 
                            onChange={(e)=>{setCustomer(e.target.value); setIsCustomerEmpty(false)}} 
                            placeholder="Customer name" 
                            required
                        />
                        {isCustomerEmpty && <p className='text-red-600 text-sm pl-2'>Customer name cannot be empty</p>}
                    </div>
                </div>

                {/* table invoice */}
                <table className="mt-10 w-full text-left">
                    <thead>
                        <tr className="text-sm border-b border-gray-300 ">
                            <th className="pb-2">Item</th>
                            <th className="pb-2">Qty</th>
                            <th className="text-center pb-2">Price</th>
                            <th className="text-center pb-2">Action</th>
                        </tr>
                    </thead>
                    <tbody className='gap-8'> 
                        {items.map((item)=>{
                            return(
                                <ItemRow 
                                key = {item.id}
                                id = {item.id}
                                name = {item.name}
                                qty = {item.qty}
                                price = {item.price}
                                items = {items}
                                setItems = {setItems}
                                isReviewClicked  = {isReviewClicked }
                                />
                            )
                        })}
                    </tbody>
                </table>
            
                {/* add Item */}
                <Button 
                    txt={'Add Item'}
                    clickHandler={AddHandler}
                />

                {/* footer invoice */}
                <div className="w-full lg:w-1/2 self-end pt-5 lg:pt-0">
                    <div className="flex flex-row justify-between">
                        <div className='font-semibold'>Subtotal : </div>
                        <div data-testid='subtotal'>${subtotal.toFixed(2)}</div>
                    </div>

                    <div className="flex flex-row justify-between">
                        <div className='font-semibold'>Discount : </div>
                        <div>({discountRate}%)${discount.toFixed(2)}</div>
                    </div>

                    <div className="flex flex-row justify-between">
                        <div className='font-semibold'>Tax : </div>
                        <div>({taxRate}%)${tax.toFixed(2)}</div>
                    </div>


                    <div className="flex flex-row justify-between border-t-2 py-3">
                        <div className='font-semibold'>Total : </div>
                        <div>${total.toFixed(2)}</div>
                    </div>
                </div>
            </div>

            {/* second coloumn */}
            <div className="flex flex-col h-1/2 lg:pl-5 lg:px-0 lg:w-1/4 w-full self-center lg:self-start pt-8 lg:pt-0">

                <Button 
                    txt={'Review Invoice'}
                    clickHandler={ReviewHandler}
                />

                <div className="my-6 border-t-2 text-white gap-1 flex flex-col">
                    <label className="text-white text-lg mt-2">Tax rate :</label>
                    <div className="flex flex-row self-center w-full h-9 rounded-lg">
                        <input type="number" step="0.01" placeholder="0.0" className="w-3/4 p-2 rounded-l-md text-black outline-none" value={taxRate} onChange={(e)=>{setTaxRate(e.target.value)}}/>
                        <div className="bg-gray-300 w-1/4 text-center font-bold text-gray-500 rounded-r-md">%</div>
                    </div>
                    <label className="text-white text-lg mt-3 mb-2">Discount rate :</label>
                    <div className="flex flex-row self-center w-full h-9">
                        <input type="number" step="0.01" placeholder="0.0" className="w-3/4 p-2 rounded-l-md text-black outline-none" value={discountRate} onChange={(e)=>{setDiscountRate(e.target.value)}}/>
                        <div className="bg-gray-300 w-1/4 text-center font-bold text-gray-500 rounded-r-md">%</div>
                    </div>
                </div>

            </div>

            </div>

            {isModalOpen && <ModalInvoice 
                items={items} 
                cashier={cashier} 
                customer={customer} 
                nextHandler = {nextHandler}
                downloadHandler = {downloadHandler}
                setIsModalOpen={setIsModalOpen}
                invoiceNumber={invoiceNumber} 
                setInvoiceNumber={setInvoiceNumber}
                subTotal={subtotal} 
                discount={discount} 
                tax={tax} 
                total={total}
             />}
        </div>
    )
}