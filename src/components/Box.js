import styled from '@emotion/styled'

const Box = styled('div')`
  border-style: solid;
  border-width: ${(props) => props.theme.border.width};
  border-color: ${(props) => props.theme.border.color};
  border-radius: ${(props) => props.theme.border.radius};
  background-color: ${(props) => props.theme.bgColors.primary};
  box-shadow: ${(props) => props.theme.boxShadow.outer};
`

export default Box
