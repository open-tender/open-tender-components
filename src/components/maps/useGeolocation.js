import { useState, useEffect, useCallback } from 'react'

// https://itnext.io/creating-react-useposition-hook-for-getting-browsers-geolocation-2f27fc1d96de
// https://developers.google.com/web/fundamentals/native-hardware/user-location
// https://juliangaramendy.dev/use-promise-subscription/

const geoOptions = {
  maximumAge: 60 * 60 * 1000,
  timeout: 5 * 1000,
}

const useGeolocation = () => {
  const [position, setPosition] = useState(null)
  const [error, setError] = useState(null)
  const [isMounted, setIsMounted] = useState(false)

  const onSuccess = useCallback(
    (position) => {
      const { coords } = position
      const latLng = { lat: coords.latitude, lng: coords.longitude }
      if (isMounted) {
        // console.log('setting position')
        setPosition(latLng)
      }
    },
    [isMounted]
  )

  const onError = (error) => {
    setError(error.message)
  }

  useEffect(() => {
    setIsMounted(true)
    const geo = navigator.geolocation
    if (!geo) {
      setError('Geolocation is not supported')
      return
    }
    // console.log('fetching geo')
    geo.getCurrentPosition(onSuccess, onError, geoOptions)
    return () => {
      // console.log('canceling geo')
      setIsMounted(false)
    }
  }, [onSuccess])

  return { geoLatLng: position, geoError: error }
}

export default useGeolocation
