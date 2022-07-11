import React, { useState } from 'react'
import propTypes from 'prop-types'
import { displayPrice, makeModifierNames } from '@open-tender/js'
import { BuilderNutrition, BuilderIngredients } from './Builder'
import styled from '@emotion/styled'
import { BgImage, ButtonLink } from '.'

const BuilderOptionOverlay = styled('div')`
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: ${(props) => props.theme.border.radiusSmall};
  background-color: ${(props) => props.theme.overlay[props.overlay]};

  p {
    font-weight: bold;
    text-transform: uppercase;
    color: ${(props) => props.theme.colors.light};
    font-size: ${(props) => props.theme.fonts.sizes.main};
  }
`

const BuilderOptionOverlayAlert = styled('div')`
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 1.2rem;
  padding: 0.3rem 0.2rem 0.4rem;
  text-align: center;
  border-style: solid;
  border-width: ${(props) => props.theme.border.width};
  border-color: ${(props) => props.theme.colors.light};
  color: ${(props) => props.theme.colors.light};
`

const BuilderOption = styled('span')`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1.5rem 0;
  border-bottom-style: solid;
  border-bottom-width: ${(props) => props.theme.border.width};
  border-bottom-color: ${(props) => props.theme.border.color};

  &:last-of-type {
    border: 0;
  }
`

const BuilderOptionImage = styled(BgImage)`
  position: relative;
  width: 6rem;
  min-width: 6rem;
  height: 6rem;
  background-color: ${(props) => props.theme.bgColors.tertiary};
  border-radius: ${(props) => props.theme.border.radiusSmall};
`

const BuilderOptionInfo = styled('span')`
  display: block;
  flex-grow: 1;
  line-height: 1.3;
  padding: 0 1.75rem;
  ${(props) => (!props.showImage ? 'padding-left: 0;' : null)};

  > span {
    display: block;
    ${(props) => (props.isSoldOut ? 'opacity: 0.5;' : null)};
  }
`

const BuilderOptionName = styled('span')`
  font-size: ${(props) => props.theme.fonts.sizes.small};
  font-weight: ${(props) => props.theme.boldWeight};
  color: ${(props) => props.theme.colors.primary};
`

const BuilderOptionSoldOut = styled('span')`
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.error};
  padding: 0 0 0 1rem;
`

const BuilderOptionDescription = styled('span')`
  margin-top: 0.2rem;
  font-size: ${(props) => props.theme.fonts.sizes.xSmall};
`

const BuilderOptionMadeFor = styled('span')`
  margin-top: 0.2rem;
  font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  color: ${(props) => props.theme.colors.primary};
`

const BuilderOptionDetails = styled('span')`
  margin-top: 0.6rem;
  font-size: ${(props) => props.theme.fonts.sizes.small};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }
`

const BuilderOptionDetailsContainer = styled('span')`
  display: flex;
  align-items: flex-end;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex-wrap: wrap;
  }

  span {
    display: block;
  }

  span + span {
    padding-left: 1rem;
  }

}
`

const BuilderOptionDetailsPrice = styled('span')`
  font-weight: ${(props) => props.theme.boldWeight};
  color: ${(props) => props.theme.colors.primary};
`

const BuilderOptionDetailsTag = styled('span')`
  font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  color: ${(props) => props.theme.colors[props.color || 'secondary']};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 100% !important;
    flex-shrink: 0 !important;
    padding: 0.5rem 0 0 !important;
  }
`

const BuilderOptionNutrition = styled('span')`
  display: block;
  margin: 0;

  & > span,
  button > span {
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }
`

const SoldOutOverlay = () => (
  <BuilderOptionOverlay overlay="dark">
    <div>
      <p>Sold Out</p>
    </div>
  </BuilderOptionOverlay>
)

const AllergenOverlay = () => (
  <BuilderOptionOverlay overlay="alert">
    <div>
      <BuilderOptionOverlayAlert>
        <span>!</span>
      </BuilderOptionOverlayAlert>
    </div>
  </BuilderOptionOverlay>
)

