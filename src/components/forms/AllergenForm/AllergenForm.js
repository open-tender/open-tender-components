import React from 'react'
import propTypes from 'prop-types'
import { ButtonSubmit, Switch } from '../..'
import { FormError, FormInputs, FormSubmit } from '../../inputs'
import { useAllergenForm } from '.'

const AllergenForm = ({
  allergens,
  selectedAllergens,
  isLoading,
  error,
  setAllergens,
  updateAllergens,
  callback,
}) => {
  const {
    submitRef,
    submitting,
    allergenIds,
    formError,
    handleChange,
    handleSubmit,
  } = useAllergenForm(
    allergens,
    selectedAllergens,
    isLoading,
    error,
    setAllergens,
    updateAllergens,
    callback
  )

  return allergens ? (
    allergens.length > 0 ? (
      <form id="allergen-form" onSubmit={handleSubmit} noValidate>
        <FormError errMsg={formError} style={{ margin: '0 0 2rem' }} />
        <FormInputs>
          {allergens.map((allergen) => (
            <Switch
              key={allergen.allergen_id}
              label={allergen.name}
              id={`${allergen.allergen_id}`}
              on={allergenIds.includes(allergen.allergen_id)}
              onChange={handleChange}
            />
          ))}
        </FormInputs>
        <FormSubmit>
          <ButtonSubmit submitRef={submitRef} submitting={submitting}>
            {submitting ? 'Submitting...' : 'Submit Updates'}
          </ButtonSubmit>
        </FormSubmit>
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
