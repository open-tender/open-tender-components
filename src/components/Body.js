import styled from '@emotion/styled'

const Body = styled.span`
  ${({ theme, size }) => `
    font-family: ${theme.fonts.body.family};
    font-weight: ${theme.fonts.body.weight};
    letter-spacing: ${theme.fonts.body.letterSpacing};
    line-height: ${theme.fonts.body.lineHeight};
    text-transform: ${theme.fonts.body.textTransform};
    -webkit-font-smoothing: ${theme.fonts.body.fontSmoothing};
    color: ${theme.fonts.body.color};
    ${size ? `font-size: ${theme.fonts.sizes[size]};` : ''}
  `}
`

export default Body
