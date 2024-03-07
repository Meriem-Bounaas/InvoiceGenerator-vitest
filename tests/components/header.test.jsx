import { it, expect, describe } from 'vitest'
import {render, screen} from '@testing-library/react'
import Header from '../../src/components/header'
import '@testing-library/jest-dom/vitest'

describe('header', () => {
    it('header should contain Invoice Generator text', () => {
        render(<Header/>)

        const heading = screen.getByRole('heading')
        expect(heading).toBeInTheDocument()
        expect(heading).toHaveTextContent(/Invoice Generator/i)
    })
})

