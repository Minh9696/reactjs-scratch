import React from "react";
import './styles.scss';
import { Route, Routes} from "react-router-dom";
import ListPage from "./pages/ListPage";
import DetailPage from "./pages/DetailPage";
import NotFound from "../../components/NotFound";


function TodoFeature(props) {
    return (
        <div>
            <Routes>
                <Route path="/" element={<ListPage/>} exact />
                <Route path='/:todoId' element={<DetailPage/>} exact />
                <Route element={<NotFound/>} />
            </Routes>
        </div>
    )
}

export default TodoFeature;