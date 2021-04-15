//import './App.css';
import React, { useMemo, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { routes } from './routes';
import { NotFound } from './pages/notFound';
import { UserContext } from './contexts/UserContext';
import { QueryClient, QueryClientProvider } from 'react-query';

export function App() {

  const [user, setUser] = useState(useState(null));
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

const queryClient = new QueryClient();

  return (
    <Router>
      <UserContext.Provider value={value}>
          <QueryClientProvider client={queryClient}>
            <Switch>
            {/* for entered routes */}
              {routes.map((props, key) => (
                <Route exact key={key} {...props} />
              ))}
              { /* for every route that is not entered */}
              <Route path="*">
                <NotFound />
              </Route>
            </Switch> 
          </QueryClientProvider>
      </UserContext.Provider>
    </Router>
  );
}