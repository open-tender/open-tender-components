import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { ButtonSubmit } from '../..'
import { FormInputs, FormSubmit, Textarea } from '../../inputs'
import { useOrderRatingForm } from '.'

const OrderStars = styled.div`
  display: flex;
  margin: 0.25rem 0 0.5rem;
`

const OrderStar = styled('button')`
  display: block;
  margin: 0 0.5rem 0 0;
  width: 2rem;
  height: 2rem;
  color: ${(props) => props.theme.colors.primary};

  svg {
    fill: ${(props) => (props.filled ? props.theme.colors.primary : null)};
  }

  &:hover {
    color: ${(props) => props.theme.links.primary.color};

    svg {
      fill: ${(props) =>
        props.filled ? props.theme.links.primary.color : null};
    }
  }
`

const OrderRatingForm = ({
  orderId,
  orderRating,
  icon,
  updateRating,
  callback,
}) => {
  const {
    submitRef,
    stars,
    rating,
    handleRating,
    comments,
    handleComments,
    handleSubmit,
  } = useOrderRatingForm(orderId, orderRating, updateRating, callback)

  return (
    <form id="rating-form" onSubmit={handleSubmit} noValidate>
      <FormInputs>
        <OrderStars>
          {stars.map((star, index) => {
            const filled = star <= rating
            return (
              <OrderStar
                key={star}
                type="button"
                onClick={(evt) => handleRating(evt, star)}
                aria-label={`Give ${index + 1} star rating`}
                filled={filled}
              >
                {icon}
              </OrderStar>
            )
          })}
        </OrderStars>
        <Textarea
          label="Comments (optional)"
          name="commments"
          value={comments}
          onChange={handleComments}
          style={{ margin: '3rem 0 0' }}
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
