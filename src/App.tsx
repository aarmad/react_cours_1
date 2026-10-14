import { BrowserRouter, Route, Routes } from 'react-router';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { ShoppingListProvider } from './context/ShoppingListContext';
import { CatalogPage } from './pages/CatalogPage';
import { LoginPage } from './pages/LoginPage';
import { NewRecipePage } from './pages/NewRecipePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { RecipePage } from './pages/RecipePage';
import { ShoppingListPage } from './pages/ShoppingListPage';

export function App() {
  return (
    <AuthProvider>
      <ShoppingListProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<CatalogPage />} />
              <Route path="recettes/:id" element={<RecipePage />} />
              <Route path="courses" element={<ShoppingListPage />} />
              <Route path="connexion" element={<LoginPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="proposer" element={<NewRecipePage />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ShoppingListProvider>
    </AuthProvider>
  );
}

export default App;
