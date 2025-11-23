import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import KPIPage from './pages/kpi/KPIPage';
import { Layout } from 'antd';

const App: React.FC = () => {
  return (
    <Router>
        <Layout style={{ minHeight: '100vh' }}>
            <Routes>
                <Route path="/" element={<Navigate to="/kpi" replace />} />
                <Route path="/kpi" element={<KPIPage />} />
                {/* Placeholder routes for other modules */}
                <Route path="/plan" element={<div>Marketing Plan (Coming Soon)</div>} />
                <Route path="/do" element={<div>Campaign Execution (Coming Soon)</div>} />
                <Route path="/check" element={<div>Reporting (Coming Soon)</div>} />
            </Routes>
        </Layout>
    </Router>
  );
};

export default App;
