import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import Home from '@/features/home/Home'
import Badges from '@/components/ui/Badges'
import Missions from '@/features/missions/Missions'
import ModuleExplorador from '@/features/explorador/ModuleExplorador'
import IDE from '@/features/ide/IDE'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="badges" element={<Badges />} />
          <Route path="missions" element={<Missions />} />
          <Route path="module/explorador" element={<ModuleExplorador />} />
          <Route path="ide" element={<IDE />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
