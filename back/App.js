/** Dependencies */
import 'regenerator-runtime/runtime'
import 'core-js/stable'
import React, {useState, useEffect} from 'react'
import { hot } from 'react-hot-loader/root'
import { Router } from 'react-router'
import './i18n';

/** Stylesheets */
import '@oms/react-ui-components/build/assets/main.css'
import 'Assets/stylesheets/main.scss'

/** Routing */
import history from 'Routes/history'
import RootRouter from 'Routes'

/** Components */
import Layout from 'Components/Shared/Layout/Layout'
import { ScrollTop } from '@oms/react-ui-components'
import Notification from 'Components/Shared/Notification/Notification';

/** Context */
import CombinedProvider from 'Hooks/contexts'

/** Utilities */
import internetChecker from 'Utils/internetConnectionControl';

const App = () => {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    internetChecker.on('isOnline', value => {
      setIsOnline(value)
    })
  }, [])

  return (<div className="main">
    <CombinedProvider>
      {!isOnline && (<Notification type="warning" toast>Şu an da internete bağlı değilsiniz..</Notification>)}
      <Router history={history}>
        <>
          <Layout>
            <RootRouter />
          </Layout>
        </>
      </Router>
    </CombinedProvider>
    <ScrollTop />
  </div>)
}

export default hot(App)
