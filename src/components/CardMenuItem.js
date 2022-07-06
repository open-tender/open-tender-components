import styled from '@emotion/styled'

const CardMenuItem = styled.div`
  border-style: solid;
  border-width: ${(props) => props.theme.cards.menuItem.borderWidth};
  border-color: ${(props) => props.theme.cards.menuItem.borderColor};
  border-radius: ${(props) => props.theme.cards.menuItem.borderRadius};
  background-color: ${(props) => props.theme.cards.menuItem.bgColor};
  box-shadow: ${(props) => props.theme.cards.menuItem.boxShadow};
`

export default CardMenuItem
