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
    const [cashier, setCashier] = useState()
    const [customer, setcustomer] = useState()
    const [discountRate, setDiscountRat] = useState(0)
    const [taxRate, setTaxRat] = useState(0)
    const [items, setItems] = useState([
        {
            id: uid(6),
            name: '',
            qty: 1,
            price: '1.00',
          },
    ])

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
      }
      const namesNotVide = () => {
          const newTab = items.filter((item)=>{ return item.name.length <= 0})
          return (newTab.length > 0)?  false : true
        //   compact solution : return !(newTab.length > 0)
      }
      const ReviewHandler = () => {
        if(cashier && customer && items.length > 0 && namesNotVide()){ 
            setIsModalOpen(true);
        }
      }
      const clearAll = () => {   
        setDiscountRat(0)
        setTaxRat(0)
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
        <div className="flex flex-row px-28 w-full bg-gray-500">
            {/* first column */}
            <div className="flex flex-col p-6 bg-white rounded-xl w-3/4 self-center">
                {/* header invoice */}
                <div className="text-xl flex flex-row justify-between mb-6">
                    <div className="flex flex-row gap-3">
                        <label>Current Date :</label>
                        <div>{date()}</div>
                    </div>
                    <div className="flex flex-row gap-3">
                        <label>Invoice Number : </label>
                        <input type="number" value={invoiceNumber} onChange={(e)=>{setInvoiceNumber(e.target.value)}} className="text-sm bg-slate-200 rounded-md outline-none pl-3 w-32 p-2"/>
                    </div>
                </div>

                <div className="self-center text-xl py-3 border-t-2 w-full text-center "> Invoice </div>

                {/* cashier and customer name */}
                <div className="text-xl flex flex-row pt-2 w-full gap-12">
                    <div className="flex flex-col gap-3 w-full">
                        <label> Cashier : </label>
                        <input className="bg-slate-200 p-1 rounded-md outline-none" type="text" name='cashier' value={cashier} 
                        onChange={(e)=>{setCashier(e.target.value)}} 
                        placeholder="Cashier name" 
                        required/>
                    </div>
                    <div className="flex flex-col gap-3 w-full">
                        <label> Customer : </label>
                        <input className="bg-slate-200 p-1 rounded-md outline-none" type="text" name='customer' value={customer} onChange={(e)=>{setcustomer(e.target.value)}} placeholder="Customer name" required/>
                    </div>
                </div>

                {/* table invoice */}
                <table className="mt-10 w-full text-left">
                    <thead>
                        <tr className="text-sm">
                            <th className="">Item</th>
                            <th className="">Qty</th>
                            <th className="text-center">Price</th>
                            <th className="text-center">Action</th>
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
                <div className="w-1/2 self-end">
                    <div className="flex flex-row justify-between">
                        <div>Subtotal : </div>
                        <div> ${subtotal.toFixed(2)}</div>
                    </div>

                    <div className="flex flex-row justify-between">
                        <div>Discount : </div>
                        <div>({discountRate}%)${discount.toFixed(2)}</div>
                    </div>

                    <div className="flex flex-row justify-between">
                        <div>Tax : </div>
                        <div>({taxRate}%)${tax.toFixed(2)}</div>
                    </div>

                    <hr  className="border-2 h-1 my-4"/>

                    <div className="flex flex-row justify-between">
                        <div>Total : </div>
                        <div>${total.toFixed(2)}</div>
                    </div>
                </div>
            </div>

            {/* second coloumn */}
            <div className="flex flex-col h-1/2 pl-5 w-1/4">

                <Button 
                    txt={'Review Invoice'}
                    clickHandler={ReviewHandler}
                />

                <div className="my-6 border-t-2 text-white gap-1 flex flex-col">
                    <label className="text-white text-lg mt-2">Tax rate :</label>
                    <div className="flex flex-row self-center w-full h-9 rounded-lg">
                        <input type="number" step="0.01" placeholder="0.0" className="w-3/4 p-2 rounded-l-md text-black outline-none" onChange={(e)=>{setTaxRat(e.target.value)}}/>
                        <div className="bg-gray-300 w-1/4 text-center font-bold text-gray-500 rounded-r-md">%</div>
                    </div>
                    <label className="text-white text-lg mt-3 mb-2">Discount rate :</label>
                    <div className="flex flex-row self-center w-full h-9">
                        <input type="number" step="0.01" placeholder="0.0" className="w-3/4 p-2 rounded-l-md text-black outline-none" onChange={(e)=>{setDiscountRat(e.target.value)}}/>
                        <div className="bg-gray-300 w-1/4 text-center font-bold text-gray-500 rounded-r-md">%</div>
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