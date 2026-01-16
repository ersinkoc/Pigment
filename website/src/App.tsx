import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Home } from '@/pages/Home';
import { Docs } from '@/pages/docs/Docs';
import { Introduction } from '@/pages/docs/Introduction';
import { Installation } from '@/pages/docs/Installation';
import { QuickStart } from '@/pages/docs/QuickStart';
import { API } from '@/pages/api/API';
import { Examples } from '@/pages/Examples';
import { Plugins } from '@/pages/Plugins';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="docs" element={<Docs />}>
            <Route index element={<Introduction />} />
            <Route path="installation" element={<Installation />} />
            <Route path="quick-start" element={<QuickStart />} />
          </Route>
          <Route path="api" element={<API />} />
          <Route path="examples" element={<Examples />} />
          <Route path="plugins" element={<Plugins />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
