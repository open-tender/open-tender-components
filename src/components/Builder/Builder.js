import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { displayPrice } from '@open-tender/js'
import { ButtonStyled, Heading, Text } from '..'
import useBuilder from './useBuilder'
import BuilderGroupHeader from './BuilderGroupHeader'
import BuilderRadioGroup from './BuilderRadioGroup'
import BuilderQuantity from './BuilderQuantity'

const footerHeight = '8rem'
const footerHeightMobile = '7rem'

const BuilderView = styled('form')`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  padding: 0 0 ${footerHeight};
  margin: 0;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0 0 ${footerHeightMobile};
  }
`

const BuilderContent = styled('div')`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`

const BuilderBody = styled('div')`
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

const BuilderFooter = styled('div')`
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${(props) => props.theme.bgColors.primary};
  height: ${footerHeight};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    height: ${footerHeightMobile};
  }
`

const BuilderFooterContainer = styled('div')`
  width: 100%;
  padding: 0 ${(props) => props.theme.layout.padding};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${footerHeight};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
    height: ${footerHeightMobile};
  }
`

const BuilderPrice = styled('div')`
  font-size: ${(props) => props.theme.fonts.sizes.h5};
  font-weight: ${(props) => props.theme.boldWeight};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 8rem;
  }

  span {
    display: inline-block;
  }

  span {
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      width: 100%;
      font-size: 1.6rem;
    }
  }

  span + span {
    font-weight: normal;
    margin: 0 0 0 2rem;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      margin: 0.25rem 0 0;
      font-size: 1.4rem;
    }
  }
`

const BuilderActions = styled('div')`
  display: flex;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex-grow: 1;
  }
`

const BuilderQuantityView = styled('div')`
  display: inline-block;
`

const BuilderSubmit = styled('div')`
  display: inline-block;
  margin: 0 0 0 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex-grow: 1;
    button {
      width: 100%;
    }
  }
`

const Builder = ({
  menuItem,
  soldOut,
  allergens,
  addItemToCart,
  renderHeader,
  renderOption,
  iconMap,
  displaySettings,
  cartId,
  spinner,
}) => {
  const {
    item,
    increment,
    decrement,
    setQuantity,
    setMadeFor,
    setNotes,
    toggleOption,
    incrementOption,
    decrementOption,
    setOptionQuantity,
  } = useBuilder(menuItem, soldOut)

  const { groups, notes, madeFor, totalPrice } = item

  const groupsBelowMin = groups.filter((g) => g.quantity < g.min).length > 0
  const isIncomplete =
    totalPrice === 0 || item.quantity === '' || groupsBelowMin

  return (
    <BuilderView>
      <BuilderContent>
        {renderHeader({ item, displaySettings, spinner })}
        <BuilderBody>
          {displaySettings.madeFor && !cartId && (
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
                    <ul>
                      {group.options.map((option) => {
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
                      })}
                    </ul>
                  )}
                </BuilderOptions>
              </BuilderGroup>
            ))}
          </div>
          {displaySettings.notes && (
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
        </BuilderBody>
      </BuilderContent>
      <BuilderFooter>
        <BuilderFooterContainer>
          <BuilderPrice>
            <Text color="primary">${displayPrice(totalPrice)}</Text>
            {item.cals && <span>{item.cals} cal</span>}
          </BuilderPrice>
          <BuilderActions>
            <BuilderQuantityView>
              <BuilderQuantity
                item={item}
                adjust={setQuantity}
                increment={increment}
                decrement={decrement}
                iconMap={iconMap}
              />
            </BuilderQuantityView>
            <BuilderSubmit>
              <ButtonStyled
                onClick={() => addItemToCart(item)}
                disabled={isIncomplete}
                size="big"
              >
                Add To Cart
              </ButtonStyled>
            </BuilderSubmit>
          </BuilderActions>
        </BuilderFooterContainer>
      </BuilderFooter>
    </BuilderView>
  )
}

Builder.displayName = 'Builder'
Builder.propTypes = {
  menuItem: propTypes.object,
  soldOut: propTypes.array,
  allergens: propTypes.array,
  addItemToCart: propTypes.func,
  renderHeader: propTypes.func,
  renderOption: propTypes.func,
  iconMap: propTypes.object,
  closeModal: propTypes.func,
  displaySettings: propTypes.object,
  cartId: propTypes.number,
  spinner: propTypes.oneOfType([propTypes.node, propTypes.element]),
}

export default Builder
