import { FC, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ReactStars from "react-rating-stars-component";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Rating } from "@mui/material";
import { IDetail } from "../../utils/reviews";

type Detail = {
  detail: IDetail;
};

const ReviewDetail: FC<Detail> = ({
  detail: { id, author, place, published_at, rating, content, comment },
}) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ width: "80%", marginTop: 15 }}>
      <CardContent>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ flex: 1 }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", cursor: "pointer" }}
              onClick={() =>
                navigate(`/detail/${id}`, {
                  state: {
                    detailInfo: {
                      id,
                      author,
                      place,
                      published_at,
                      rating,
                      content,
                      comment,
                    },
                  },
                })
              }
            >
              {place}
            </Typography>
            <Rating name="simple-controlled" value={rating} disabled />
            <Typography color="text.secondary">{content}</Typography>
          </div>
          <div style={{ bottom: 0, display: "flex", flexDirection: "row" }}>
            <Typography>
              {author} - {moment(published_at).format("MM/DD/YYYY")}
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewDetail;
