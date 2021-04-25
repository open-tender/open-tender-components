import React from 'react'
import styled from '@emotion/styled'
import propTypes from 'prop-types'

const PointsView = styled('button')`
  display: inline-block;
  height: 2em;
  padding: 0 1em;
  border-radius: 1em;
  font-size: ${(props) => props.theme.fonts.sizes[props.size]};
  color: ${(props) =>
    props.theme.buttons.colors[`${props.color}${props.applied ? 'Hover' : ''}`]
      .color};
  background-color: ${(props) =>
    props.theme.buttons.colors[`${props.color}${props.applied ? 'Hover' : ''}`]
      .bgColor};
  border-color: ${(props) =>
    props.theme.buttons.colors[`${props.color}${props.applied ? 'Hover' : ''}`]
      .borderColor};

  &:hover:enabled,
  &:active:enabled {
    color: ${(props) =>
      props.theme.buttons.colors[
        `${props.color}${props.applied ? '' : 'Hover'}`
      ].color};
    background-color: ${(props) =>
      props.theme.buttons.colors[
        `${props.color}${props.applied ? '' : 'Hover'}`
      ].bgColor};
    border-color: ${(props) =>
      props.theme.buttons.colors[
        `${props.color}${props.applied ? '' : 'Hover'}`
      ].borderColor};
  }

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
  color: ${(props) => props.theme.colors.light};
`

const PointsIcon = styled('span')`
  display: block;
  width: ${(props) => props.theme.fonts.sizes[props.size]};
  height: ${(props) => props.theme.fonts.sizes[props.size]};
  color: ${(props) => props.theme.colors.light};
`

const Points = ({
  points,
  icon,
  color = 'primary',
  size = 'small',
  onClick = null,
  applied = false,
  style = null,
}) => {
  return (
    <PointsView
      onClick={onClick}
      disabled={onClick ? false : true}
      color={color}
      size={size}
      applied={applied}
      style={style}
    >
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
  color: propTypes.string,
  size: propTypes.string,
  onClick: propTypes.func,
  applied: propTypes.bool,
  style: propTypes.object,
}

export default Points
