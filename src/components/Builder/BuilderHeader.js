import propTypes from 'prop-types'
import React, { useState } from 'react'
import styled from '@emotion/styled'
import { displayPrice } from '@open-tender/js'
import BuilderNutrition from './BuilderNutrition'
import BuilderIngredients from './BuilderIngredients'
import BuilderImage from './BuilderImage'
import { ButtonLink, Points } from '..'

const BuilderInfo = styled('div')`
  background-color: ${(props) => props.theme.bgColors.primary};
  padding: ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: ${(props) => props.theme.layout.paddingMobile};
  }
`

const BuilderName = styled('h2')`
  font-size: ${(props) => props.theme.fonts.sizes.h3};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.h4};
  }
`

const BuilderDetails = styled('div')`
  display: flex;
  align-items: baseline;
  margin: 0.5rem 0 1.5rem;
  flex-wrap: wrap;

  & > span {
    display: block;
    margin: 0 2rem 0 0;
    &:last-of-type {
      margin: 0;
    }
  }
`

const BuilderDetailsPrice = styled('span')`
  padding: 0.5rem 0;
  font-weight: ${(props) => props.theme.boldWeight};
  color: ${(props) => props.theme.colors.primary};
`

const BuilderDetailsCals = styled('span')`
  padding: 0.5rem 0;
  // font-weight: ${(props) => props.theme.boldWeight};
`

const BuilderDetailsAllergens = styled('span')`
  padding: 0.5rem 0;
  font-size: ${(props) => props.theme.fonts.sizes.small};
  color: ${(props) => props.theme.colors.alert};
`

const BuilderDetailsTags = styled('span')`
  padding: 0.5rem 0;
  font-size: ${(props) => props.theme.fonts.sizes.small};
`

const BuilderDesc = styled('p')`
  line-height: 1.3;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

const BuilderNutritionButtons = styled('div')`
  margin-top: 1.5rem;

  & > span,
  button > span {
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

const BuilderHeader = ({ item, displaySettings, spinner, pointsIcon }) => {
  const [showInfo, setShowInfo] = useState(false)
  const [showIngredients, setShowIngredients] = useState(false)
  const {
    builderImages: showImage,
    calories: showCals,
    tags: showTags,
    allergens: showAllergens,
  } = displaySettings
  const hasCals = showCals && item.cals
  const hasIngredients = item.ingredients && item.ingredients.length > 0
  const imageUrl = showImage && item.imageUrl ? item.imageUrl : null
  const zeroPrice = !!(item.price === '0.00' || item.price === 0)

  const toggleShowInfo = () => {
    if (showIngredients) setShowIngredients(false)
    setShowInfo(!showInfo)
  }

  const toggleShowIngredients = () => {
    if (showInfo) setShowInfo(false)
    setShowIngredients(!showIngredients)
  }

  return (
    <div>
      {imageUrl && <BuilderImage imageUrl={imageUrl} spinner={spinner} />}
      <BuilderInfo>
        <BuilderName id="dialogTitle">{item.name}</BuilderName>
        <BuilderDetails>
          {!zeroPrice && (
            <BuilderDetailsPrice>
              {zeroPrice ? 'Price varies' : `$${displayPrice(item.price)}`}
            </BuilderDetailsPrice>
          )}
          {hasCals && item.cals > 0 ? (
            <BuilderDetailsCals>{item.cals} cal</BuilderDetailsCals>
          ) : null}
          {item.points && (
            <Points
              points={item.points}
              icon={pointsIcon}
              title="Points can be applied at checkout"
            />
          )}
          {showAllergens && item.allergens.length > 0 && (
            <BuilderDetailsAllergens>
              {item.allergens.join(', ')}
            </BuilderDetailsAllergens>
          )}
          {showTags && item.tags.length > 0 && (
            <BuilderDetailsTags>{item.tags.join(', ')}</BuilderDetailsTags>
          )}
        </BuilderDetails>
        {item.description && <BuilderDesc>{item.description}</BuilderDesc>}
        {(hasCals || hasIngredients) && (
          <BuilderNutritionButtons>
            {hasCals && item.cals > 0 ? (
              <ButtonLink onClick={toggleShowInfo}>
                <span>{!showInfo ? 'show' : 'hide'} nutritional info</span>
              </ButtonLink>
            ) : null}
            {hasCals && hasIngredients ? <span>{' | '}</span> : null}
            {hasIngredients && (
              <ButtonLink onClick={toggleShowIngredients}>
                <span>{!showIngredients ? 'show' : 'hide'} ingredients</span>
              </ButtonLink>
            )}
          </BuilderNutritionButtons>
        )}
      </BuilderInfo>
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
    </div>
  )
}

BuilderHeader.displayName = 'BuilderHeader'
BuilderHeader.propTypes = {
  item: propTypes.object,
  displaySettings: propTypes.object,
  spinner: propTypes.oneOfType([propTypes.node, propTypes.element]),
  pointsIcon: propTypes.element,
}

export default BuilderHeader
