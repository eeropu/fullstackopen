/* eslint-disable no-unused-vars */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
    title: 'Testi blogi',
    author: 'Testaaja',
    url: 'testi.fi',
    likes: '3',
    user: 'Testaaja1'
}

test('renders content', () => {

    const component = render(
        <Blog blog={blog} like={() => alert('liked')} remove={() => alert('removed')}/>
    )

    expect(component.container).toHaveTextContent(
        'Testi blogi Testaaja'
    )
})

test('View button shows url and likes', () => {
    const component = render(
        <Blog blog={blog} like={() => alert('liked')} remove={() => alert('removed')} />
    )

    const button = component.getByText('view')

    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
        'url: testi.fi',
    )

    expect(component.container).toHaveTextContent(
        'likes: 3',
    )
})

test('like function is called when like button is pressed', () => {

    const mockHandler = jest.fn()

    const component = render(
        <Blog blog={blog} like={mockHandler} remove={() => alert('removed')} />
    )

    const button = component.getByText('like')

    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
})