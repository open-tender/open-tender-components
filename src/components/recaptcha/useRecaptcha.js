import { useState, useEffect } from 'react'

const useRecaptcha = (siteKey) => {
  const [validSiteKey, setValidSiteKey] = useState(null)

  useEffect(() => {
    const onloadCallback = () => {
      console.log('this is happening')
      setValidSiteKey(siteKey)
    }

    const loadScriptByURL = (id, url, callback) => {
      const isScriptExist = document.getElementById(id)

      if (!isScriptExist) {
        console.log('script does not exist')
        var script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = url
        script.id = id
        script.onload = function () {
          if (callback) callback()
        }
        document.head.appendChild(script)
      }

      if (isScriptExist && callback) {
        console.log('script exists')
        callback()
      }
    }

    // load the script by passing the URL
    if (siteKey) {
      loadScriptByURL(
        'recaptcha-key',
        'https://www.google.com/recaptcha/api.js',
        onloadCallback
      )
    }
  }, [siteKey])

  return { siteKey: validSiteKey }
}

export default useRecaptcha
