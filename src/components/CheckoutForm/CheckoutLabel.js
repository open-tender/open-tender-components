import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

const CheckoutLabelView = styled('span')`
  padding-right: ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding-right: ${(props) => props.theme.layout.paddingMobile};
  }

  > span {
    display: block;

    &:first-of-type {
      margin: 0 0 0.4rem;
      font-size: ${(props) => props.theme.fonts.sizes.main};
      color: ${(props) => props.theme.colors.primary};
    }
  }

  span + span {
    margin-top: 0;
    line-height: ${(props) => props.theme.lineHeight};
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

const CheckoutLabel = ({ title, description, alert = null }) => (
  <CheckoutLabelView>
    <span>{title}</span>
    <span>{description}</span>
    {alert && <span>{alert}</span>}
  </CheckoutLabelView>
)

CheckoutLabel.displayName = 'CheckoutLabel'
CheckoutLabel.propTypes = {
  title: propTypes.string,
  description: propTypes.string,
  alert: propTypes.oneOfType([propTypes.string, propTypes.element]),
}

export default CheckoutLabel
