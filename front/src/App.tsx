import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.scss'
import Assets from './components/Assets/Assets'
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './components/NotFound/NotFound';
import Settings from './components/Settings/Settings';
import Auth from './components/Auth/Auth';
import Dashboard from './components/Dashboard/Dashboard';
import Licences from './components/Licences/Licences';
import Accessories from './components/Accessories/Accessories';
import Users from './components/Users/Users';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import { useQuery } from '@tanstack/react-query';
import { store, persistor } from "./app/store"

function App() {
  const client = new QueryClient();

  return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={client}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Auth/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/assets" element={<Assets/>}/>
                <Route path="/licences" element={<Licences/>}/>
                <Route path="/accessories" element={<Accessories/>}/>
                <Route path="/users" element={<Users/>}/>
                <Route path="/settings" element={<Settings/>}/>
                <Route path="*" element={<NotFound/>}/>
              </Routes>
            </BrowserRouter>
          </QueryClientProvider>
          </PersistGate>
      </Provider>
  )
}

export default App
