import { Route, Routes } from "react-router-dom";
import App from "./App";
import ReviewDetailInfo from "./components/ReviewDetailInfo/ReviewDetailInfo";

const RoutesComponent = () => (
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/detail/:id" element={<ReviewDetailInfo />} />
  </Routes>
);

export default RoutesComponent;
