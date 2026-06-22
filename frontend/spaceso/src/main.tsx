import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.tsx'
import { store } from "./store";
import { initAuth } from "./store/actions/authInit";

import { AuthProvider } from './contexts/AuthContext'

store.dispatch(initAuth());

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
)
