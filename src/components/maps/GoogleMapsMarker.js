/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react'
import propTypes from 'prop-types'

const eventMapping = {
  onClick: 'click',
  onDoubleClick: 'dblclick',
}

// add useRef on March 18, 2021 to allow marker to be removed
// https://www.timveletta.com/blog/2020-07-14-accessing-react-state-in-your-component-cleanup-with-hooks/

const GoogleMapsMarker = ({
  maps,
  map,
  title,
  position,
  icon,
  size = { width: 30, height: 40 },
  anchor = null,
  drop = true,
  events,
}) => {
  const [marker, setMarker] = useState(null)
  const markerRef = useRef()

  useEffect(() => {
    if (marker) {
      marker.setPosition(position)
    }
  }, [position.lat, position.lng])

  useEffect(() => {
    if (marker) {
      marker.setIcon({
        url: icon,
        scaledSize: new maps.Size(size.width, size.height),
      })
    }
  }, [icon])

  useEffect(() => {
    const newMarker = new maps.Marker({
      position,
      map,
      title,
      animation: drop ? maps.Animation.DROP : null,
      icon: {
        url: icon,
        scaledSize: new maps.Size(size.width, size.height),
        anchor: anchor ? new maps.Point(anchor.x, anchor.y) : null,
      },
    })
    if (events) {
      Object.keys(events).forEach((eventName) =>
        newMarker.addListener(eventMapping[eventName], events[eventName])
      )
    }
    setMarker(newMarker)
    markerRef.current = newMarker
    return () => {
      markerRef.current.setMap(null)
      setMarker(null)
    }
  }, [])

  return null
}

GoogleMapsMarker.displayName = 'GoogleMapsMarker'
GoogleMapsMarker.propTypes = {
  maps: propTypes.object,
  map: propTypes.object,
  title: propTypes.string,
  position: propTypes.object,
  icon: propTypes.string,
  size: propTypes.object,
  anchor: propTypes.object,
  drop: propTypes.bool,
  events: propTypes.object,
}
export default GoogleMapsMarker
