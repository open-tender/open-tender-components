import React from 'react'
import propTypes from 'prop-types'
// import ClipLoader from 'react-spinners/ClipLoader'

const SubmitButton = ({ submitRef, submitting, disabled }) => {
  return (
    <button
      className="btn"
      type="submit"
      disabled={disabled || submitting}
      ref={submitRef}
    >
      {submitting ? (
        <span>
          {/* <span className="btn__loader">
            <ClipLoader size={14} color={'#ffffff'} />
          </span> */}
          <span>Submitting...</span>
        </span>
      ) : (
        'Submit'
      )}
    </button>
  )
}

SubmitButton.displayName = 'SubmitButton'
SubmitButton.propTypes = {
  submitRef: propTypes.oneOfType([
    propTypes.func,
    propTypes.shape({ current: propTypes.instanceOf(Element) }),
  ]),
  submitting: propTypes.bool,
  disabled: propTypes.bool,
}

export default SubmitButton
