// common - Utilities for msikma library projects <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

import request from 'request'
import throttleRequest from 'throttled-request'
import FileCookieStore from 'file-cookie-store-sync'

// Create a modified request() function that uses throttling.
const throttledRequest = throttleRequest(request)

// Configures the throttled request library.
const configureThrottling = (config = {}) => {
  throttledRequest.configure({ requests: 2, milliseconds: 1000, ...config })
}

// Set default throttling values.
configureThrottling()

// Headers similar to what a regular browser would send.
export const browserHeaders = {
  'Accept-Language': 'en-US,en;q=0.9,ja;q=0.8,nl;q=0.7,de;q=0.6,es;q=0.5,it;q=0.4,pt;q=0.3',
  'Upgrade-Insecure-Requests': '1',
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.167 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
  'Cache-Control': 'max-age=0',
  'Connection': 'keep-alive'
}

/**
 * Loads cookies from a specified cookies.txt file and loads them into
 * a jar so that we can make requests with them.
 */
export const loadCookieFile = (cookieFile) => (
  new Promise((resolve, reject) => {
    try {
      // Cookies exported from the browser in Netscape cookie file format.
      // These are sent with our request to ensure we have access to logged in pages.
      const cookieStore = new FileCookieStore(cookieFile, { no_file_error: true })
      const jar = request.jar(cookieStore)
      resolve(jar)
    }
    catch (err) {
      reject(err)
    }
  })
)

// Default settings for requests.
const requestDefaults = {
  gzip: true
}

// As requestURI(), but throttled.
export const throttledRequestURI = (url, fullResponse = false, headers = {}, ...props) =>
  requestURI(url, fullResponse, headers, true, ...props)

// Requests a URI using our specified browser headers as defaults.
// This function has a higher chance of being permitted by the source site
// since it's designed to look like a normal browser request rather than a script.
// The request() function returns a promise, so remember to await.
const requestURI = (url, fullResponse = false, headers = {}, throttle = false, etc = {}) => new Promise((resolve, reject) => (
  (throttle ? throttledRequest : request)(
    { url, headers: { ...browserHeaders, ...(headers != null ? headers : {}) }, ...requestDefaults, ...etc },
    (err, res) => {
      if (err) return reject(err)
      resolve(fullResponse ? res : res.body)
    }
  )
))

export default requestURI