const CartItem = ({
  item,
  allergens = [],
  showModifiers,
  editItem,
  removeItem,
  displaySettings,
  hidePrice = false,
  children,
}) => {
  const [showInfo, setShowInfo] = useState(false)
  const [showIngredients, setShowIngredients] = useState(false)
  const {
    calories: showCals,
    tags: showTags,
    allergens: showAllergens,
    modifierImage: showImage = true,
    modifierDescription: showDescription = true,
  } = displaySettings
  const hasCals = showCals && item.cals
  const hasIngredients = item.ingredients && item.ingredients.length > 0
  const bgStyle = item.imageUrl
    ? { backgroundImage: `url(${item.imageUrl}` }
    : null
  const desc = showModifiers
    ? makeModifierNames(item)
    : showDescription && item.description
  const price = editItem || showModifiers ? item.totalPrice : item.price
  const madeFor = editItem || showModifiers ? item.madeFor : null
  const itemAllergens = item.allergens.length
    ? item.allergens.filter((allergen) => allergens.includes(allergen))
    : []
  const allergenAlert = itemAllergens.length > 0

  const toggleShowInfo = () => {
    if (showIngredients) setShowIngredients(false)
    setShowInfo(!showInfo)
  }

  const toggleShowIngredients = () => {
    if (showInfo) setShowInfo(false)
    setShowIngredients(!showIngredients)
  }

  return (
    <>
      <BuilderOption>
        {showImage && (
          <BuilderOptionImage as="span" style={bgStyle}>
            {item.isSoldOut ? (
              <SoldOutOverlay />
            ) : allergenAlert ? (
              <AllergenOverlay />
            ) : null}
          </BuilderOptionImage>
        )}
        <BuilderOptionInfo showImage={showImage} isSoldOut={item.isSoldOut}>
          <BuilderOptionName>
            {item.name}
            {!editItem && !showImage && item.isSoldOut && (
              <BuilderOptionSoldOut>Sold Out</BuilderOptionSoldOut>
            )}
          </BuilderOptionName>
          {desc && <BuilderOptionDescription>{desc}</BuilderOptionDescription>}
          {madeFor && (
            <BuilderOptionMadeFor>
              For <span>{madeFor}</span>
            </BuilderOptionMadeFor>
          )}
          <BuilderOptionDetails>
            <BuilderOptionDetailsContainer>
              {!hidePrice && (
                <BuilderOptionDetailsPrice>
                  ${displayPrice(price)}
                </BuilderOptionDetailsPrice>
              )}
              {editItem ? (
                <>
                  <span>
                    <ButtonLink onClick={editItem}>edit</ButtonLink>
                  </span>
                  <span>
                    <ButtonLink onClick={removeItem}>remove</ButtonLink>
                  </span>
                </>
              ) : (
                <>
                  {showCals && item.cals ? <span>{item.cals} cal</span> : null}
                  {showAllergens && item.allergens.length > 0 && (
                    <BuilderOptionDetailsTag color="alert">
                      {item.allergens.join(', ')}
                    </BuilderOptionDetailsTag>
                  )}
                  {showTags && item.tags.length > 0 && (
                    <BuilderOptionDetailsTag>
                      {item.tags.join(', ')}
                    </BuilderOptionDetailsTag>
                  )}
                </>
              )}
            </BuilderOptionDetailsContainer>
          </BuilderOptionDetails>
          {!editItem && (hasCals || hasIngredients) && (
            <BuilderOptionNutrition>
              {hasCals && (
                <ButtonLink onClick={toggleShowInfo}>
                  <span>{!showInfo ? 'show' : 'hide'} nutritional info</span>
                </ButtonLink>
              )}
              {hasCals && hasIngredients ? <span>{' | '}</span> : null}
              {hasIngredients && (
                <ButtonLink onClick={toggleShowIngredients}>
                  <span>{!showIngredients ? 'show' : 'hide'} ingredients</span>
                </ButtonLink>
              )}
            </BuilderOptionNutrition>
          )}
        </BuilderOptionInfo>
        <span>{children}</span>
      </BuilderOption>
      {showCals && (
        <BuilderNutrition
          nutritionalInfo={item.nutritionalInfo}
          show={showInfo}
        />
      )}
      {hasIngredients && (
        <BuilderIngredients
          ingredients={item.ingredients}
          show={showIngredients}
        />
      )}
    </>
  )
}

CartItem.displayName = 'CartItem'
CartItem.propTypes = {
  item: propTypes.object,
  allergens: propTypes.array,
  showModifiers: propTypes.bool,
  editItem: propTypes.func,
  removeItem: propTypes.func,
  displaySettings: propTypes.object,
  hidePrice: propTypes.bool,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default CartItem
