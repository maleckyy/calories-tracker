import { grayCardBackground, whiteColor } from "@/consts/colors/colors"
import { render } from '@testing-library/react-native'
import React from 'react'
import { Text } from 'react-native'
import { AppCard } from './AppCard'

describe('AppCard Component', () => {
    it('renders children correctly', () => {
        const { getByText } = render(
            <AppCard>
                <Text>Test Content</Text>
            </AppCard>
        )

        expect(getByText('Test Content')).toBeTruthy()
    })

    it('applies white background by default', () => {
        const { getByTestId } = render(
            <AppCard testID="card-container">
                <Text>Content</Text>
            </AppCard>
        )

        const card = getByTestId('card-container')
        expect(card.props.style).toContainEqual({ backgroundColor: whiteColor })
    })

    it('applies dark background when darkBg prop is true', () => {
        const { getByTestId } = render(
            <AppCard darkBg={true} testID="card-container">
                <Text>Content</Text>
            </AppCard>
        )

        const card = getByTestId('card-container')
        expect(card.props.style).toContainEqual({ backgroundColor: grayCardBackground })
    })

    it('merges custom styles correctly', () => {
        const customStyle = { marginTop: 20 }
        const { getByTestId } = render(
            <AppCard style={customStyle} testID="card-container">
                <Text>Content</Text>
            </AppCard>
        )

        const card = getByTestId('card-container')
        expect(card.props.style).toContainEqual(customStyle)
    })
})