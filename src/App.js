import React from 'react';
import CampaignsList from './components/campaigns-list/CampaignsList';
import Campaign from './components/edit-campaign/Campaign';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
          <Router>
              <Routes>
                  <Route path="/" element={<CampaignsList />} />
                  <Route path="/edit/:id" element={<Campaign />} /> {/* Страница редактирования */}
              </Routes>
          </Router>
  );
};

export default App;
