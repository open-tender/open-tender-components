import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { BgImage } from '..'
import { useImage } from '../hooks'

const BuilderImageView = styled('div')`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 24rem;
  background-color: ${(props) => props.theme.bgColors.tertiary};
`

const BuilderImageLoading = styled('div')`
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const BuilderBackgroundImage = styled(BgImage)`
  width: 100%;
  height: 100%;
  opacity: 1;
  animation: fade-in 0.25s ease-in-out 0s forwards;
`

const BuilderImage = ({ imageUrl, spinner }) => {
  const { hasLoaded, hasError } = useImage(imageUrl)
  const isLoading = !hasLoaded && !hasError
  const bgStyle = imageUrl ? { backgroundImage: `url(${imageUrl}` } : null

  return (
    <BuilderImageView>
      {spinner && isLoading && (
        <BuilderImageLoading>{spinner}</BuilderImageLoading>
      )}
      {hasLoaded && (
        <BuilderBackgroundImage style={bgStyle}>&nbsp;</BuilderBackgroundImage>
      )}
    </BuilderImageView>
  )
}

BuilderImage.displayName = 'BuilderImage'
BuilderImage.propTypes = {
  imageUrl: propTypes.string,
  spinner: propTypes.oneOfType([propTypes.node, propTypes.element]),
}

export default BuilderImage
