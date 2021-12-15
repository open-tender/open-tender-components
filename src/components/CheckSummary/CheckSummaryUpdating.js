import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

const CheckSummaryUpdatingView = styled('div')`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  // background-color: ${(props) => props.theme.overlay.light};

  > div {
    padding: 1.5rem 1.5rem 0.8rem;
    text-align: center;

    span {
      display: inline-block;
      padding-top: 1rem;
      font-size: ${(props) => props.theme.fonts.sizes.small};
      color: ${(props) => props.theme.colors.primary};
    }
  }
`

const CheckSummaryUpdating = ({ loader = null }) => (
  <CheckSummaryUpdatingView>
    <div>
      {loader}
      <span>Updating...</span>
    </div>
  </CheckSummaryUpdatingView>
)

CheckSummaryUpdating.displayName = 'CheckSummaryUpdating'
CheckSummaryUpdating.propTypes = {
  loader: propTypes.element,
}

export default CheckSummaryUpdating
