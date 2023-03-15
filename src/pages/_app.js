import { store } from '../redux/store'
import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { Provider } from 'react-redux'
import { endpoints as TopicEndPoints } from '../redux/apiSlicers/Topic'
import { endpoints as AnnouncementEndpoints } from '../redux/apiSlicers/Announcement'
import { endpoints as CategoryEndpoints } from '../redux/apiSlicers/Category'
import { endpoints as IdeaEndpoints } from '../redux/apiSlicers/Idea'
import { endpoints as TermEndpoints } from '../redux/apiSlicers/Term'
import { endpoints as RoleEndpoints } from '../redux/apiSlicers/Role'
import { endpoints as UserEndpoints } from '../redux/apiSlicers/User'
import { useEffect } from 'react'

function App({ Component, pageProps }) {
  useEffect(() => {
    store.dispatch(TopicEndPoints.getTopics.initiate())
    store.dispatch(AnnouncementEndpoints.getAnnouncements.initiate())
    store.dispatch(CategoryEndpoints.getCategories.initiate())
    store.dispatch(IdeaEndpoints.getIdeas.initiate())
    store.dispatch(TermEndpoints.getTermAndCondition.initiate())
    store.dispatch(RoleEndpoints.getRoles.initiate())
    store.dispatch(UserEndpoints.getUsers.initiate())
  }, [])

  return <SessionProvider session={pageProps.session}>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  </SessionProvider>

}

export default App
