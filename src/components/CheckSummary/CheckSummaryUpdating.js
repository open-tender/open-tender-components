import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

const CheckSummaryUpdatingText = styled.span`
  display: inline-block;
  padding-top: 1rem;
  font-size: ${(props) => props.theme.fonts.sizes.small};
  color: ${(props) => props.theme.colors.primary};
`

const CheckSummaryUpdatingView = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    padding: 1.5rem 1.5rem 0.8rem;
    text-align: center;
  }
`

const CheckSummaryUpdating = ({ loader = null }) => (
  <CheckSummaryUpdatingView>
    <div>
      {loader}
      <CheckSummaryUpdatingText>Updating...</CheckSummaryUpdatingText>
    </div>
  </CheckSummaryUpdatingView>
)

CheckSummaryUpdating.displayName = 'CheckSummaryUpdating'
CheckSummaryUpdating.propTypes = {
  loader: propTypes.element,
}

export default CheckSummaryUpdating
