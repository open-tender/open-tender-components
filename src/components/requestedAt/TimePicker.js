import React, { useEffect, useMemo, useRef, useState } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { makeTimeIntervals, fmtDate } from '@open-tender/js'
import { ButtonStyled, Preface } from '..'

const TimePickerContainer = styled('div')`
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  // background-color: ${(props) => props.theme.overlay.dark};
  background-color: rgba(0, 0, 0, 0.4);
`

const TimePickerView = styled('div')`
  width: 100%;
  padding: 1.5rem 1rem 1.5rem;
  border-radius: 1.4rem;
  background-color: ${(props) => props.theme.colors.light};
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0.6rem 2rem rgba(0, 0, 0, 0.13);
`

const TimePickerLabel = styled('div')`
  width: 25%;
  text-align: center;
`

const TimePickerLabelText = styled(Preface)`
  font-size: ${(props) => props.theme.fonts.sizes.h4};
  color: ${(props) => props.theme.colors.primary};
`

const TimePickerSelect = styled('div')`
  width: 50%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const TimePickerConfirm = styled('div')`
  width: 25%;
  display: flex;
  justify-content: center;
`

const TimePickerTimes = styled('div')`
  width: 100%;
  height: 6rem;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`

const TimePickerTimeText = styled(Preface)`
  font-size: ${(props) => props.theme.fonts.sizes.h2};
  color: ${(props) => props.theme.colors.primary};
  line-height: 0.9;
`

const TimePickerTimeView = styled('div')`
  width: 100%;
  height: 100%;
  padding: 0 0 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    display: block;
  }

  span + span {
    font-size: ${(props) => props.theme.fonts.sizes.h3};
    line-height: 1.1;
    margin: 0 0 0 1rem;
  }
`
const TimePickerSelectButton = styled('button')`
  display: block;
  padding: 0.5rem 1.5rem;
`

const ArrowUp = styled('span')`
  display: block;
  width: 0;
  height: 0;
  margin: 0;
  border-left: 1rem solid transparent;
  border-right: 1rem solid transparent;
  border-bottom: 1rem solid ${(props) => props.theme.colors.primary};
  opacity: ${(props) => (props.visible ? '1' : 0)};
  transition: all 0.15s ease;
`

const ArrowDown = styled('span')`
  display: block;
  width: 0;
  height: 0;
  margin: 0;
  border-left: 1rem solid transparent;
  border-right: 1rem solid transparent;
  border-top: 1rem solid ${(props) => props.theme.colors.primary};
  opacity: ${(props) => (props.visible ? '1' : 0)};
  transition: all 0.15s ease;
`

const TimePickerTime = ({ label, index }) => {
  const [hour, ampm] = label.split(' ')
  return (
    <TimePickerTimeView name="time-slot" id={`time-${index}`}>
      <TimePickerTimeText>{hour}</TimePickerTimeText>
      <TimePickerTimeText>{ampm}</TimePickerTimeText>
    </TimePickerTimeView>
  )
}

TimePickerTime.displayName = 'TimePickerTime'
TimePickerTime.propTypes = {
  label: propTypes.string,
  index: propTypes.number,
}

const TimePickerButtonView = styled('div')`
  button {
    position: relative;
    width: 4.6rem;
    height: 4.6rem;
    padding: 0;
    border-radius: 2.3rem;

    &:disabled {
      opacity: 0.5;
    }
  }
`

const CheckmarkTick = styled('span')`
  display: block;

  &:after {
    position: absolute;
    left: 1.1rem;
    top: 2.3rem;
    height: 2.2rem;
    width: 1.2rem;
    border-right: 0.4rem solid ${(props) => props.theme.colors.light};
    border-top: 0.4rem solid ${(props) => props.theme.colors.light};
    content: '';
    opacity: 1;
    transform-origin: left top;
    transform: scaleX(-1) rotate(135deg);
  }
`

const TimePickerButton = ({ onClick, disabled }) => {
  return (
    <TimePickerButtonView>
      <ButtonStyled onClick={onClick} disabled={disabled}>
        <CheckmarkTick />
      </ButtonStyled>
    </TimePickerButtonView>
  )
}

TimePickerButton.displayName = 'TimePickerButton'
TimePickerButton.propTypes = {
  onClick: propTypes.func,
  disabled: propTypes.bool,
}

const getActiveElement = (elements, topOffset) => {
  const filtered = elements.filter(
    (i) => i.getBoundingClientRect().top <= topOffset
  )
  const active = filtered.reduce(
    (max, i) =>
      max && max.getBoundingClientRect().top > i.getBoundingClientRect().top
        ? max
        : i,
    null
  )
  return active
}

// const Triangle = styled('span')`
//   display: block;
//   width: 1.4rem;
//   height: 1.4rem;
//   border-top: 0.2rem solid ${(props) => props.theme.colors.primary};
//   border-left: 0.2rem solid ${(props) => props.theme.colors.primary};
//   opacity: ${(props) => (props.visible ? '1' : 0)};
//   transform: rotate(${(props) => `${props.degrees}deg`});
// `

