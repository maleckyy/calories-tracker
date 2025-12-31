import { render } from '@testing-library/react-native'
import React from 'react'
import { AppText } from './AppText'

describe('AppText tests', () => {
    it('should render the children text correctly', () => {
        const { getByText } = render(<AppText>Text</AppText>)

        expect(getByText('Text')).toBeTruthy()
    })

    it('should apply the correct font size for xlarge variant', () => {
        const { getByText } = render(<AppText variant="xlarge">Large Header</AppText>)
        const textElement = getByText('Large Header')

        expect(textElement.props.style).toContainEqual(
            expect.objectContaining({ fontSize: 24 })
        )
    })

    it('should apply bold font family when bold prop is true', () => {
        const { getByText } = render(<AppText bold>Bold Text</AppText>)
        const textElement = getByText('Bold Text')

        expect(textElement.props.style).toContainEqual(
            expect.objectContaining({ fontFamily: 'Onest-900' })
        )
    })

    it('should combine default styles with custom styles', () => {
        const customStyle = { color: 'red' }
        const { getByText } = render(
            <AppText style={customStyle}>Custom Red Text</AppText>
        )
        const textElement = getByText('Custom Red Text')

        expect(textElement.props.style).toContainEqual(
            expect.objectContaining({ color: 'red' })
        )
        expect(textElement.props.style).toContainEqual(
            expect.objectContaining({ fontSize: 14 })
        )
    })

    it('should pass through standard Text props', () => {
        const { getByText } = render(
            <AppText numberOfLines={2}>Long text...</AppText>
        )
        const textElement = getByText('Long text...')

        expect(textElement.props.numberOfLines).toBe(2)
    })
})