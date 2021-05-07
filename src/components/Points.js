import React from 'react'
import styled from '@emotion/styled'
import propTypes from 'prop-types'

const PointsView = styled('span')`
  display: block;
  height: 2.6rem;
  padding: 0 1.2rem 0 1.3rem;
  border-radius: 1em;
  line-height: 1;
  background-color: ${(props) => props.theme.bgColors.tertiary};
  font-size: ${(props) => props.theme.fonts.sizes.small};

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
  width: 1.5rem;
  height: 1.5rem;
  color: ${(props) => props.theme.colors.primary};
`

const Points = ({ points, icon }) => {
  return (
    <PointsView>
      <span>
        <PointsTitle>{points}</PointsTitle>
        <PointsIcon>{icon}</PointsIcon>
      </span>
    </PointsView>
  )
}

Points.displayName = 'Points'
Points.propTypes = {
  points: propTypes.number,
  icon: propTypes.element,
}

export default Points
