/* eslint-disable no-undef */
describe('Blog app', function () {

    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Theodor Tester',
            username: 'TheTester',
            password: 'secret'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.contains('Log in to application')
    })

    describe('Login', function() {
        it('succeeds with correct credentials', function() {
            cy.get('#loginUsername').type('TheTester')
            cy.get('#loginPassword').type('secret')
            cy.contains('login').click()

            cy.contains('blogs')
        })

        it('fails with wrong credentials', function() {
            cy.get('#loginUsername').type('TheTester')
            cy.get('#loginPassword').type('wrong')
            cy.contains('login').click()

            cy.contains('invalid username or password')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'TheTester', password: 'secret' })
        })

        it('a blog can be created', function() {
            cy.contains('new blog').click()
            cy.get('#createBlogTitle').type('E2E testing')
            cy.get('#createBlogAuthor').type('tester')
            cy.get('#createBlogUrl').type('e2e.test.com')
            cy.get('#createBlogSubmit').click()

            cy.contains('E2E testing tester')
        })

        it('user can like a blog', function() {
            cy.createBlog({ title: 'E2E testing', author: 'tester', url: 'e2e.test.com' })
            cy.get('.toggleButton:first').click()
            cy.contains('likes: 0')
            cy.get('.likeButton:first').click()
            cy.contains('likes: 1')
        })

        it('user can remove a blog', function() {
            cy.createBlog({ title: 'E2E testing', author: 'tester', url: 'e2e.test.com' })
            cy.contains('E2E testing tester')
            cy.get('.toggleButton:first').click()
            cy.get('.removeButton:first').click()
            cy.should('not.contain', 'E2E testing tester')
        })

        it('shown blogs are ordered by likes', function() {
            cy.createBlog({ title: 'E2E testing 1', author: 'tester', url: 'e2e.test1.com', likes: 3 })
            cy.createBlog({ title: 'E2E testing 2', author: 'tester', url: 'e2e.test2.com', likes: 2 })
            cy.createBlog({ title: 'E2E testing 3', author: 'tester', url: 'e2e.test3.com', likes: 5 })

            cy.get('.blog').then(function(blogs) {
                console.log(blogs)
                cy.wrap(blogs[0]).contains('E2E testing 3')
                cy.wrap(blogs[1]).contains('E2E testing 1')
                cy.wrap(blogs[2]).contains('E2E testing 2')
            })
        })
    })
})