import propTypes from 'prop-types'
import React from 'react'
import styled from '@emotion/styled'
import BuilderGroupWarning from './BuilderGroupWarning'

const BuilderGroupHeaderView = styled('div')`
  display: flex;
  margin: 0 0 1rem;
  justify-content: space-between;
  align-items: flex-end;
`

const BuilderGroupHeaderName = styled('h3')`
  margin-bottom: 0.5rem;
  font-size: ${(props) => props.theme.fonts.sizes.h6};
`

const BuilderGroupHeaderDescription = styled('p')`
  font-size: ${(props) => props.theme.fonts.sizes.small};
`

const BuilderGroupHeader = ({ group }) => {
  const { included, max } = group
  return (
    <BuilderGroupHeaderView>
      <div>
        <BuilderGroupHeaderName>
          {group.name}
          {included !== 0 && max !== 1 ? ` (${included} included)` : null}
        </BuilderGroupHeaderName>
        <BuilderGroupHeaderDescription>
          {group.description}
        </BuilderGroupHeaderDescription>
      </div>
      <BuilderGroupWarning {...group} />
    </BuilderGroupHeaderView>
  )
}

BuilderGroupHeader.displayName = 'BuilderGroupHeader'
BuilderGroupHeader.propTypes = {
  group: propTypes.object,
}

export default BuilderGroupHeader
