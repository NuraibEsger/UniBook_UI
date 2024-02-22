import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query'
import Layout from './layouts/Layout'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Users from './pages/Users'

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
       <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/Users" element={<Users />} />
              <Route path="/*" element={<NotFound />} />
            </Route>
          </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
