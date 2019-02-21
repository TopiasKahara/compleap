import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const SolidButton = styled.button`
  display: inline-block;
  border: none;
  background-color: ${props => props.theme.color.background.accent};
  padding: 0.5rem 2rem;
  font-size: ${props => props.theme.font.size.base};
  cursor: pointer;
  text-align: center;
  font-weight: 400;
`

const Button = ({ onClick, attributes = {}, children }) =>
  <SolidButton onClick={onClick} {...attributes}>{children}</SolidButton>

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  attributes: PropTypes.object,
  children: PropTypes.string
}

export default Button
