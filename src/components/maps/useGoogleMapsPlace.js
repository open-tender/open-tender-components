/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from 'react'

const useGoogleMapsPlace = (maps, map, placeId) => {
  const [place, setPlace] = useState(null)
  const placeService = maps ? new maps.places.PlacesService(map) : null
  const ok = maps ? maps.places.PlacesServiceStatus.OK : false

  const callback = useCallback(
    (place, status) => {
      if (status === ok) {
        setPlace(place)
      }
    },
    [ok]
  )

  useEffect(() => {
    if (placeId) {
      const request = {
        placeId: placeId,
        fields: [
          'place_id',
          'address_component',
          // 'utc_offset',
          'formatted_address',
          'geometry',
        ],
      }
      placeService.getDetails(request, callback)
    }
  }, [placeId])

  return place
}

export default useGoogleMapsPlace
