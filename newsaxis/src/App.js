import './App.css';
import { Routes, Route } from 'react-router-dom'; // Correct import
import Layout from './layout/Layout';
import HomePage from './pages/HomePage';
import DynamicPage from './pages/DynamicPage';
import ManoramaNews from './pages/malayalam/ManoramaNews';
import MalayalamReels from './pages/malayalam/MalayalamReels';
import InstaPost from './instagram/InstaPost';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Define routes with Layout as a wrapper */}
        <Route path="/" element={<Layout />}>
          {/* Home page as the default route */}
          <Route index element={<HomePage />} />
          
          {/* Dynamic pages route */}
          <Route path=":section" element={<DynamicPage />} />
          <Route path='/manoramanews' element={<ManoramaNews />}></Route>
          <Route path='/malayalamreels' element={<MalayalamReels />}></Route>
          <Route path='/*' element={<NotFound />}></Route>
        </Route>
        <Route path='/instapost' element={<InstaPost />}></Route>
      </Routes>
    </div>
  );
}

export default App;
