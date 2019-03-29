import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { bordered, roundedRectangle } from 'ui/properties'

const InputContainer = styled.div`
  position: relative;
`

const InputField = styled.input`
  ${roundedRectangle};
  ${bordered};
  font-size: ${({ theme }) => theme.font.size.base};
  
  width: 100%;
  box-sizing: border-box;
  padding: 0.5rem 0.75rem;
  
  &:focus {
    outline: none;
  }
`

const IconContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
  width: 2.5rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const TriangleIcon = styled.svg`
  width: 0.75rem;
  height: 0.75rem;
  fill: ${({ theme }) => theme.color.secondaryLighter};
  
  &:hover {
    fill: ${({ theme }) => theme.color.secondaryDarker};
  }
`

const Input = React.forwardRef(({ placeholder, value, onChange, onFocus, onBlur }, ref) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <InputContainer>
      <InputField
        type='text'
        placeholder={placeholder}
        ref={ref}
        value={value}
        onChange={onChange}
        onFocus={event => {
          setIsFocused(true)
          onFocus(event)
        }}
        onBlur={event => {
          setIsFocused(false)
          onBlur(event)
        }}
      />
      {!isFocused &&
      <IconContainer onClick={() => ref.current.focus()}>
        <TriangleIcon viewBox='0 0 100 50'>
          <polygon
            points='50,50 0,0 100,0'
          />
        </TriangleIcon>
      </IconContainer>
      }
    </InputContainer>
  )
})

Input.displayName = 'Input'

Input.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func
}

export default Input