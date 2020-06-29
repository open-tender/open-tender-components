import { useState, useEffect } from 'react'

// https://itnext.io/creating-react-useposition-hook-for-getting-browsers-geolocation-2f27fc1d96de
// https://developers.google.com/web/fundamentals/native-hardware/user-location

const geoOptions = {
  maximumAge: 60 * 60 * 1000,
  timeout: 5 * 1000,
}

const useGeolocation = () => {
  const [position, setPosition] = useState(null)
  const [error, setError] = useState(null)

  const onSuccess = (position) => {
    const { coords } = position
    const latLng = { lat: coords.latitude, lng: coords.longitude }
    setPosition(latLng)
  }

  const onError = (error) => {
    setError(error.message)
  }

  useEffect(() => {
    const geo = navigator.geolocation
    if (!geo) {
      setError('Geolocation is not supported')
      return
    }
    geo.getCurrentPosition(onSuccess, onError, geoOptions)
  }, [])

  return { geoLatLng: position, geoError: error }
}

export default useGeolocation
