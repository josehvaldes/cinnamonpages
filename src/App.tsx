import {AppShell} from "@mantine/core";
import { Route, Routes } from "react-router-dom";
import { NavBar } from './components/Navbar';
import {Home} from "./components/Home";
import {Footer} from "./components/Footer";
import { ProductView } from "./components/ProductView";

export default function App() {
  return (
    <AppShell>
      <div className="bg-white text-gray-600 work-sans leading-normal text-base tracking-normal">

        <AppShell.Header>
          <NavBar />
        </AppShell.Header>
        
        <AppShell.Main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<div><h1>About Page</h1></div>} />
            <Route path="/product/:productSlug" element={<ProductView />} />
          </Routes>
          <Footer />
        </AppShell.Main>

      </div>
    </AppShell>
    
  );
};