const TimePicker = ({
  date,
  setDate,
  selectTime,
  interval,
  excludeTimes,
  minTime,
  maxTime,
}) => {
  const scrollRef = useRef(null)
  const [time, setTime] = useState(null)
  const [active, setActive] = useState(0)
  const [offset, setOffset] = useState(0)
  const [selected, setSelected] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const hasDate = !!date
  const dateStr = date ? fmtDate(date, 'M/d') : null
  const intervals = useMemo(
    () => makeTimeIntervals(date, minTime, maxTime, interval, excludeTimes),
    [date, minTime, maxTime, interval, excludeTimes]
  )
  const lastIndex = intervals ? intervals.length - 1 : 0
  const parent = scrollRef.current

  const handleClose = (evt) => {
    if (evt.target.id === 'time-picker-container') {
      setDate(null)
      setTime(null)
      setActive(0)
      setOffset(0)
    }
  }

  const chooseTime = () => {
    selectTime(time)
    setSelected(true)
  }

  useEffect(() => {
    const selected = intervals.find((i, idx) => idx === active)
    if (selected) {
      setTime(selected.value)
      if (parent) {
        const parentOffset = parent.getBoundingClientRect().height * active
        setOffset(parentOffset)
      }
    }
  }, [active, intervals, parent])

  useEffect(() => {
    if (parent) parent.scrollTop = offset
  }, [parent, offset])

  useEffect(() => {
    let timer = null
    const handleScroll = () => {
      setShowTop(parent.scrollTop > 0)
      if (timer !== null) {
        clearTimeout(timer)
      }
      timer = setTimeout(function () {
        const elements = Array.from(document.getElementsByName('time-slot'))
        const topOffset =
          parent.getBoundingClientRect().top +
          parent.getBoundingClientRect().height / 2
        const activeElement = getActiveElement(elements, topOffset)
        const activeIndex = activeElement
          ? parseInt(activeElement.id.split('-')[1])
          : 0
        setActive(activeIndex)
      }, 150)
    }
    if (parent) {
      parent.addEventListener('scroll', handleScroll)
      return () => {
        parent.removeEventListener('scroll', () => handleScroll)
      }
    }
  }, [parent])

  return (
    <TransitionGroup component={null}>
      {hasDate ? (
        <CSSTransition
          key="modal"
          classNames="md"
          timeout={{ enter: 250, exit: 250 }}
        >
          <TimePickerContainer id="time-picker-container" onClick={handleClose}>
            <TimePickerView>
              <TimePickerLabel>
                <TimePickerLabelText>{dateStr}</TimePickerLabelText>
              </TimePickerLabel>
              <TimePickerSelect>
                <TimePickerSelectButton
                  onClick={() => setActive(Math.max(active - 1, 0))}
                  disabled={!showTop}
                >
                  <ArrowUp visible={showTop} />
                </TimePickerSelectButton>
                <TimePickerTimes ref={scrollRef}>
                  {intervals.map((t, index) => (
                    <TimePickerTime
                      key={t.label}
                      label={t.label}
                      index={index}
                    />
                  ))}
                </TimePickerTimes>
                <TimePickerSelectButton
                  onClick={() => setActive(Math.min(active + 1, lastIndex))}
                  disabled={active === lastIndex}
                >
                  <ArrowDown visible={true} />
                </TimePickerSelectButton>
              </TimePickerSelect>
              <TimePickerConfirm>
                <TimePickerButton
                  disabled={!time ? true : false}
                  onClick={chooseTime}
                />
              </TimePickerConfirm>
            </TimePickerView>
          </TimePickerContainer>
        </CSSTransition>
      ) : null}
    </TransitionGroup>
  )
}

TimePicker.displayName = 'TimePicker'
TimePicker.propTypes = {
  date: propTypes.object,
  setDate: propTypes.func,
  selectTime: propTypes.func,
  interval: propTypes.number,
  excludeTimes: propTypes.array,
  minTime: propTypes.number,
  maxTime: propTypes.number,
}

export default TimePicker
