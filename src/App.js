import { BrowserRouter, Route, Routes } from "react-router-dom";

import Footer from "./components/Footer";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Likes from "./pages/Likes";
import Navbar from "./components/Navbar";
import Search from "./pages/Search";
import TagList from "./pages/TagList";
import Tags from "./pages/Tags";
import { Toaster } from "react-hot-toast";
import Video from "./pages/Video";
import Wildcard from "./pages/Wildcard";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/tag" element={<TagList />} />
                    <Route path="/tag/:tag" element={<Tags />} />
                    <Route path="/video/:id" element={<Video />} />
                    <Route path="/likes" element={<Likes />} />
                    <Route path="*" element={<Wildcard />} />
                </Routes>
            </Layout>
            <Footer />
            <Toaster
                position="top-right"
                toastOptions={{
                    style: {
                        background: "#161b22",
                        color: "#fff",
                    },
                }}
            />
        </BrowserRouter>
    );
}

export default App;
