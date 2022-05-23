import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import "./App.css";
import ReviewDetail from "./components/ReviewDetail/ReviewDetail";
import { IDetail, reviewList } from "./utils/reviews";

function App() {
  const [reviews, setReviews] = useState<IDetail[]>([]);
  const location = useLocation();
  const state = location.state as IDetail;

  useEffect(() => {
    if (location.state) {
      const newReviews = [...reviews];
      const foundUpdatedReview = newReviews.findIndex(
        (item) => item.id === state.id
      );
      newReviews.splice(foundUpdatedReview, 1, state);
      setReviews(newReviews);
    }
    setReviews(reviewList);
  }, [location.state, reviews, state]);

  return (
    <>
      <div className="container">
        {reviews.map((item) => (
          <ReviewDetail key={item.id} detail={item} />
        ))}
      </div>
    </>
  );
}

export default App;
