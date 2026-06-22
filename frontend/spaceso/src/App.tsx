import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Layout } from "./components";
import { LoginPage, MainPage, RegistrationPage, UserProfile } from './pages';
import { ROUTES } from "./consts/routes";
import { ArticlesPage } from "./pages";
import { ArticlePage } from "./pages";
import { NewsListPage } from "./pages";
import { NewsPage } from "./pages";
import { Settings } from "./pages";
import { PageNotFound } from "./pages";
import { PrivateRoute } from "./components";
import "./App.sass";

function App() {
  return (
    <>
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path={ROUTES.HOME.url} element={<MainPage />} />
                    <Route path={ROUTES.ARTICLES.url} element={<ArticlesPage />} />
                    <Route path={ROUTES.ARTICLE.url} element={<ArticlePage />} />
                    <Route path={ROUTES.ARTICLES_PAGE.url} element={<ArticlesPage />} />
                    <Route path={ROUTES.NEWSLIST.url} element={<NewsListPage />} />
                    <Route path={ROUTES.NEWSLIST_PAGE.url} element={<NewsListPage />} />
                    <Route path={ROUTES.NEWS.url} element={<NewsPage />} />

                    <Route path={ROUTES.SETTINGS.url} element={<PrivateRoute><Settings /></PrivateRoute>} />
                    <Route path={ROUTES.PROFILE.url} element={<PrivateRoute><UserProfile /></PrivateRoute>} />
                    <Route path={ROUTES.LOGIN.url} element={<LoginPage />} />
                    <Route path={ROUTES.REGISTRATION.url} element={<RegistrationPage />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    </>
  )
}

export default App
