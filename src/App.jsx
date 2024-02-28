import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools';
import Layout from './layouts/Layout'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Users from './pages/Users'
import Students from './pages/Students';
import Teachers from './pages/Teachers';
import ProtectedRoute, { ProtectedRouteForStuTeach } from './utils/ProtectedRoute';
import Subjects from './pages/Subjects';
import ConfirmEmail from './pages/ConfirmEmail';
import UserGroup from './pages/UserGroup';
import Groups from './pages/Groups';
import GroupDetail from './pages/GroupDetail';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
       <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/Users" element=
              {
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              } />
              <Route path='/Students' element=
              {
                <ProtectedRoute>
                  <Students />
                </ProtectedRoute>
              } />
              <Route path='/Teachers' element=
              {
                <ProtectedRoute>
                  <Teachers />
                </ProtectedRoute>
              }/>
              <Route path='/Subjects' element=
              {
                <ProtectedRoute>
                  <Subjects />
                </ProtectedRoute>
              } />
              <Route path='/Groups' element=
              {
                <ProtectedRouteForStuTeach>
                  <Groups />
                </ProtectedRouteForStuTeach>
              } />
              <Route path='/Groups/:id' element=
              {
                <ProtectedRouteForStuTeach>
                  <GroupDetail />
                </ProtectedRouteForStuTeach>
              } />
              <Route path='/UserGroup/:id' element={<UserGroup />}/>
              <Route path='EmailConfirmation' element={<ConfirmEmail />} />
              <Route path="/*" element={<NotFound />} />
            </Route>
          </Routes>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right'/>
    </QueryClientProvider>
  )
}

export default App
