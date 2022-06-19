import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
// import { ApolloClient, ApolloProvider } from '@apollo/client';
import {Provider} from 'react-redux';
import store from './redux/store';

import './index.css';

// const client = new ApolloClient({
//   uri: 'http://localhost:4000'
// })

const container = document.getElementById('root');
const root = createRoot(container)
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
)

// const root = createRoot(document.getElementById('root'))
// root.render(
//   <BrowserRouter>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </BrowserRouter>
// )

reportWebVitals();
