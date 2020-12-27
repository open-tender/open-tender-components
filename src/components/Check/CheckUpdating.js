import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

const CheckUpdatingView = styled('div')`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.overlay.light};

  > div {
    padding: 1.5rem 1.5rem 0.8rem;
    text-align: center;

    span {
      display: inline-block;
      padding-top: 1rem;
      font-size: ${(props) => props.theme.fonts.sizes.small};
    }
  }
`

const CheckUpdating = ({ loader = null }) => (
  <CheckUpdatingView>
    <div>
      {loader}
      <span>Updating...</span>
    </div>
  </CheckUpdatingView>
)

CheckUpdating.displayName = 'CheckUpdating'
CheckUpdating.propTypes = {
  loader: propTypes.element,
}

export default CheckUpdating
