/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect, useRef } from 'react'
import propTypes from 'prop-types'
import { useGoogleMapsAutocomplete, useGoogleMapsPlace } from '.'
import { Input, iconMap } from '../index'
import { makeAddress } from '@open-tender/js'
import ButtonClear from '../ButtonClear'

const keys = {
  enter: 13,
  up: 38,
  down: 40,
}

const GoogleMapsAutocomplete = ({
  maps,
  map,
  sessionToken,
  autocomplete,
  formattedAddress,
  setAddress,
  setCenter,
  error,
}) => {
  const [input, setInput] = useState(formattedAddress || '')
  const [activeIndex, setActiveIndex] = useState(0)
  const [placeId, setPlaceId] = useState(null)
  const [predictions, setPredictions] = useGoogleMapsAutocomplete(
    sessionToken,
    autocomplete,
    input
  )
  const place = useGoogleMapsPlace(maps, map, placeId)
  const inputRef = useRef()

  const choosePlace = (evt, placeId, description) => {
    evt.preventDefault()
    setPlaceId(placeId)
    setInput(description)
    setActiveIndex(0)
    evt.target.blur()
  }

  const clearInput = (evt) => {
    evt.preventDefault()
    setInput('')
    setPredictions([])
    evt.target.blur()
    inputRef.current.focus()
  }

  const handleKeyPress = useCallback(
    (evt) => {
      const handleEnter = (evt) => {
        if (!predictions.length) return
        const prediction = activeIndex
          ? predictions.find((i, index) => index === activeIndex)
          : predictions[0]
        if (prediction) {
          const { place_id, description } = prediction
          choosePlace(evt, place_id, description)
        }
      }

      const handleMove = (increment) => {
        evt.preventDefault()
        if (!predictions.length) setActiveIndex(0)
        let val = activeIndex === null ? 0 : activeIndex + increment
        const max = predictions.length - 1
        val = val < 0 ? 0 : val > max ? max : val
        setActiveIndex(val)
      }

      switch (evt.keyCode) {
        case keys.enter:
          return handleEnter(evt)
        case keys.up:
          return handleMove(-1)
        case keys.down:
          return handleMove(1)
        default:
          break
      }
    },
    [predictions, activeIndex]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress, false)
    return () => document.removeEventListener('keydown', handleKeyPress, false)
  }, [handleKeyPress])

  useEffect(() => {
    if (place) {
      const lat = place.geometry.location.lat()
      const lng = place.geometry.location.lng()
      if (lat && lng) {
        setCenter({ lat, lng })
        const address = makeAddress(place)
        setAddress(address)
      }
    }
  }, [place])

  return (
    <div className="autocomplete">
      <Input
        label="Please enter your address"
        name="address"
        type="text"
        value={input}
        placeholder="enter an address or zip code"
        onChange={(evt) => setInput(evt.target.value)}
        showLabel={false}
        classes="autocomplete__input"
        error={error}
        ref={inputRef}
      >
        <div className="autocomplete__predictions ot-bg-color-primary ot-border-radius ot-border-color">
          {predictions ? (
            <ul>
              {predictions.map((i, index) => {
                const active =
                  activeIndex === index ? 'ot-bg-color-secondary' : ''
                let classes =
                  'autocomplete__prediction ot-border-color ot-font-size-small '
                classes += active
                return (
                  <li key={i.place_id} className={classes}>
                    <button
                      className="ot-font-size-small"
                      onClick={(evt) =>
                        choosePlace(evt, i.place_id, i.description)
                      }
                    >
                      {i.description}
                    </button>
                  </li>
                )
              })}
            </ul>
          ) : null}
        </div>
        <div className="autocomplete__icon">{iconMap['Navigation']}</div>
        {input.length ? (
          <ButtonClear
            ariaLabel="Clear text & start over"
            onClick={clearInput}
          />
        ) : null}
      </Input>
    </div>
  )
}

GoogleMapsAutocomplete.displayName = 'GoogleMapsAutocomplete'
GoogleMapsAutocomplete.propTypes = {
  maps: propTypes.object,
  map: propTypes.object,
  sessionToken: propTypes.object,
  autocomplete: propTypes.object,
  setAddress: propTypes.func,
  setCenter: propTypes.func,
  error: propTypes.string,
  formattedAddress: propTypes.string,
}
export default GoogleMapsAutocomplete
