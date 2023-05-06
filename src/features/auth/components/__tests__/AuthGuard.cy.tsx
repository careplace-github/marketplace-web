import React from 'react'
import AuthGuard from 'src/AuthGuard'

describe('<AuthGuard />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<AuthGuard />)
  })
})