import styled from '@emotion/styled'

const Box = styled.div`
  label: Card;
  border-style: solid;
  border-width: ${(props) => props.theme.cards.default.borderWidth};
  border-color: ${(props) => props.theme.cards.default.borderColor};
  border-radius: ${(props) => props.theme.cards.default.borderRadius};
  background-color: ${(props) => props.theme.cards.default.bgColor};
  box-shadow: ${(props) => props.theme.cards.default.boxShadow};

  div,
  p,
  p:first-of-type,
  p > span,
  p > span > span,
  div > span {
    ${(props) =>
      props.theme.cards.default.overrideFontColors
        ? `color: ${props.theme.cards.default.textColor};`
        : ''};
  }

  div.title,
  p.title,
  p:first-of-type.title,
  p > span.title,
  div > span.title {
    ${(props) =>
      props.theme.cards.default.overrideFontColors
        ? `color: ${props.theme.cards.default.titleColor};`
        : ''};
  }
`

export default Box
