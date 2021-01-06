import React from 'react'
import styled from '@emotion/styled'
import { Checkmark } from '..'

const FormAppliedView = styled('span')`
  display: inline-block;
  margin: 0 1rem 0 0;
`

const FormApplied = () => {
  return (
    <FormAppliedView>
      <Checkmark />
    </FormAppliedView>
  )
}

export default FormApplied
