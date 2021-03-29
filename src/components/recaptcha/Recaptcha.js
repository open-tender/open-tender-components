import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

const RecaptchaView = styled('div')`
  margin: 2rem 0;
`

const Recaptcha = ({ siteKey }) => {
  if (!siteKey) return null
  return (
    <RecaptchaView>
      <div className="g-recaptcha" data-sitekey={siteKey} />
    </RecaptchaView>
  )
}

Recaptcha.displayName = 'Recaptcha'
Recaptcha.propTypes = {
  siteKey: propTypes.string,
}

export default Recaptcha
