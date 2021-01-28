/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect, useRef } from 'react'
import propTypes from 'prop-types'
import { useGoogleMapsAutocomplete, useGoogleMapsPlace } from '.'
import { Input } from '../index'
import { makeAddress } from '@open-tender/js'
import ButtonClear from '../ButtonClear'
import styled from '@emotion/styled'

const keys = {
  enter: 13,
  up: 38,
  down: 40,
}

const AutocompleteView = styled('div')`
  position: relative;
  display: block;
  width: 100%;

  label {
    padding: 0;
    margin-bottom: 0;

    & > span > span:first-of-type {
      margin: 0;
    }

    input {
      padding-left: 3.2rem;
      padding-right: 3.2rem;
      @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
        padding: 0.6rem 3.2rem;
        line-height: 3rem;
      }
    }

    input:focus,
    input:active {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;

      & + div {
        display: block;
      }
    }
  }
`

const AutocompletePredictions = styled('div')`
  display: none;
  position: absolute;
  z-index: 1;
  top: 100%;
  left: 0;
  right: 0;
  overflow: hidden;
  background-color: ${(props) => props.theme.bgColors.primary};
  border-color: ${(props) => props.theme.border.color};
  border-width: 0.1rem;
  border-style: solid;
  border-top: 0;
  border-bottom: 0;
  border-radius: ${(props) => props.theme.border.radius};
  border-top-left-radius: 0;
  border-top-right-radius: 0;
`

const AutocompletePrediction = styled('li')`
  font-size: ${(props) => props.theme.fonts.sizes.small};
  background-color: ${(props) =>
    props.active ? props.theme.bgColors.secondary : 'transparent'};
  border-color: ${(props) => props.theme.border.color};
  border-bottom-width: 0.1rem;
  border-bottom-style: solid;

  button {
    color: ${(props) => props.theme.fonts.body.color};
    font-size: ${(props) => props.theme.fonts.sizes.small};
    width: 100%;
    padding: 1.2rem 1.1rem 1.1rem;
    text-align: left;
  }
`

const AutocompleteIcon = styled('div')`
  position: absolute;
  top: 50%;
  left: 1.1rem;
  width: 1.4rem;
  height: 1.4rem;
  margin-top: -0.7rem;
  opacity: 0.4;
`

const GoogleMapsAutocomplete = ({
  maps,
  map,
  sessionToken,
  autocomplete,
  formattedAddress,
  setAddress,
  setCenter,
  error,
  icon,
  placeholder = 'enter an address',
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
  const inputRef = useRef(null)

  const choosePlace = (evt, placeId, description) => {
    evt.preventDefault()
    setPlaceId(placeId)
    setInput(description)
    setActiveIndex(0)
    evt.target.blur()
  }

  const clearInput = () => {
    setInput('')
    setPredictions([])
    inputRef.current.focus()
  }

  const handleKeyPress = useCallback(
    (evt) => {
      const handleEnter = (evt) => {
        if (!predictions || !predictions.length || evt.target.id !== 'address')
          return
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
    <AutocompleteView>
      <Input
        label="Please enter your address"
        name="address"
        type="text"
        value={input}
        placeholder={placeholder}
        onChange={(evt) => setInput(evt.target.value)}
        showLabel={false}
        // classes="autocomplete__input"
        error={error}
        ref={inputRef}
      >
        <AutocompletePredictions>
          {predictions ? (
            <ul>
              {predictions.map((i, index) => (
                <AutocompletePrediction
                  key={i.place_id}
                  active={activeIndex === index}
                >
                  <button
                    onClick={(evt) =>
                      choosePlace(evt, i.place_id, i.description)
                    }
                  >
                    {i.description}
                  </button>
                </AutocompletePrediction>
              ))}
            </ul>
          ) : null}
        </AutocompletePredictions>
        {icon && <AutocompleteIcon>{icon}</AutocompleteIcon>}
        {input.length ? (
          <ButtonClear
            ariaLabel="Clear text & start over"
            onClick={clearInput}
            style={{ top: '50%', marginTop: '-0.7rem' }}
          />
        ) : null}
      </Input>
    </AutocompleteView>
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
  icon: propTypes.element,
  placeholder: propTypes.string,
}
export default GoogleMapsAutocomplete
