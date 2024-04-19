import './App.css';
import { useSelector } from 'react-redux';
import { RootState } from './settings/redux/combine';
import { InitialStateInterface } from './settings/types';
import { Navigate, Route, Routes } from 'react-router';
import { Account, Admin, AdminPrivate, Home } from './pages';
import {Home as PublicHome} from "./Public"
import { Header } from './components';
import React from 'react';
function App() {
  const { token }: InitialStateInterface = useSelector((state: RootState) => state.Reducer);
  return (
    <React.Fragment>
    <Header/>
        <main>
      <Routes>
          {token ? (
            <React.Fragment>
              <Route path='/' element={<Home/>}></Route>
              <Route path='/home' element={<Home/> } />
              <Route path='/account' element={<Account/>}/>
              <Route path='/admin' element={<AdminPrivate/>}/>
              <Route path='*' element={<Navigate replace={true} to={"/"}/>}/>
            </React.Fragment>
          ) : (
            <React.Fragment>
            <Route path='/*' element={<PublicHome/>}></Route>
            <Route path='*' element={<Navigate replace={true} to={"/"}/>}/>
            </React.Fragment>
          )}
      </Routes>
        </main>
    </React.Fragment>
  );
}

export default App;
