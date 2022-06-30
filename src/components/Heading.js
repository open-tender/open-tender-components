import styled from '@emotion/styled'

const Heading = styled.span`
  ${({ theme, size }) => `
    font-family: ${theme.fonts.headings.family};
    font-weight: ${theme.fonts.headings.weight};
    letter-spacing: ${theme.fonts.headings.letterSpacing};
    line-height: ${theme.fonts.headings.lineHeight};
    text-transform: ${theme.fonts.headings.textTransform};
    -webkit-font-smoothing: ${theme.fonts.headings.fontSmoothing};
    color: ${theme.fonts.headings.color};
    ${size ? `font-size: ${theme.fonts.sizes[size]}` : ''}
  `}
`

export default Heading
