import React from 'react'
import propTypes from 'prop-types'
import { isoToDate } from '@open-tender/js'
import styled from '@emotion/styled'
import { ButtonStyled } from '.'

export const InvalidView = styled('div')`
  margin: 3rem 0 0;
`

export const InvalidItemsView = styled('div')`
  margin: 0 0 3rem;

  > p {
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }

  ul {
    list-style: disc inside;
    margin: 1.5rem 0 0;

    li {
      margin: 1rem 0;

      span:first-of-type {
        position: relative;
        left: -0.5rem;
        font-weight: ${(props) => props.theme.boldWeight};
        color: ${(props) => props.theme.colors.primary};
      }

      span + span {
        font-size: ${(props) => props.theme.fonts.sizes.small};
      }
    }
  }
`

const InvalidButtons = styled('div')`
  margin-top: 3rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  button {
    display: block;
    & + button {
      margin-left: 1rem;
    }
  }
`

const InvalidItems = ({ invalidItems }) => {
  return invalidItems.length ? (
    <InvalidItemsView>
      <p>The following items will need to be removed from your cart:</p>
      <ul>
        {invalidItems.map((item, index) => {
          const missingOptions =
            item.missingOptions && item.missingOptions.length
              ? item.missingOptions.map((option) => option.name).join(', ')
              : null
          return (
            <li key={`${item.id}-${index}`}>
              <span>{item.name}</span>
              {missingOptions ? (
                <span> (unavailable modifiers: {missingOptions})</span>
              ) : null}
            </li>
          )
        })}
      </ul>
    </InvalidItemsView>
  ) : null
}

InvalidItems.displayName = 'InvalidItems'
InvalidItems.propTypes = {
  invalidItems: propTypes.array,
}

const isCartRevertable = (previous, current) => {
  if (!previous) return null
  const now = new Date()
  const requestedDate =
    current.requestedAt === 'asap' ? now : isoToDate(current.requestedAt)
  if (requestedDate < now) return null
  if (
    previous.revenueCenterId === current.revenueCenterId &&
    previous.serviceType === current.serviceType &&
    previous.requestedAt === current.requestedAt
  ) {
    return null
  }
  return { newMenuVars: previous }
}

const CartErrors = ({
  errors,
  revert,
  revertIcon,
  proceed,
  proceedIcon,
  previousMenuVars,
  menuVars,
}) => {
  const isRevertable = isCartRevertable(previousMenuVars, menuVars)

  const handleRevert = () => {
    const { newMenuVars } = isRevertable
    revert(newMenuVars)
  }

  const unavailable = errors
    ? [...errors.missingItems, ...errors.invalidItems]
    : []

  return (
    <InvalidView>
      <InvalidItems invalidItems={unavailable} />
      <p>
        {isRevertable
          ? 'Please either remove these items or switch back to your previous menu.'
          : 'Please click the button below to remove these items and proceed with your order.'}
      </p>
      <InvalidButtons>
        {isRevertable && (
          <ButtonStyled icon={revertIcon} onClick={handleRevert}>
            Back to Previous Menu
          </ButtonStyled>
        )}
        <ButtonStyled icon={proceedIcon} onClick={proceed}>
          Remove Items
        </ButtonStyled>
      </InvalidButtons>
    </InvalidView>
  )
}

CartErrors.displayName = 'CartErrors'
CartErrors.propTypes = {
  errors: propTypes.object,
  revert: propTypes.func,
  revertIcon: propTypes.element,
  proceed: propTypes.func,
  proceedIcon: propTypes.element,
  previousMenuVars: propTypes.object,
  menuVars: propTypes.object,
}

export default CartErrors
