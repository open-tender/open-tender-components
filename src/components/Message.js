import styled from '@emotion/styled'

const Message = styled('span')`
  display: inline-block;
  ${({ theme, color = 'secondary', size = 'main' }) => `
    padding: ${size === 'small' ? '0.75em 1.5rem' : '1em 1em'};
    line-height: ${theme.lineHeight};
    border-radius: ${theme.border.radiusSmall};
    color: ${theme.colors[color]};
    background-color: ${theme.bgColors[color]};
    font-size: ${theme.fonts.sizes[size]};
  `}
`

export default Message
