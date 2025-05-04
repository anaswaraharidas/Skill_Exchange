
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Check if we're in development mode
if (import.meta.env.DEV) {
  console.log('Running in development mode');
  // Add any development-specific code here
}

// Find the root element
const rootElement = document.getElementById("root");

// Ensure the root element exists before rendering
if (rootElement) {
  createRoot(rootElement).render(<App />);
} else {
  console.error("Root element not found!");
}
