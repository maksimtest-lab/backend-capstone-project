import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.tsx'
import store from './store'
import { AuthProvider } from './contexts/AuthContext'

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
)
