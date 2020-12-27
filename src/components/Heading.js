import styled from '@emotion/styled'

const Heading = styled('span')`
  font-family: ${(props) => props.theme.fonts.headings.family};
  font-weight: ${(props) => props.theme.fonts.headings.weight};
  letter-spacing: ${(props) => props.theme.fonts.headings.letterSpacing};
  text-transform: ${(props) => props.theme.fonts.headings.textTransform};
  -webkit-font-smoothing: ${(props) =>
    props.theme.fonts.headings.fontSmoothing};
  color: ${(props) => props.theme.fonts.headings.color};
`

export default Heading
