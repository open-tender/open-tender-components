import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import Heading from '../Heading'

const CheckTitleView = styled('div')`
  padding: 0 0 0.5rem;
  // border-bottom-width: ${(props) => props.theme.border.width};
  border-bottom-width: 0.1rem;
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

const CheckTitlePoints = styled('span')`
  display: block;
  font-size: ${(props) => props.theme.fonts.sizes.small};
  color: ${(props) => props.theme.colors.secondary};
  line-height: 1;

  span {
    position: relative;
    top: 0.2rem;
    display: inline-block;
    margin: 0 0 0 0.2rem;
    width: ${(props) => props.theme.fonts.sizes.small};
    height: ${(props) => props.theme.fonts.sizes.small};
    color: ${(props) => props.theme.colors.secondary};
  }
`

const CheckTitle = ({ title, orderId, points, icon }) => {
  const { remaining } = points || {}
  return (
    <CheckTitleView>
      <p>
        <Heading>{title}</Heading>
      </p>
      {remaining ? (
        <CheckTitlePoints>
          {remaining}
          <span>{icon}</span> available
        </CheckTitlePoints>
      ) : orderId ? (
        <p>editing order {orderId}</p>
      ) : null}
    </CheckTitleView>
  )
}

CheckTitle.displayName = 'CheckTitle'
CheckTitle.propTypes = {
  title: propTypes.string,
  orderId: propTypes.oneOfType([propTypes.string, propTypes.number]),
  points: propTypes.object,
  icon: propTypes.element,
}

export default CheckTitle
