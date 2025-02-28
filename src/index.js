import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import posthog from 'posthog-js'
import { Analytics } from '@vercel/analytics/react';

// Initialize PostHog
posthog.init(process.env.REACT_APP_POSTHOG_KEY, {
  api_host: 'https://app.posthog.com',  // Use your PostHog instance URL if self-hosted
  loaded: (posthog) => {
    if (process.env.NODE_ENV === 'development') posthog.debug()
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <Analytics />
  </React.StrictMode>
);

// Send pageview events to PostHog when measuring performance
reportWebVitals(({ name, value, id }) => {
  posthog.capture('web_vitals', {
    metric_name: name,
    metric_value: value,
    metric_id: id,
  });
});
