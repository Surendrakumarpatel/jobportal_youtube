import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Jobs from './components/Jobs'
import Home from './components/Home'
import JobDescription from './components/JobDescription'
import Login from './components/auth/Login'
import Singup from './components/auth/Singup'
import Profile from './components/Profile'
import PostJob from './components/PostedJobs'
import Companies from './components/Companies'
import CompanySetup from './components/CompanySetup'
import CompanyCreate from './components/CompanyCreate'
import Browse from './components/Browse'
import CreateJobs from './components/admin/CreateJobs'
import ProtectedRoute from './components/admin/ProtectedRoute'
import Applicants from './components/admin/Applicants'

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/jobs",
    element: <Jobs />
  },
  {
    path: "/description/:id",
    element: <JobDescription />
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Singup />
  },
  {
    path:"/profile",
    element: <Profile/>
  },
  // Admin Dashboard Route Started
  {
    path:"/admin/jobs",
    element:<ProtectedRoute><PostJob/></ProtectedRoute> 
  },
  {
    path:"/admin/jobs/create",
    element:<ProtectedRoute><CreateJobs/></ProtectedRoute> 
  },
  {
    path:"/admin/jobs/:id/applicants",
    element:<ProtectedRoute><Applicants/></ProtectedRoute> 
  },
  {
    path:"/admin/companies",
    element:<ProtectedRoute><Companies/></ProtectedRoute>
  },
  {
    path:"/admin/companies/create",
    element:<ProtectedRoute><CompanyCreate/></ProtectedRoute> 
  },
  {
    path:"/admin/companies/:id",
    element:<ProtectedRoute><CompanySetup/></ProtectedRoute> 
  },
])

function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
