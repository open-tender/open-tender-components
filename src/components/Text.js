import styled from '@emotion/styled'

const Text = styled('span')`
  ${({ theme, color, size, bold }) => `
    ${color ? `color: ${theme.colors[color]};` : ''}
    ${size ? `font-size: ${theme.fonts.sizes[size]};` : ''}
    ${bold ? `font-weight: ${theme.boldWeight};` : ''}
  `}
`

export default Text
