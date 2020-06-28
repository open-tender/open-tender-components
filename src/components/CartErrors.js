import React from 'react'
import propTypes from 'prop-types'
import { Button } from './index'
import { isoToDate } from './utils/datetimes'

const InvalidItems = ({ invalidItems }) => {
  return invalidItems.length ? (
    <div className="validate__invalid">
      <p className="font-size-small">
        The following items will need to be removed from your cart:
      </p>
      <ul>
        {invalidItems.map((item, index) => {
          const missingOptions =
            item.missingOptions && item.missingOptions.length
              ? item.missingOptions.map((option) => option.name).join(', ')
              : null
          return (
            <li key={`${item.id}-${index}`}>
              <span className="validate__invalid__item ot-bold">
                {item.name}
              </span>
              {missingOptions ? (
                <span className="font-size-small">
                  {' '}
                  (unavailable modifiers: {missingOptions})
                </span>
              ) : null}
            </li>
          )
        })}
      </ul>
    </div>
  ) : null
}

InvalidItems.displayName = 'InvalidItems'
InvalidItems.propTypes = {
  invalidItems: propTypes.array,
}

const isCartRevertable = (previous, current, revenueCenters) => {
  if (!previous) return null
  const previousLocation = revenueCenters.find(
    (i) => i.revenue_center_id === previous.revenueCenterId
  )
  if (!previousLocation) return null
  const now = new Date()
  const requestedDate =
    current.requestedAt === 'asap' ? now : isoToDate(current.requestedAt)
  if (requestedDate < now) return null
  if (
    previous.revenueCenterId === current.revenueCenterId &&
    previous.serviceType === current.serviceType
  ) {
    return null
  }
  return { newLocation: previousLocation, newMenuVars: previous }
}

const CartErrors = ({
  newCart,
  errors,
  config,
  revert,
  proceed,
  revenueCenters,
  previousMenuVars,
  menuVars,
}) => {
  const isRevertable = isCartRevertable(
    previousMenuVars,
    menuVars,
    revenueCenters
  )
  const content = isRevertable ? config.revert : config.proceed

  const handleRevert = (evt) => {
    const { newLocation, newMenuVars } = isRevertable
    revert(evt, newLocation, newMenuVars)
  }

  const unavailable = [...errors.missingItems, ...errors.invalidItems]

  return (
    <div className="validate">
      <InvalidItems invalidItems={unavailable} />
      <p>{content.message}</p>
      <div className="validate__buttons">
        {isRevertable && (
          <Button
            text={content.buttonRevert}
            icon="ChevronLeft"
            onClick={handleRevert}
            classes="btn--back"
          />
        )}
        <Button
          text={content.buttonProceed}
          icon="Trash2"
          onClick={proceed}
          // iconEnd={true}
          // classes="btn--proceed"
        />
      </div>
    </div>
  )
}

CartErrors.displayName = 'CartErrors'
CartErrors.propTypes = {
  errors: propTypes.object,
  newCart: propTypes.array,
}

export default CartErrors
