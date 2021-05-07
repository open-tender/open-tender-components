import React from 'react'
import styled from '@emotion/styled'
import propTypes from 'prop-types'

const PointsView = styled('span')`
  display: block;
  height: 2em;
  padding: 0 1em;
  border-radius: 1em;
  line-height: 1;
  font-size: ${(props) => props.theme.fonts.sizes[props.size]};
  background-color: ${(props) => props.theme.bgColors.tertiary};

  & > span {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    span {
      margin: 0;
    }

    span + span {
      margin: 0 0 0 0.4rem;
    }
  }
`

const PointsTitle = styled('span')`
  display: block;
  color: ${(props) => props.theme.colors.primary};
`

const PointsIcon = styled('span')`
  display: block;
  width: ${(props) => props.theme.fonts.sizes[props.size]};
  height: ${(props) => props.theme.fonts.sizes[props.size]};
  color: ${(props) => props.theme.colors.primary};
`

const Points = ({ points, icon, size = 'small' }) => {
  return (
    <PointsView size={size}>
      <span>
        <PointsTitle>{points}</PointsTitle>
        <PointsIcon size={size}>{icon}</PointsIcon>
      </span>
    </PointsView>
  )
}

Points.displayName = 'Points'
Points.propTypes = {
  points: propTypes.number,
  icon: propTypes.element,
  size: propTypes.string,
}

export default Points
