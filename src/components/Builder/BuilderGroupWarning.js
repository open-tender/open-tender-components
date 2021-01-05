import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

const BuilderGroupWarningView = styled('div')`
  min-width: 9.2rem;
  padding: 0 1rem;
  border-width: 0.1rem;
  border-style: solid;
  border-color: ${(props) => props.theme.border.color};
  border-radius: ${(props) => props.theme.border.radiusSmall};
  background-color: ${(props) => props.theme.bgColors.primary};
  font-size: ${(props) => props.theme.fonts.sizes.small};
`

const BuilderGroupQuantity = styled('span')`
  height: 3.2rem;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    display: block;
  }

  span + span {
    margin-left: 0.7rem;
  }
`

const BuildGroupAlert = styled('span')`
  width: 2rem;
  height: 2rem;
  margin: 0 0 0 0.3rem;
  line-height: 2rem;
  border-radius: 1rem;
  text-align: center;
  color: ${(props) => props.theme.colors.light};
  background-color: ${(props) => props.theme.colors.error};
  border-color: ${(props) => props.theme.colors.light};
`

const BuilderGroupWarning = ({ quantity, min, max }) => {
  // const isRadio = min === 1 && max === 1
  // const belowMin = !isRadio && min !== 0 && quantity < min
  // const atMax = !isRadio && max !== 0 && quantity === max
  // const classes = `${belowMin ? '-min' : atMax ? '-max' : ''}`
  return (
    <BuilderGroupWarningView>
      {quantity < min ? (
        <BuilderGroupQuantity>
          <span>Select</span>
          <BuildGroupAlert>{min - quantity}</BuildGroupAlert>
        </BuilderGroupQuantity>
      ) : (
        <BuilderGroupQuantity>
          <span>Selected</span>
          <span>
            {quantity}
            {max ? `/${max}` : ''}
          </span>
        </BuilderGroupQuantity>
      )}
    </BuilderGroupWarningView>
  )
}

BuilderGroupWarning.displayName = 'BuilderGroupWarning'
BuilderGroupWarning.propTypes = {
  quantity: propTypes.number,
  min: propTypes.number,
  max: propTypes.number,
}

export default BuilderGroupWarning
