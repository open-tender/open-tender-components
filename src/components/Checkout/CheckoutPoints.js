import React, { useContext, useEffect } from 'react'
import { formatQuantity } from '@open-tender/js'

import { Text } from '..'
import { FormContext } from './CheckoutForm'
import { FormButton, FormFieldset, FormInputs, FormLegend } from '../inputs'

const CheckoutPoints = () => {
  const formContext = useContext(FormContext)
  const { check, form, updateForm, updating = false } = formContext
  const { points } = check.config || {}
  const { cart } = check
  const cartLength = cart ? cart.length : 0
  const items = cart.reduce((arr, i, index) => {
    if (!i.points) return arr
    const quantityApplied = Math.floor(i.points.applied / i.points.per)
    const quantityAvailable = Math.floor(i.points.available / i.points.per)
    const priceUnit = (parseFloat(i.price_total) / i.quantity).toFixed(2)
    if (!quantityApplied && !quantityAvailable) return arr
    let itemsApplied = []
    for (let step = 0; step < quantityApplied; step++) {
      const item = {
        index,
        name: i.name,
        points: i.points.per,
        discount: priceUnit,
        isApplied: true,
      }
      itemsApplied = [...itemsApplied, item]
    }
    let itemsAvailable = []
    for (let step = 0; step < quantityAvailable; step++) {
      const item = {
        index,
        name: i.name,
        points: i.points.per,
        discount: priceUnit,
        isApplied: false,
      }
      itemsAvailable = [...itemsAvailable, item]
    }
    return [...arr, ...itemsApplied, ...itemsAvailable]
  }, [])
  const itemsAvailable = items.filter((i) => !i.isApplied)
  const itemsApplied = items.filter((i) => i.isApplied)
  const pointsName = points.name ? points.name.toLowerCase() : 'points'
  const remainingMsg =
    points.remaining < points.balance
      ? `${points.remaining} ${pointsName} remaining. `
      : ''
  const applyMsg = itemsAvailable.length
    ? `Select an item below to apply.`
    : itemsApplied.length
    ? `Tap on an item to remove ${pointsName} and apply to another item.`
    : ''
  const subtitle = items.length
    ? `${remainingMsg}${applyMsg}`
    : `You haven't earned any free items yet - earn ${points.per} ${pointsName} for every dollar you spend!`

  const applyPoints = (item) => {
    const currentItem = form.points.find((i) => i.index === item.index)
    const currentPoints = currentItem ? currentItem.points : 0
    const updatedItem = {
      index: item.index,
      points: currentPoints + item.points,
    }
    const otherItems = form.points.filter((i) => i.index !== item.index)
    const updatedPoints = [...otherItems, updatedItem]
    updateForm({ points: updatedPoints })
  }

  const removePoints = (item) => {
    const currentItem = form.points.find((i) => i.index === item.index)
    const currentPoints = currentItem ? currentItem.points : 0
    const updatedItem = {
      index: item.index,
      points: currentPoints - item.points,
    }
    const otherItems = form.points.filter((i) => i.index !== item.index)
    const updatedPoints =
      updatedItem.points > 0 ? [...otherItems, updatedItem] : otherItems
    updateForm({ points: updatedPoints })
  }

  useEffect(() => {
    if (updateForm) updateForm({ points: [] })
  }, [cartLength, updateForm])

  if (!points) return null

  return (
    <FormFieldset>
      <FormLegend
        as="div"
        title={`${formatQuantity(points.balance)} ${points.name} available${
          points.balance > 0 ? '!' : ''
        }`}
        subtitle={subtitle}
      />
      <FormInputs>
        {items.map((item, index) => {
          const onClick = item.isApplied
            ? () => removePoints(item)
            : () => applyPoints(item)
          const desc = `${formatQuantity(item.points)} points to save $${
            item.discount
          }`
          return (
            <FormButton
              key={index}
              title={item.name}
              description={
                item.isApplied ? (
                  <Text color="success" bold={true}>
                    ${item.discount} discount applied to order!
                  </Text>
                ) : (
                  desc
                )
              }
              isApplied={item.isApplied}
              onClick={onClick}
              disabled={updating}
            />
          )
        })}
      </FormInputs>
    </FormFieldset>
  )
}

CheckoutPoints.displayName = 'CheckoutPoints'

export default CheckoutPoints
