import styled from '@emotion/styled'

const Message = styled('span')`
  display: inline-block;
  padding: 1em 1em;
  ${({ theme, color = 'secondary' }) => `
    line-height: ${theme.lineHeight};
    border-radius: ${theme.border.radiusSmall};
    color: ${theme.colors[color]};
    background-color: ${theme.bgColors[color]};
  `}
`

export default Message
