import React from 'react'
import propTypes from 'prop-types'
import { formatDollars } from '@open-tender/js'
import styled from '@emotion/styled'

const CheckSummaryItemView = styled('li')`
  width: 100%;
  margin: 1rem 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${(props) => props.theme.fonts.sizes.small};
  color: ${(props) =>
    props.theme.colors[props.isBold ? 'primary' : 'secondary']};
  ${(props) =>
    props.isBold ? `font-weight: ${props.theme.boldWeight};` : null}

  span {
    display: block;
  }
`

const CheckSummaryItem = ({ label, value, isBold = false }) => {
  return (
    <CheckSummaryItemView isBold={isBold}>
      <span>{label}</span>
      <span>{formatDollars(value)}</span>
    </CheckSummaryItemView>
  )
}

CheckSummaryItem.displayName = 'CheckSummaryItem'
CheckSummaryItem.propTypes = {
  label: propTypes.string,
  value: propTypes.string,
  isBold: propTypes.bool,
}

export default CheckSummaryItem
