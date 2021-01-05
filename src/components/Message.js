import styled from '@emotion/styled'

const Message = styled('span')`
  display: inline-block;
  padding: 1em 1em;
  ${({ theme, color = 'secondary', size = 'main' }) => `
    line-height: ${theme.lineHeight};
    border-radius: ${theme.border.radiusSmall};
    color: ${theme.colors[color]};
    color: ${theme.colors[color]};
    background-color: ${theme.bgColors[color]};
    font-size: ${theme.fonts.sizes[size]};
  `}
`

export default Message
