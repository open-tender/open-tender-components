import React, { useState, useContext } from 'react'
import propTypes from 'prop-types'
import { FormContext } from './CheckoutForm'
import { iconMap } from './icons'
import CircleLoader from './CircleLoader'
import { Input } from './Inputs'

const CheckoutTip = ({ setShowTip }) => {
  const formContext = useContext(FormContext)
  const { check, form, updateForm } = formContext
  const tipSettings = check.config.gratuity
  const tipOptions = tipSettings.options
  const initialTip =
    form.tip && !tipOptions.find((i) => i.amount === form.tip) ? form.tip : ''
  const [customTip, setCustomTip] = useState(initialTip)

  const chooseTip = (evt, amount) => {
    evt.preventDefault()
    updateForm({ tip: amount })
    setShowTip(false)
    setCustomTip('')
    evt.target.blur()
  }

  const handleCustomTip = (evt) => {
    setCustomTip(evt.target.value)
  }

  const applyCustomTip = (evt) => {
    evt.preventDefault()
    const formatted = parseFloat(customTip).toFixed(2)
    setCustomTip(formatted)
    updateForm({ tip: formatted })
    setShowTip(false)
    evt.target.blur()
  }

  const customApplied = customTip.length > 0 && check.totals.tip === customTip

  return (
    <div className="cards bg-secondary-color">
      <ul className="cards__list">
        {tipOptions.map((i) => {
          const isCustom = customTip.length > 0
          const isApplied = !isCustom && check.totals.tip === i.amount
          const isDefault = tipSettings.default.amount === i.amount
          return (
            <li key={i.amount}>
              <button
                type="button"
                onClick={(evt) => chooseTip(evt, i.amount)}
                className="btn--tip font-size"
              >
                <div className="cards__card bg-color border-radius">
                  <div className="cards__card__name">
                    ${i.amount} ({i.percent}%)
                    {isDefault && (
                      <span className="cards__card__default font-size-small secondary-color">
                        Suggested Amount
                      </span>
                    )}
                  </div>
                  <div className="cards__card__add">
                    {isApplied ? (
                      <CircleLoader complete={true} />
                    ) : (
                      <span className="btn-link">{iconMap['PlusCircle']}</span>
                    )}
                  </div>
                </div>
              </button>
            </li>
          )
        })}
        <li>
          <div className="cards__card bg-color border-radius">
            <div className="cards__card__name">
              {/* <span>Custom amount:</span> */}
              <Input
                label="Add a custom tip"
                name="custom_tip"
                type="number"
                placeholder="enter custom tip"
                value={customTip}
                onChange={handleCustomTip}
                error={null}
                required={false}
                classes="form__input--small -custom-tip"
                inputClasses=""
                showLabel={false}
              />
            </div>
            <div className="cards__card__add">
              <button
                type="button"
                onClick={applyCustomTip}
                className="btn-link"
                disabled={customTip.length === 0}
              >
                {customApplied ? (
                  <CircleLoader complete={true} />
                ) : (
                  iconMap['PlusCircle']
                )}
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}

CheckoutTip.displayName = 'CheckoutTip'
CheckoutTip.propTypes = {
  setShowTip: propTypes.func,
}

export default CheckoutTip
