import styled from '@emotion/styled'

const Headline = styled.span`
  ${({ theme, size }) => `
    font-family: ${theme.fonts.headline.family};
    font-weight: ${theme.fonts.headline.weight};
    letter-spacing: ${theme.fonts.headline.letterSpacing};
    line-height: ${theme.fonts.headline.lineHeight};
    text-transform: ${theme.fonts.headline.textTransform};
    -webkit-font-smoothing: ${theme.fonts.headline.fontSmoothing};
    color: ${theme.fonts.headline.color};
    ${size ? `font-size: ${theme.fonts.sizes[size]}` : ''}
  `}
`

export default Headline
