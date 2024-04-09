import { it, expect, describe } from 'vitest'
import {fireEvent, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import InvoiceForm from '../src/components/invoiveForm'
import ItemRow from '../src/components/ItemRow'
import currentDateExpected from '../utils/commons'


describe('invoice form', () => {

    it('current date label should contain current date', () => {
        render(<InvoiceForm />)

        const currentDateReceived = screen.getByTestId('current-date');
        const dateExpected = currentDateExpected()

        expect(currentDateReceived).toBeInTheDocument()
        expect(currentDateReceived.textContent).toEqual(dateExpected)
    })

    it('When I enter an item name in the input, the subtotal and total div should changes', () => {
        render(<InvoiceForm/>)
        render(<ItemRow/>)

        const itemNameInputs = screen.getAllByPlaceholderText('Item name')
        const itemNameInput = itemNameInputs[0]

        fireEvent.change(itemNameInput, { target: { value: 'Example Item' } })

        const subtotal = screen.getByTestId('subtotal')

        const priceAllItems = screen.getAllByTestId('price').value
        const QtyAllItems = screen.getAllByTestId('qty').value

        let priceItems= 0
        for (let i = 0; i < priceAllItems.length; i++) {
            priceItems += priceAllItems[i] * QtyAllItems[i]
        }

        expect(itemNameInput).toBeInTheDocument()
        expect(subtotal).toBeInTheDocument()
        expect(subtotal.textContent).toEqual('$'+ priceItems.toFixed(2))
    })

    // it('When I click on the Add Item button, a new item row should appear', () => {
        
    // })
    

    // it('When I click on delete button, the item row should disappear', () => {
        
    // })

    // it('When I enter tax rate in the input, the Tax should change in div', () => {
        
    // })



    // it('When I click on the Review Invoice button and if cashier and customer and at least one item name existe, the modal invoice should appear.', () => {
        
    // })



    // it('When I click on the Review Invoice button and if at least cashier or customer or nothing item name existe, the modal invoice d\'ont should appear.', () => {
        
    // })


})

