/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import propTypes from 'prop-types'
import useGoogleMap from './useGoogleMap'
import styled from '@emotion/styled'

// https://codesandbox.io/s/lx947qjv0z?file=/src/Consumer.jsx

const Map = styled('div')`
  position: fixed;
  z-index: 0;
  top: 0;
  bottom: 0;
  left: 0;
  right: 76.8rem;
  background-color: ${(props) => props.theme.bgColors.tertiary};

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    top: 14rem;
    right: 0;
    bottom: auto;
    height: 38rem;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    height: 24rem;
  }
`

const MapLoading = styled('div')`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const GoogleMap = ({
  apiKey,
  center,
  zoom,
  styles,
  events,
  loader,
  children,
  renderMap,
}) => {
  const { maps, map, sessionToken, autocomplete, mapRef, loading } =
    useGoogleMap({
      apiKey,
      zoom,
      styles,
      center,
      events,
    })

  useEffect(() => {
    map && map.panTo(center)
  }, [center.lat, center.lng])

  return (
    <>
      {renderMap && renderMap({ loading, mapRef })}
      {!loading &&
        React.Children.map(children, (child) => {
          return (
            child &&
            React.cloneElement(child, {
              map,
              maps,
              sessionToken,
              autocomplete,
            })
          )
        })}
      {!renderMap && (
        <Map>
          {loading && loader && <MapLoading>{loader}</MapLoading>}
          <div ref={mapRef} style={{ height: '100%' }} />
        </Map>
      )}
    </>
  )
}

GoogleMap.displayName = 'GoogleMap'
GoogleMap.propTypes = {
  apiKey: propTypes.string,
  center: propTypes.object,
  zoom: propTypes.number,
  styles: propTypes.object,
  events: propTypes.object,
  loader: propTypes.element,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
  renderMap: propTypes.func,
}
export default GoogleMap
