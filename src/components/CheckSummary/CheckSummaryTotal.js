import React from 'react'
import propTypes from 'prop-types'
import { formatDollars } from '@open-tender/js'
import styled from '@emotion/styled'

const CheckSummaryTotalView = styled('li')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 2rem 0 0;
  border-width: 0;
  border-style: solid;
  border-color: ${(props) => props.theme.border.color};
  border-top-width: ${(props) => props.theme.border.width};
  margin: 2rem 0;
  font-weight: ${(props) => props.theme.boldWeight};
  font-size: ${(props) => props.theme.fonts.sizes.big};
  color: ${(props) => props.theme.colors.primary};

  span {
    display: block;
  }
`

const CheckSummaryTotal = ({ label, value }) => {
  return (
    <CheckSummaryTotalView>
      <span>{label}</span>
      <span>{formatDollars(value)}</span>
    </CheckSummaryTotalView>
  )
}

CheckSummaryTotal.displayName = 'CheckSummaryTotal'
CheckSummaryTotal.propTypes = {
  label: propTypes.string,
  value: propTypes.string,
}

export default CheckSummaryTotal
