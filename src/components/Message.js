import styled from '@emotion/styled'

const Message = styled.span`
  display: inline-block;
  ${({ theme, color = 'secondary', size = 'main' }) => `
    padding: ${size === 'small' ? '0.6em 1.2rem' : '1em 1em'};
    border-radius: ${theme.border.radiusSmall};
    font-size: ${theme.fonts.sizes[size]};
    line-height: ${theme.lineHeight};
    color: ${theme[color].color};
    background-color: ${theme[color].bgColor};
  `}
`

export default Message
