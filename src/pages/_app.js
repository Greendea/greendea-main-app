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
import { endpoints as ExternalEnpoint } from '../redux/apiSlicers/_index'
import { useSession } from "next-auth/react"

import { useEffect } from 'react'

function Wrapper({ children }) {
  useEffect(() => {
    store.dispatch(TopicEndPoints.getTopics.initiate())
    store.dispatch(AnnouncementEndpoints.getAnnouncements.initiate())
    store.dispatch(CategoryEndpoints.getCategories.initiate())
    store.dispatch(IdeaEndpoints.getIdeas.initiate())
    store.dispatch(TermEndpoints.getTermAndCondition.initiate())
    store.dispatch(RoleEndpoints.getRoles.initiate())
    store.dispatch(UserEndpoints.getUsers.initiate())
  }, [])

  const { data: session } = useSession()

  useEffect(() => {
    let triggerOnline
    if (session?.user?.email) {
      store.dispatch(IdeaEndpoints.getPersonalIdeas.initiate())
      triggerOnline = setInterval(() => {
        store.dispatch(ExternalEnpoint.activeUser.initiate(session.user.email))
      }, 1000);
    }
    return () => {
      clearInterval(triggerOnline);
    };
  }, [session])


  return <>
    {children}
  </>
}

function App({ Component, pageProps }) {
  return <SessionProvider session={pageProps.session}>
    <Provider store={store}>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </Provider>
  </SessionProvider>

}

export default App
