import { useRef, useState } from 'react'

const useOrderRatingForm = (orderId, orderRating, updateRating, callback) => {
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

  return {
    submitRef,
    stars,
    rating,
    handleRating,
    comments,
    handleComments,
    handleSubmit,
  }
}

export default useOrderRatingForm
