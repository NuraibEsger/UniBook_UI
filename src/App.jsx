import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

function App() {
  return (
       <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />

              <Route path="/*" element={<NotFound />} />
            </Route>
          </Routes>
      </Router>
  )
}

export default App
