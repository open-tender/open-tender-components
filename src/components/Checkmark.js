import React from 'react'
import styled from '@emotion/styled'

/* https://codepen.io/scottloway/pen/zqoLyQ */

const CheckmarkView = styled('span')`
  position: relative;
  display: inline-block;
  vertical-align: top;
  border-radius: 50%;
  width: 1.9rem;
  height: 1.9rem;
  border-width: 0.2rem;
  border-style: solid;
  border-color: ${(props) => props.theme.links.primary.color};
  background-color: ${(props) => props.theme.links.primary.color};
`

const CheckmarkTick = styled('span')`
  display: block;

  &:after {
    position: absolute;
    left: 0.3rem;
    top: 0.8rem;
    height: 1rem;
    width: 0.5rem;
    border-right: 0.2rem solid ${(props) => props.theme.colors.light};
    border-top: 0.2rem solid ${(props) => props.theme.colors.light};
    content: '';
    opacity: 1;
    transform-origin: left top;
    transform: scaleX(-1) rotate(135deg);
  }
`

const Checkmark = () => {
  return (
    <CheckmarkView>
      <CheckmarkTick />
    </CheckmarkView>
  )
}

Checkmark.displayName = 'Checkmark'

export default Checkmark
