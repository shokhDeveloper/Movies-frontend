import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from "react-redux"
import { ContextProvider, store } from './settings';
import { BrowserRouter as Router } from 'react-router-dom';
import {QueryClient, QueryClientProvider,} from "react-query"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const queryClient = new QueryClient()
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ContextProvider>
        <Router>
          <QueryClientProvider client={queryClient}>
          <App />
          </QueryClientProvider>
        </Router>
      </ContextProvider>
    </Provider>
  </React.StrictMode>
);