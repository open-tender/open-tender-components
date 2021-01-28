import React, { useRef, useState } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { ButtonSubmit } from '..'
import { FormInputs, FormSubmit, Textarea } from '../inputs'

const OrderStars = styled('div')`
  display: flex;
  margin: 0.25rem 0 0.5rem;
`

const OrderStar = styled('span')`
  display: block;
  margin: 0 0.5rem 0 0;
  width: 2rem;
  height: 2rem;
  ${(props) =>
    props.filled ? `color: ${props.theme.links.primary.color}` : null}
`

const OrderRatingForm = ({
  orderId,
  orderRating,
  icon,
  updateRating,
  callback,
}) => {
  const submitRef = useRef(null)
  const [rating, setRating] = useState(orderRating.rating || 0)
  const [comments, setComments] = useState(orderRating.comments || '')
  const stars = [1, 2, 3, 4, 5]

  const handleRating = (evt, star) => {
    evt.preventDefault()
    setRating(star)
    evt.target.blur()
  }

  const handleComments = (evt) => {
    setComments(evt.target.value)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    const data = { rating, comments }
    updateRating(orderId, data)
    if (callback) callback()
    submitRef.current.blur()
  }

  return (
    <form id="rating-form" onSubmit={handleSubmit} noValidate>
      <FormInputs>
        <OrderStars>
          {stars.map((star, index) => {
            return (
              <button
                key={star}
                type="button"
                onClick={(evt) => handleRating(evt, star)}
                aria-label={`Give ${index + 1} star rating`}
              >
                <OrderStar filled={star <= rating}>{icon}</OrderStar>
              </button>
            )
          })}
        </OrderStars>
        <Textarea
          label="Comments"
          name="commments"
          value={comments}
          onChange={handleComments}
          classes="form__input"
          showLabel={false}
          placeholder="add comments (optional)"
        />
      </FormInputs>
      <FormSubmit>
        <ButtonSubmit submitRef={submitRef}>Submit Rating</ButtonSubmit>
      </FormSubmit>
    </form>
  )
}

OrderRatingForm.displayName = 'OrderRatingForm'
OrderRatingForm.propTypes = {
  orderId: propTypes.number,
  orderRating: propTypes.object,
  icon: propTypes.element,
  updateRating: propTypes.func,
  callback: propTypes.func,
}

export default OrderRatingForm
