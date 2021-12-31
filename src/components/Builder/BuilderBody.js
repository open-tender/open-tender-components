import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Heading } from '..'
import BuilderGroupHeader from './BuilderGroupHeader'
import BuilderRadioGroup from './BuilderRadioGroup'

const BuilderBodyView = styled('div')`
  padding: 0 ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: ${(props) => props.theme.layout.paddingMobile};
    padding-bottom: 0;
  }
`

const BuilderMadeFor = styled('div')`
  width: 100%;
  padding: 0 0 2rem;
  margin: -1rem 0 0;
  border-radius: ${(props) => props.theme.border.radius};
  background-color: ${(props) => props.theme.bgColors.primary};

  label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0;

    span {
      display: block;
    }

    input {
      display: block;
      width: 15rem;
      padding: 1rem 1.3rem;
      font-size: 1.2rem;
      text-align: center;
    }
  }
`

const BuilderGroup = styled('div')`
  margin: 0 0 3rem;
`

const BuilderOptions = styled('div')`
  width: 100%;
  border-radius: ${(props) => props.theme.border.radius};
  background-color: ${(props) => props.theme.bgColors.primary};
`

const BuilderNotes = styled('div')`
  width: 100%;
  padding: 0 0 1.5rem;
  border-radius: ${(props) => props.theme.border.radius};
  background-color: ${(props) => props.theme.bgColors.primary};

  span {
    display: block;
    margin-bottom: 0.8rem;
    line-height: 1;
  }

  textarea {
    height: 7.3rem;
    padding: 1rem 1.3rem;
    font-size: 1.2rem;
  }
`

const BuilderBody = ({
  allergens,
  renderOption,
  iconMap,
  displaySettings,
  cartId,
  item,
  setMadeFor,
  setNotes,
  toggleOption,
  incrementOption,
  decrementOption,
  setOptionQuantity,
}) => {
  const { groups, notes, madeFor } = item
  const { madeFor: showMadeFor, notes: showNotes } = displaySettings
  return (
    <BuilderBodyView>
      {showMadeFor && !cartId && (
        <BuilderMadeFor>
          <label htmlFor="made-for">
            <Heading size="h6">{"Who's"} it for?</Heading>
            <input
              id="made-for"
              type="text"
              value={madeFor || ''}
              placeholder="enter name (optional)"
              onChange={(evt) => setMadeFor(evt.target.value)}
            />
          </label>
        </BuilderMadeFor>
      )}
      <div>
        {groups.map((group) => (
          <BuilderGroup key={group.id}>
            <BuilderGroupHeader group={group} />
            <BuilderOptions>
              {group.min === 1 && group.max === 1 ? (
                <BuilderRadioGroup
                  group={group}
                  handler={toggleOption}
                  displaySettings={displaySettings}
                />
              ) : (
                group.options.map((option) => {
                  const optionProps = {
                    key: `${group.id}-${option.id}`,
                    group,
                    option,
                    adjust: (quantity) =>
                      setOptionQuantity(group.id, option.id, quantity),
                    increment: () => incrementOption(group.id, option.id),
                    decrement: () => decrementOption(group.id, option.id),
                    allergens,
                    iconMap,
                    displaySettings,
                  }
                  return renderOption(optionProps)
                })
              )}
            </BuilderOptions>
          </BuilderGroup>
        ))}
      </div>
      {showNotes && (
        <BuilderNotes>
          <label htmlFor="item-notes">
            <Heading size="h6">Notes</Heading>
            <textarea
              id="item-notes"
              value={notes || ''}
              onChange={(evt) => setNotes(evt.target.value)}
            />
          </label>
        </BuilderNotes>
      )}
    </BuilderBodyView>
  )
}

BuilderBody.displayName = 'BuilderBody'
BuilderBody.propTypes = {
  allergens: propTypes.array,
  renderOption: propTypes.func,
  iconMap: propTypes.object,
  displaySettings: propTypes.object,
  cartId: propTypes.number,
  item: propTypes.object,
  setMadeFor: propTypes.func,
  setNotes: propTypes.func,
  toggleOption: propTypes.func,
  incrementOption: propTypes.func,
  decrementOption: propTypes.func,
  setOptionQuantity: propTypes.func,
}

export default BuilderBody
