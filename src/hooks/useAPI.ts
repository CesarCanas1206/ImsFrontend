import { siteName, storageGet } from 'src/utilities/localStorage'

/** URL for API endpoint - can be changed to local if running locally but should not be pushed */
//const mainUrl = 'https://apps.imscomply.com.au/ims-api/'
// const mainUrl = 'http://local-ims-apps.com.au/ims-api/'
const mainUrl = 'http://localhost:8000/'

/**
 * The main API call function that get/post/put/doDelete use
 * The header must contain x-site-name to determine which client's db is being used
 * Authorised endpoints must contain a valid token - taken from local storage (storageGet)
 */
export const call: any = async ({
  url,
  endpoint,
  method = 'GET',
  getData = true,
  getBlob = false,
  sentToken,
  data,
  customHeaders = undefined,
  retry = false,
}: any) => {
  url = url ?? mainUrl
  const token = storageGet('token')

  if (typeof endpoint === 'undefined' || endpoint.includes('{')) {
    return []
  }

  let defaultHeaders: any = !['login', 'auth'].includes(endpoint)
    ? { Authorization: `Bearer ${sentToken || token}` }
    : {}

  if (typeof customHeaders === 'undefined') {
    customHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  }

  const info: RequestInit = {
    method,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    headers: {
      ...customHeaders,
      'x-site-name': siteName,
      ...defaultHeaders,
    },
    body: data,
  }

  try {
    const response = await fetch(`${url}${endpoint}`, info)
    if (!response.ok) {
      /** If not logging in/out and unauthorised, logout */
      if (
        !['login', 'auth', 'logout'].includes(endpoint) &&
        response.status === 401
      ) {
        window.location.href = `/${siteName}/logout`
        return false
      }
      /** Retry on first failure if 500 error */
      if (response.status === 500 && !retry) {
        console.log(`Failed once, retrying - ${endpoint}`)
        return await call({
          url,
          endpoint,
          method,
          getData,
          getBlob,
          sentToken,
          data,
          customHeaders,
          retry: true,
        })
      }
      return false
    }
    if (getBlob) {
      const blob = await response.blob()
      return blob
    }
    const result = await response.json()
    return getData ? result.data || [] : result
  } catch (error) {
    return []
  }
}

export const get = async (props: any) =>
  call({
    ...props,
    method: 'GET',
  })

export const post = async ({
  endpoint,
  type = 'FORM',
  method = 'POST',
  data,
  sentToken,
  getData = true,
  getBlob = false,
  url,
}: any) => {
  let sendData: any = null

  let customHeaders = undefined
  if (typeof data?.append !== 'undefined') {
    sendData = data
    customHeaders = {
      Accept: 'application/json',
    }
  } else if (Array.isArray(data)) {
    sendData = new FormData()
    data.forEach((item) => {
      sendData.append(item.name, item.value)
    })
    customHeaders = {
      Accept: 'application/json',
    }
  } else if (typeof data === 'object' && data !== null) {
    sendData = JSON.stringify(data)
  }

  return call({
    endpoint,
    type,
    method,
    sentToken,
    getData,
    getBlob,
    data: sendData !== null ? sendData : data,
    url,
    customHeaders,
  })
}

export const put = async (props: any) =>
  post({
    ...props,
    method: 'PUT',
  })

export const upload = async (props: any) =>
  post({
    ...props,
    customHeaders: {
      Accept: 'application/json',
    },
  })

export const doDelete = async (props: any) =>
  call({
    ...props,
    method: 'DELETE',
  })

/**
 *  This hook allows for access to the same functions but a different url can be sent
 */
function useAPI({ url }: any = {}) {
  if (!url) {
    url =
      (typeof process !== 'undefined' && process?.env?.REACT_APP_API) || mainUrl
  }

  return {
    call: async (props: any) => await call({ ...props, url }),
    get: async (props: any) => await get({ ...props, url }),
    post: async (props: any) => await post({ ...props, url }),
    put: async (props: any) => await put({ ...props, url }),
    upload: async (props: any) => await upload({ ...props, url }),
    doDelete: async (props: any) => await doDelete({ ...props, url }),
  }
}

export default useAPI
