import { useState } from 'react'
import { makeOrderItem, calcPrices } from '@open-tender/js'

const useBuilder = (menuItem, soldOut, hasPoints) => {
  const orderItem =
    menuItem.index !== undefined
      ? menuItem
      : makeOrderItem(menuItem, null, soldOut, null, hasPoints)
  const [item, setItem] = useState(orderItem)

  const increment = () => {
    const newQuantity = item.max
      ? Math.min(item.quantity + item.increment, item.max)
      : item.quantity + item.increment
    setItem(calcPrices({ ...item, quantity: newQuantity }))
  }

  const decrement = () => {
    const newQuantity = Math.max(item.quantity - item.increment, item.min)
    setItem(calcPrices({ ...item, quantity: newQuantity }))
  }

  const setQuantity = (quantity) => {
    setItem(calcPrices({ ...item, quantity: quantity }))
  }

  const setMadeFor = (madeFor) => {
    setItem({ ...item, madeFor })
  }

  const setNotes = (notes) => {
    setItem({ ...item, notes })
  }

  const toggleOption = (groupId, optionId) => {
    const groups = item.groups.map((group) => {
      if (group.id === groupId) {
        const options = group.options.map((option) => {
          const newQuantity = option.id === optionId ? 1 : 0
          return { ...option, quantity: newQuantity }
        })
        return { ...group, options }
      }
      return group
    })
    setItem(calcPrices({ ...item, groups: groups }))
  }

  const incrementOption = (groupId, optionId) => {
    const groups = item.groups.map((group) => {
      if (group.id === groupId) {
        const count = group.options
          .filter((o) => o.id !== optionId)
          .reduce((t, o) => t + o.quantity, 0)
        if (group.max !== 0 && count >= group.max) return group
        const options = group.options.map((option) => {
          if (option.id === optionId) {
            let quantity = option.quantity + option.increment
            const quantities = [quantity]
            if (option.max !== 0) quantities.push(option.max)
            if (group.max !== 0) quantities.push(group.max - count)
            quantity = Math.min(...quantities)
            return { ...option, quantity }
          }
          return option
        })
        return { ...group, options }
      }
      return group
    })
    setItem(calcPrices({ ...item, groups: groups }))
  }

  const decrementOption = (groupId, optionId) => {
    const groups = item.groups.map((group) => {
      if (group.id === groupId) {
        const options = group.options.map((option) => {
          if (option.id === optionId) {
            const quantity = Math.max(option.quantity - option.increment, 0)
            return { ...option, quantity }
          }
          return option
        })
        return { ...group, options }
      }
      return group
    })
    setItem(calcPrices({ ...item, groups: groups }))
  }

  const setOptionQuantity = (groupId, optionId, quantity) => {
    const groups = item.groups.map((group) => {
      if (group.id === groupId) {
        const count = group.options
          .filter((o) => o.id !== optionId)
          .reduce((t, o) => t + o.quantity, 0)
        if (group.max !== 0 && count >= group.max) return group
        const options = group.options.map((option) => {
          if (option.id === optionId) {
            if (quantity === '') {
              return { ...option, quantity }
            } else {
              const quantities = [quantity]
              if (option.max !== 0) quantities.push(option.max)
              if (group.max !== 0) quantities.push(group.max - count)
              quantity = Math.min(...quantities)
              quantity = Math.max(quantity, option.min)
              return { ...option, quantity }
            }
          }
          return option
        })
        return { ...group, options }
      }
      return group
    })
    setItem(calcPrices({ ...item, groups: groups }))
  }

  return {
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
  }
}

export default useBuilder
