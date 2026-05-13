import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import AgendaProvider from '../features/agenda/context/AgendaProvider'
import AgendaPage from '../features/agenda/pages/AgendaPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        element: <AgendaProvider />,
        children: [
          {
            index: true,
            element: <AgendaPage />,
          },
        ],
      },
    ],
  },
])

export default router
