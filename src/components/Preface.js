import styled from '@emotion/styled'

const Preface = styled('span')`
  font-family: ${(props) => props.theme.fonts.preface.family};
  font-weight: ${(props) => props.theme.fonts.preface.weight};
  letter-spacing: ${(props) => props.theme.fonts.preface.letterSpacing};
  text-transform: ${(props) => props.theme.fonts.preface.textTransform};
  -webkit-font-smoothing: ${(props) => props.theme.fonts.preface.fontSmoothing};
  font-size: ${(props) =>
    props.size
      ? props.theme.fonts.sizes[props.size]
      : props.theme.fonts.preface.fontSize};
  color: ${(props) => props.theme.colors[props.color || 'tertiary']};
`

export default Preface
