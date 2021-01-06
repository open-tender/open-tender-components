import propTypes from 'prop-types'
import React, { useState } from 'react'
import styled from '@emotion/styled'
import { displayPrice } from '@open-tender/js'
import BuilderNutrition from './BuilderNutrition'
import BuilderIngredients from './BuilderIngredients'
import { BgImage, ButtonLink } from '..'

const BuilderImage = styled(BgImage)`
  height: 24rem;
  background-color: ${(props) => props.theme.bgColors.secondary};
`

const BuilderInfo = styled('div')`
  background-color: ${(props) => props.theme.bgColors.primary};
  padding: ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: ${(props) => props.theme.layout.paddingMobile};
  }
`

const BuilderName = styled('h2')`
  font-size: ${(props) => props.theme.fonts.sizes.h3};
`

const BuilderDetails = styled('div')`
  display: flex;
  align-items: baseline;
  margin: 0.5rem 0 1.5rem;
  flex-wrap: wrap;

  span {
    display: block;
    padding: 0.5rem 0;
    margin: 0 2rem 0 0;
    &:last-of-type {
      margin: 0;
    }
  }
`

const BuilderDetailsPrice = styled('span')`
  font-weight: ${(props) => props.theme.boldWeight};
  color: ${(props) => props.theme.colors.primary};
`

const BuilderDetailsCals = styled('span')`
  font-weight: ${(props) => props.theme.boldWeight};
`

const BuilderDetailsAllergens = styled('span')`
  font-size: ${(props) => props.theme.fonts.sizes.small};
  color: ${(props) => props.theme.colors.alert};
`

const BuilderDetailsTags = styled('span')`
  font-size: ${(props) => props.theme.fonts.sizes.small};
`

const BuilderDesc = styled('p')`
  line-height: 1.3;
`

const BuilderNutritionButtons = styled('div')`
  margin-top: 1.5rem;

  & > span,
  button > span {
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

const BuilderHeader = ({ item, displaySettings }) => {
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

  const toggleShowInfo = () => {
    if (showIngredients) setShowIngredients(false)
    setShowInfo(!showInfo)
  }

  const toggleShowIngredients = () => {
    if (showInfo) setShowInfo(false)
    setShowIngredients(!showIngredients)
  }

  const bgStyle =
    showImage && item.imageUrl
      ? { backgroundImage: `url(${item.imageUrl}` }
      : null
  return (
    <div>
      {bgStyle && <BuilderImage style={bgStyle}>&nbsp;</BuilderImage>}
      <BuilderInfo>
        <BuilderName id="dialogTitle">{item.name}</BuilderName>
        <BuilderDetails>
          <BuilderDetailsPrice>
            {item.price === '0.00'
              ? 'Price varies'
              : `$${displayPrice(item.price)}`}
          </BuilderDetailsPrice>
          {showCals && item.cals && (
            <BuilderDetailsCals>{item.cals} cal</BuilderDetailsCals>
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
}

export default BuilderHeader
