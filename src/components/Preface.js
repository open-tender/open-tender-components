import styled from '@emotion/styled'

const Preface = styled.span`
  ${({ theme, size, color }) => `
  font-family: ${theme.fonts.preface.family};
  font-weight: ${theme.fonts.preface.weight};
  font-style: ${theme.fonts.preface.fontStyle};
  letter-spacing: ${theme.fonts.preface.letterSpacing};
  line-height: ${theme.fonts.preface.lineHeight};
  text-transform: ${theme.fonts.preface.textTransform};
  -webkit-font-smoothing: ${theme.fonts.preface.fontSmoothing};
  font-size: ${size ? theme.fonts.sizes[size] : theme.fonts.preface.fontSize};
  color: ${theme.colors[color || 'tertiary']};
  `}
`

export default Preface
