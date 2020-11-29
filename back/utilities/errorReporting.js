import Raven from 'raven-js'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import { version } from '../../package.json'

function configSentry() {
  if (window.HBConfig.NODE_ENV === 'Development') {
    return false
  }

  window.Raven = Raven

  const jwtCookie = Cookies.get('t_token_backoffice')

  if (jwtCookie && jwtDecode(jwtCookie)) {
    Raven.setUserContext({
      userId: jwtDecode(jwtCookie).userName,
    })
  }

  return Raven.config(window.HBConfig.SENTRY_REPORTING_KEY, {
    release: version,
    environment: window.HBConfig.NODE_ENV,
  }).install()
}

export default configSentry()
