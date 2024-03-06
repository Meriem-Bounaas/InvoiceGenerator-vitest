import { it, expect, describe } from 'vitest'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import InvoiceForm from '../src/components/invoiveForm'


describe('invoice form', () => {
    it('current date div should contain current date ', () => {
        render(<InvoiceForm/>)

        const currentDateElement = screen.getByText(/Current Date :/i);
        const currentDate = ()=>{
            const getDate = new Date()
            const year = getDate.getFullYear()
            const month = String(getDate.getMonth() + 1).padStart(2, '0')
            const day = String(getDate.getDate()).padStart(2, '0')
    
            return (`${day}-${month}-${year}`)
        }

        expect(currentDateElement).toBeInTheDocument()
        expect(currentDateElement).toEqual(currentDate())
    })
})