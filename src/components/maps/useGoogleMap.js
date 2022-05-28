/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import makeMapStyles from './mapStyles'

// https://github.com/laurencedorman/google-maps-api-loader
// https://codesandbox.io/s/lx947qjv0z

const eventsMapping = {
  onCenterChanged: ['center_changed', (map) => map.getCenter()],
  onBoundsChangerd: ['bounds_changed', (map) => map.getBounds()],
}

const useGoogleMap = ({ apiKey, zoom, styles, center, events = {} }) => {
  const mapRef = useRef(null)
  const [mapState, setMapState] = useState({ loading: true })
  console.log('this is being called')
  const loader = new Loader({ libraries: ['places'], apiKey })
  console.log(loader)

  useEffect(() => {
    const mapStyles = makeMapStyles(styles)
    loader.load().then((google) => {
      const sessionToken = new google.maps.places.AutocompleteSessionToken()
      const autocomplete = new google.maps.places.AutocompleteService()
      const map = new google.maps.Map(mapRef.current, {
        zoom,
        center,
        styles: mapStyles,
        scrollwheel: false,
        mapTypeControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        zoomControlOptions: {
          position: google.maps.ControlPosition.LEFT_BOTTOM,
        },
        controlSize: 28,
      })
      Object.keys(events).forEach((eventName) =>
        map.addListener(eventsMapping[eventName][0], () =>
          events[eventName](eventsMapping[eventName][1](map))
        )
      )

      setMapState({
        maps: google.maps,
        map,
        sessionToken,
        autocomplete,
        loading: false,
      })
    })
  }, [])
  return { mapRef, ...mapState }
}

export default useGoogleMap
