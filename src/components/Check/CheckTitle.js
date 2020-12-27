import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Heading } from '..'

const CheckTitleView = styled('div')`
  padding: 0 0 0.5rem;
  border-bottom-width: ${(props) => props.theme.border.width};
  border-bottom-style: solid;
  border-bottom-color: ${(props) => props.theme.border.color};
  margin: 0 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  p {
    display: block;
    font-size: ${(props) => props.theme.fonts.sizes.small};

    &:first-of-type {
      font-size: ${(props) => props.theme.fonts.sizes.h4};
    }
  }
`

const CheckTitle = ({ title, orderId }) => (
  <CheckTitleView>
    <p>
      <Heading>{title}</Heading>
    </p>
    {orderId && <p>editing order {orderId}</p>}
  </CheckTitleView>
)

CheckTitle.displayName = 'CheckTitle'
CheckTitle.propTypes = {
  title: propTypes.string,
  orderId: propTypes.oneOfType([propTypes.string, propTypes.number]),
}

export default CheckTitle
