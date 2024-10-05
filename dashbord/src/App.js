import React from 'react';
import { Route, Routes, BrowserRouter} from 'react-router-dom';
import GlobalDataPage from './pages/Global';
import Home from './pages/Home';
import GlobalMap3D from './pages/MapGl';
const App = () => {
  return (
    <BrowserRouter>
     
        <Routes>
          <Route path="/global-data" element={<GlobalDataPage />} />
          <Route path="/local-cases" element={<>hello2</>} />
          <Route path="/proposed-solutions" element={<>Hello</>} />
          <Route path="/interactive-maps" element={<GlobalMap3D/>} />
          <Route path="/ai-chatbot" element={<>Hello chat</>} />
          
          <Route exact path="/" element={<Home />} />
        </Routes>
   
    </BrowserRouter>
  );
};

export default App;
