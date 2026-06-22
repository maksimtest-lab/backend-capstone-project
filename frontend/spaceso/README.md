# React + Vite + Firebase

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

---

## Project Structure

```
src/
  components/      # Components
  consts/          # Constants
  firebase/        # Firebase config and utils
  helpers/         # Helpers
  hooks/           # Custom React hooks
  pages/           # Page components
  store/           # Redux store
  utils/           # Utils
  App.jsx          # Main App component
  main.jsx         # Entry point
  index.css        # Global styles
```

---

## Firebase Configuration

1. **Create a Firebase project** at [Firebase Console](https://console.firebase.google.com/).
2. **Register your app** and get your Firebase config object.
3. **Install Firebase SDK**:

   ```sh
   npm install firebase
   ```

4. **Add your Firebase config to `.envrc`** (or `.env.local`):

   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

5. **All acess is a Firebase config file** (e.g. `src/firebase/config.js`):

   ```js
   // src/firebase/config.js
   import { initializeApp } from "firebase/app";

   const firebaseConfig = {
     apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
     authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
     projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
     storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
     messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
     appId: import.meta.env.VITE_FIREBASE_APP_ID,
   };

   export const app = initializeApp(firebaseConfig);
   ```

---

## Deployment

1. **Build the project**:

   ```sh
   npm run build
   ```

2. **Deploy to Firebase Hosting**:

   - Install Firebase CLI:  
     `npm install -g firebase-tools`
   - Login:  
     `firebase login`
   - Initialize hosting (if not done):  
     `firebase init hosting`
   - Deploy:  
     `firebase deploy`

---

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## API

This project uses [Spaceflight News API](https://spaceflightnewsapi.net/) for getting news and articles related to space.
