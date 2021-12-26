import { useState, useEffect, useRef } from 'react'

const useDineInForm = (initialData = {}, submitGuest) => {
  const submitRef = useRef(null)
  const inputRef = useRef(null)
  const [data, setData] = useState(initialData)
  const [errMsg, setErrMsg] = useState(null)

  useEffect(() => {
    if (errMsg) inputRef.current.focus()
  }, [errMsg])

  const handleChange = (evt) => {
    const { id, value } = evt.target
    setData({ ...data, [id]: value })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    if (!data.first_name || !data.last_name) {
      setErrMsg('Both first and last name are required')
    } else {
      submitGuest({ customer: data })
    }
    submitRef.current.blur()
  }

  return {
    submitRef,
    inputRef,
    data,
    errMsg,
    handleChange,
    handleSubmit,
  }
}

export default useDineInForm
