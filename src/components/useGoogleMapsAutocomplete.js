/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react'
import debounce from 'lodash/debounce'

// IMPORTANT: need to pass down token from parent component so a new
// token isn't created on every render
const useGoogleMapsAutocomplete = (sessionToken, autocomplete, input) => {
  const [predictions, setPredictions] = useState([])

  const getPlacePredictions = (input) => {
    if (input.length) {
      autocomplete.getPlacePredictions(
        { input, sessionToken },
        (predictions) => {
          setPredictions(predictions)
        }
      )
    }
  }

  const debouncedGetPlacePredictions = useCallback(
    debounce(getPlacePredictions, 250),
    []
  )

  useEffect(() => {
    debouncedGetPlacePredictions(input)
  }, [input])

  return [predictions, setPredictions]
}

export default useGoogleMapsAutocomplete
