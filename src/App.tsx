// Fait avec Claude.ai
import { BrowserRouter, Route, Routes } from 'react-router';
import { Layout } from './components/Layout';
import { CatalogPage } from './pages/CatalogPage';
import { LoginPage } from './pages/LoginPage';
import { NewRecipePage } from './pages/NewRecipePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { RecipePage } from './pages/RecipePage';
import { ShoppingListPage } from './pages/ShoppingListPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<CatalogPage />} />
          <Route path="recettes/:id" element={<RecipePage />} />
          <Route path="courses" element={<ShoppingListPage />} />
          <Route path="connexion" element={<LoginPage />} />
          <Route path="proposer" element={<NewRecipePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
