import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import AgendaPage from '../features/agenda/pages/AgendaPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <AgendaPage />,
      },
    ],
  },
])

export default router
