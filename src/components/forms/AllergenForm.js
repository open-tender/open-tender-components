import React, { useRef, useState, useEffect } from 'react'
import propTypes from 'prop-types'
import { Switch } from '../index'

const AllergenForm = ({
  allergens,
  selectedAllergens,
  isLoading,
  error,
  setAllergens,
  updateAllergens,
  callback,
}) => {
  const submitButton = useRef()
  const [data, setData] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const allergenIds = data.map((i) => i.allergen_id)
  const formError = error ? error.detail || error.message : null

  useEffect(() => {
    // uses isLoading boolean because loading state is based on
    // both brand allergens and customer allergens loading
    if (!isLoading) setSubmitting(false)
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
    submitButton.current.blur()
    setSubmitting(true)
    const newData = data.map((i) => ({ allergen_id: i.allergen_id }))
    setAllergens(data)
    if (updateAllergens) updateAllergens(newData)
    if (callback) callback()
  }

  return allergens ? (
    allergens.length > 0 ? (
      <form
        id="allergen-form"
        className="form"
        onSubmit={handleSubmit}
        noValidate
      >
        {formError && (
          <div className="form__error form__error--top ot-form-error">
            {formError}
          </div>
        )}
        <div className="form__inputs">
          {allergens.map((allergen) => (
            <Switch
              key={allergen.allergen_id}
              label={allergen.name}
              id={`${allergen.allergen_id}`}
              on={allergenIds.includes(allergen.allergen_id)}
              onChange={handleChange}
            />
          ))}
        </div>
        <div className="form__submit">
          <button
            className="ot-btn"
            type="submit"
            disabled={submitting}
            ref={submitButton}
          >
            Update Selected Allergens
          </button>
        </div>
      </form>
    ) : (
      <p>This brand {"doesn't"} currently have any allergens configured</p>
    )
  ) : null
}

AllergenForm.displayName = 'AllergenForm'
AllergenForm.propTypes = {
  allergens: propTypes.array,
  selectedAllergens: propTypes.array,
  isLoading: propTypes.bool,
  error: propTypes.object,
  setAllergens: propTypes.func,
  updateAllergens: propTypes.func,
  callback: propTypes.func,
}

export default AllergenForm
