import React from 'react'
import propTypes from 'prop-types'
import { formatDollars } from '@open-tender/js'
import styled from '@emotion/styled'
import Points from '../Points'

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
  points = null,
  icon = null,
  updatePoints,
  updating,
}) => {
  const { available, applied } = points || {}

  const onClick = (evt) => {
    evt.preventDefault()
    updatePoints(applied ? 0 : available)
  }

  return (
    <CheckItemView color={color} isBold={isBold} isTotal={isTotal}>
      <span>
        {label}
        {available || applied ? (
          <Points
            onClick={onClick}
            applied={!!applied}
            disabled={updating}
            size="xSmall"
            points={applied || available}
            icon={icon}
            style={{ marginLeft: '1rem' }}
          />
        ) : null}
      </span>
      <span>{formatDollars(value)}</span>
    </CheckItemView>
  )
}

CheckItem.displayName = 'CheckItem'
CheckItem.propTypes = {
  label: propTypes.string,
  value: propTypes.string,
  color: propTypes.string,
  isBold: propTypes.bool,
  isTotal: propTypes.bool,
  points: propTypes.object,
  updatePoints: propTypes.func,
  icon: propTypes.element,
  updating: propTypes.bool,
}

export default CheckItem
