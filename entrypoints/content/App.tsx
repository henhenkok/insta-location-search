import { memo } from "react";
import { MemoryRouter, Route, Routes } from "react-router";
import { MainPage } from "./pages/MainPage/MainPage";
import { SearchResultPage } from "./pages/SearchResultPage/SearchResultPage";

export const App = memo(() => {
  return (
    <div className='d-flex justify-content-end p-2'>
      <MemoryRouter>
        <Routes>
          <Route index path="/" element={<MainPage/>}/>
          <Route path="/search-result" element={<SearchResultPage/>}/>
        </Routes>
      </MemoryRouter>
    </div>
  );
});