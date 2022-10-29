import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Preface } from '.'

const TagView = styled.span`
  position: relative;
  display: inline-block;
  padding: 0.4em 0.7em 0.3em;
  border-radius: 1.5rem;
  line-height: 0;
  font-size: ${(props) => props.fontSize || props.theme.fonts.sizes.xSmall};
  color: ${(props) => props.theme.colors[props.color]};
  background-color: ${(props) => props.theme.bgColors[props.bgColor]};
`

const TagContainer = styled.span`
  display: flex;
  align-items: center;
  line-height: 0;

  span {
    display: inline-block;
  }
`

const TagIcon = styled.span`
  position: relative;
  display: block;
  width: 1rem;
  height: 1rem;
  padding: 0;
  margin-right: 0.3em;
  flex-shrink: 0;
`

const TagText = styled(Preface)`
  display: block;
  color: ${(props) => props.theme.colors[props.color]};
  font-size: ${(props) => props.fontSize || props.theme.fonts.sizes.xSmall};
  line-height: 1.2;
`

const Tag = ({
  text,
  icon,
  fontSize,
  color = 'light',
  bgColor = 'tertiary',
  style = null,
}) => {
  return (
    <TagView color={color} bgColor={bgColor} style={style}>
      <TagContainer>
        {icon && <TagIcon>{icon}</TagIcon>}
        <TagText fontSize={fontSize} color={color}>
          {text}
        </TagText>
      </TagContainer>
    </TagView>
  )
}

Tag.displayName = 'Tag'
Tag.propTypes = {
  text: propTypes.string,
  icon: propTypes.string,
  fontSize: propTypes.string,
  color: propTypes.string,
  bgColor: propTypes.string,
  style: propTypes.object,
}
export default Tag
