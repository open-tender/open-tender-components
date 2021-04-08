import React from 'react'
import propTypes from 'prop-types'
import { formatDollars } from '@open-tender/js'
import styled from '@emotion/styled'

const CheckItemView = styled('li')`
  width: 100%;
  padding: 0.8rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => props.theme.colors[props.color]};
  ${(props) =>
    props.isBold ? `font-weight: ${props.theme.boldWeight};` : null}
  border-color: ${(props) => props.theme.border.color};
  ${(props) =>
    props.isTotal
      ? `border-top-width: 0.1rem;
  border-top-style: solid;
  border-bottom-width: 0.3rem;
  border-bottom-style: double;`
      : null}

  span {
    display: block;
  }
`

const CheckItem = ({
  label,
  value,
  color = 'secondary',
  isBold = false,
  isTotal = false,
}) => (
  <CheckItemView color={color} isBold={isBold} isTotal={isTotal}>
    <span>{label}</span>
    <span>{formatDollars(value)}</span>
  </CheckItemView>
)

CheckItem.displayName = 'CheckItem'
CheckItem.propTypes = {
  label: propTypes.string,
  value: propTypes.string,
  color: propTypes.string,
  isBold: propTypes.bool,
  isTotal: propTypes.bool,
}

export default CheckItem
