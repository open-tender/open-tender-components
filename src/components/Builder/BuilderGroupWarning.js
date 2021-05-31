import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

const BuilderGroupWarningContainer = styled('div')`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

// const BuilderGroupIncluded = styled('div')`
//   max-width: 9.2rem;
//   padding: 0 1rem 0 0;
//   text-align: center;
//   color: ${(props) =>
//     props.theme.colors[props.remaining ? 'success' : 'secondary']};
//   font-size: ${(props) => props.theme.fonts.sizes.small};
//   @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
//     max-width: 7.2rem;
//     padding: 0 0.25rem 0 0;
//     font-size: ${(props) => props.theme.fonts.sizes.xSmall};
//   }
// `

const BuilderGroupWarningView = styled('div')`
  min-width: 9.2rem;
  padding: 0 1rem;
  border-width: 0.1rem;
  border-style: solid;
  color: ${(props) =>
    props.belowMin ? props.theme.colors.alert : props.theme.colors.secondary};
  border-color: ${(props) =>
    props.belowMin ? props.theme.colors.alert : props.theme.border.color};
  background-color: ${(props) =>
    props.belowMin ? props.theme.bgColors.alert : props.theme.bgColors.primary};
  border-radius: ${(props) => props.theme.border.radiusSmall};
  font-size: ${(props) => props.theme.fonts.sizes.small};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    text-align: center;
    min-width: 9.2rem;
    padding: 0 0.5rem;
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }
`

const BuilderGroupQuantity = styled('span')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.8rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    height: 2.6rem;
  }

  span {
    display: block;
  }

  span + span {
    margin-left: 0.7rem;
  }
`

// const BuildGroupAlert = styled('span')`
//   width: 2rem;
//   height: 2rem;
//   margin: 0 0 0 0.3rem;
//   line-height: 2rem;
//   border-radius: 1rem;
//   text-align: center;
//   color: ${(props) => props.theme.colors.light};
//   background-color: ${(props) => props.theme.colors.error};
//   border-color: ${(props) => props.theme.colors.light};
// `

const BuilderGroupWarning = ({ quantity, min, max }) => {
  const belowMin = quantity < min
  return (
    <BuilderGroupWarningContainer>
      {/* {included !== 0 && max !== 1 && (
        <BuilderGroupIncluded remaining={quantity < included}>
          ({included} included)
        </BuilderGroupIncluded>
      )} */}
      <BuilderGroupWarningView belowMin={belowMin}>
        {belowMin ? (
          <BuilderGroupQuantity>
            <span>Select {min - quantity}</span>
          </BuilderGroupQuantity>
        ) : (
          <BuilderGroupQuantity>
            <span>
              {quantity}
              {max ? `/${max}` : ''} Selected
            </span>
          </BuilderGroupQuantity>
        )}
      </BuilderGroupWarningView>
    </BuilderGroupWarningContainer>
  )
}

BuilderGroupWarning.displayName = 'BuilderGroupWarning'
BuilderGroupWarning.propTypes = {
  quantity: propTypes.number,
  included: propTypes.number,
  min: propTypes.number,
  max: propTypes.number,
}

export default BuilderGroupWarning
