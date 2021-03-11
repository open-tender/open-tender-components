import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { isString } from '@open-tender/js'
import { Heading } from '..'

export const FormLegendView = styled('legend')`
  margin: 0 0 2rem;
`

const FormLegendTitle = styled('p')`
  line-height: 1;
  margin: 0 0 0 -0.1rem;
`

const FormLegendSubtitle = styled('p')`
  margin: 0.5rem 0 0;
  line-height: ${(props) => props.theme.lineHeight};
  font-size: ${(props) => props.theme.fonts.sizes.small};
`

const FormLegend = ({ title, subtitle, as = 'legend' }) => {
  const legendTitle =
    title && isString(title) ? <Heading size="h3">{title}</Heading> : title
  return (
    <FormLegendView as={as}>
      {legendTitle && <FormLegendTitle>{legendTitle}</FormLegendTitle>}
      {subtitle && <FormLegendSubtitle>{subtitle}</FormLegendSubtitle>}
    </FormLegendView>
  )
}

FormLegend.displayName = 'FormLegend'
FormLegend.propTypes = {
  title: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
    propTypes.string,
    propTypes.object,
  ]),
  subtitle: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
    propTypes.string,
    propTypes.object,
  ]),
  as: propTypes.string,
}

export default FormLegend
