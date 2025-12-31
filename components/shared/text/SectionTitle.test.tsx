import { render } from '@testing-library/react-native'
import React from 'react'
import SectionTitle from './SectionTitle'

describe('SectionTitle tests', () => {
    it('should render the children text correctly', () => {
        const { getByText } = render(<SectionTitle>Daily Summary</SectionTitle>)

        expect(getByText('Daily Summary')).toBeTruthy()
    })

    it('should apply the xlarge variant font size by default', () => {
        const { getByText } = render(<SectionTitle>Header</SectionTitle>)
        const textElement = getByText('Header')

        expect(textElement.props.style).toContainEqual(
            expect.objectContaining({ fontSize: 24 })
        )
    })

    it('should apply bold font family (Onest-900)', () => {
        const { getByText } = render(<SectionTitle>Header</SectionTitle>)
        const textElement = getByText('Header')

        expect(textElement.props.style).toContainEqual(
            expect.objectContaining({ fontFamily: 'Onest-900' })
        )
    })

    it('should allow overriding or adding extra styles', () => {
        const customStyle = { color: 'blue' }
        const { getByText } = render(
            <SectionTitle style={customStyle}>Blue</SectionTitle>
        )
        const textElement = getByText('Blue')

        expect(textElement.props.style).toContainEqual(
            expect.objectContaining({ color: 'blue' })
        )
    })
})