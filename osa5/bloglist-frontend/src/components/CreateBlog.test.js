/* eslint-disable no-unused-vars */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import CreateBlog from './CreateBlog'

test('create blog callback function is called with correct values', () => {
    expect(1).toBe(1)

    const createBlog = jest.fn()

    const component = render(
        <CreateBlog testFunction={createBlog} />
    )

    const title = component.container.querySelector('#createBlogTitle')
    const author = component.container.querySelector('#createBlogAuthor')
    const url = component.container.querySelector('#createBlogUrl')
    const form = component.container.querySelector('form')

    fireEvent.change(title, {
        target: { value: 'testing of forms could be easier' }
    })
    fireEvent.change(author, {
        target: { value: 'Tester' }
    })
    fireEvent.change(url, {
        target: { value: 'test.fi' }
    })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)

})