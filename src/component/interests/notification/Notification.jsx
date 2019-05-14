import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { children } from 'util/proptype'

const FloatingBannerContent = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  min-height: 3rem;
  padding: 0.5rem 0;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.white};
  z-index: ${({ theme }) => theme.z.popup};
  box-shadow: 1px 1px 10px 1px ${({ theme }) => theme.color.gray};
`

const Portal = ({ children }) => ReactDOM.createPortal(children, document.getElementById('overlay-root'))

const Notification = ({ container, offsetTop = 0, offsetBottom = 0, children }) => {
  const [show, setShow] = useState(false)

  const lastPos = useRef(0)
  const hold = useRef(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      lastPos.current = window.scrollY + window.innerHeight

      if (!hold.current) {
        window.requestAnimationFrame(() => {
          const targetRect = container.current.getBoundingClientRect()
          const topTrigger = targetRect.y + offsetTop
          const bottomTrigger = targetRect.y + targetRect.height + offsetBottom
          setShow(window.innerHeight > topTrigger && window.innerHeight < bottomTrigger)
          hold.current = false
        })

        hold.current = true
      }
    })
  })

  return show && (
    <Portal>
      <FloatingBannerContent>
        {children}
      </FloatingBannerContent>
    </Portal>
  )
}

Notification.propTypes = {
  container: PropTypes.node.isRequired,
  offsetTop: PropTypes.number,
  offsetBottom: PropTypes.number,
  children
}

export default Notification
