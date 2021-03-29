import { useState, useEffect, useRef } from 'react'

const useAllergenForm = (
  allergens,
  selectedAllergens,
  isLoading = false,
  error = null,
  setAllergens,
  updateAllergens,
  callback
) => {
  const submitRef = useRef(null)
  const [data, setData] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const allergenIds = data.map((i) => i.allergen_id)
  const formError = error ? error.detail || error.message : null

  useEffect(() => {
    // uses isLoading boolean because loading state is based on
    // both brand allergens and customer allergens loading
    if (!isLoading) {
      setSubmitting(false)
      if (submitRef.current) submitRef.current.blur()
    }
  }, [isLoading])

  useEffect(() => {
    setData(selectedAllergens || [])
  }, [selectedAllergens, allergens])

  const handleChange = (evt) => {
    const { id, checked } = evt.target
    const newData = checked
      ? [...data, { allergen_id: parseInt(id) }]
      : data.filter((i) => i.allergen_id !== parseInt(id))
    setData(newData)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    setSubmitting(true)
    const newData = data.map((i) => ({ allergen_id: i.allergen_id }))
    setAllergens(data)
    if (updateAllergens) updateAllergens(newData)
    if (callback) callback()
  }

  return {
    submitRef,
    submitting,
    allergenIds,
    formError,
    handleChange,
    handleSubmit,
  }
}

export default useAllergenForm
