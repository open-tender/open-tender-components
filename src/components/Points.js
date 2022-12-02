import React from 'react'
import styled from '@emotion/styled'
import propTypes from 'prop-types'

const PointsView = styled.span`
  display: block;
  height: 2em;
  padding: 0 1em;
  border-radius: 1em;
  line-height: 1;
  font-size: ${(props) => props.theme.fonts.sizes[props.size]};
  background-color: ${(props) => props.theme.bgColors[props.bgColor]};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes[props.sizeMobile]};
  }

  & > span {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
`

const PointsTitle = styled.span`
  display: block;
  color: ${(props) => props.theme.colors[props.color]};
  font-weight: ${(props) => props.theme.boldWeight};
  line-height: 1;
  margin: 0.1rem 0 0;
`

const PointsIcon = styled.span`
  display: block;
  width: ${(props) => props.theme.fonts.sizes[props.size]};
  height: ${(props) => props.theme.fonts.sizes[props.size]};
  color: ${(props) => props.theme.colors[props.color]};
  margin: 0 0 0 0.4rem;
`

const Points = ({
  points,
  icon,
  size = 'small',
  sizeMobile = 'xSmall',
  color = 'primary',
  bgColor = 'tertiary',
}) => {
  return (
    <PointsView size={size} sizeMobile={sizeMobile} bgColor={bgColor}>
      <span>
        <PointsTitle color={color}>{points}</PointsTitle>
        <PointsIcon size={size} color={color}>
          {icon}
        </PointsIcon>
      </span>
    </PointsView>
  )
}

Points.displayName = 'Points'
Points.propTypes = {
  points: propTypes.number,
  icon: propTypes.element,
  size: propTypes.string,
  sizeMobile: propTypes.string,
  color: propTypes.string,
  bgColor: propTypes.string,
}

export default Points
