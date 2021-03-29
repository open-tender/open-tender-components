import { useState, useEffect } from 'react'

const useRecaptcha = (siteKey) => {
  const [validSiteKey, setValidSiteKey] = useState(null)

  useEffect(() => {
    const loadScriptByURL = (id, url) => {
      const isScriptExist = document.getElementById(id)

      if (!isScriptExist) {
        var script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = url
        script.id = id
        script.onload = () => setValidSiteKey(siteKey)
        document.body.appendChild(script)
      }

      if (isScriptExist) setValidSiteKey(siteKey)
    }

    // load the script by passing the URL
    if (siteKey) {
      loadScriptByURL(
        'recaptcha-key',
        'https://www.google.com/recaptcha/api.js'
      )
    }
  }, [siteKey])

  return { siteKey: validSiteKey }
}

export default useRecaptcha
