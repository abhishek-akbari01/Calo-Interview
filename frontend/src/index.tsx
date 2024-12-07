import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const rootElement = document.getElementById('root');

// Ensure `rootElement` is not null by adding a runtime check or a type assertion
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement as HTMLElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
