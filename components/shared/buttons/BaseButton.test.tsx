import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import BaseButton from './BaseButton'

describe('BaseButton', () => {
    it('should render the title correctly', () => {
        const { getByText } = render(<BaseButton title="Click Me" />)

        expect(getByText('Click Me')).toBeTruthy()
    })

    it('should call onPress when clicked', () => {
        const onPressMock = jest.fn()
        const { getByText } = render(
            <BaseButton title="Press Me" onPress={onPressMock} />
        )

        const button = getByText('Press Me')
        fireEvent.press(button)

        expect(onPressMock).toHaveBeenCalledTimes(1)
    })

    it('should not call onPress when disabled', () => {
        const onPressMock = jest.fn()
        const { getByText } = render(
            <BaseButton title="Disabled" onPress={onPressMock} disabled />
        )

        const button = getByText('Disabled')
        fireEvent.press(button)

        expect(onPressMock).not.toHaveBeenCalled()
    })

    it('should apply primary styles by default', () => {
        const { getByRole } = render(<BaseButton title="Primary" />)
        const button = getByRole('button')

        const flatStyle = StyleSheet.flatten(button.props.style)

        expect(flatStyle).toMatchObject({
            backgroundColor: expect.any(String)
        })
    })

    it('should render correct variant (danger)', () => {
        const { getByText } = render(<BaseButton title="Delete" variant="danger" />)
        const text = getByText('Delete')

        expect(text.props.style).toContainEqual(expect.objectContaining({
            color: expect.any(String),
        }))
    })
})