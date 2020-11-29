/** Dependencies */
import axios from 'axios'

/** Utilites */
import internetChecker from 'Utils/internetConnectionControl'

class Fetch {
  constructor(options) {
    this.instance = axios.create({
      ...options,
      withCredentials: true,
    })

    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          window.location.href = error.response.data.ReturnUrl + encodeURIComponent(window.location.href)
        }

        if (!window.navigator.onLine) {
          internetChecker.emit('isOnline', false)
        } else {
          internetChecker.emit('isOnline', true)
        }

        return Promise.reject(error)
      }
    )

    this.instance.interceptors.request.use(
      (request) => {
        if (!window.navigator.onLine) {
          internetChecker.emit('isOnline', false)
        } else {
          internetChecker.emit('isOnline', true)
        }

        return request
      },
      (error) => Promise.reject(error)
    )
  }

  get(...params) {
    return this.instance.get(...params)
  }

  post(...params) {
    return this.instance.post(...params)
  }

  put(...params) {
    return this.instance.put(...params)
  }

  delete(...params) {
    return this.instance.delete(...params)
  }
}

export default Fetch
