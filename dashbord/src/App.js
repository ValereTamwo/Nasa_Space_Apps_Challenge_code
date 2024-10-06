import React from 'react';
import { Route, Routes, BrowserRouter} from 'react-router-dom';
import Home from './pages/Home';
import MyChart from './pages/MapGl';
import DashboardHeader from './pages/Global';
const App = () => {
  return (
    <BrowserRouter>
     
        <Routes>
          <Route path="/global-data" element={<DashboardHeader />} />
          <Route path="/local-cases" element={<>hello2</>} />
          <Route path="/proposed-solutions" element={<>Hello</>} />
          <Route path="/interactive-maps" element={<MyChart/>} />
          <Route path="/ai-chatbot" element={<>Hello chat</>} />
          
          <Route exact path="/" element={<Home />} />
        </Routes>
   
    </BrowserRouter>
  );
};

export default App;
