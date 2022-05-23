import {
  Button,
  Card,
  CardContent,
  IconButton,
  Paper,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { IComment, IDetail } from "../../utils/reviews";
import { Edit } from "@mui/icons-material";

interface ReviewDetail {
  detailInfo: IDetail;
}

const ReviewDetailInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as ReviewDetail;
  const [reviewInfo] = useState<ReviewDetail>(state);
  const [editMode, setEditMode] = useState<boolean>(
    !reviewInfo.detailInfo.comment.content.length || false
  );
  const [commentInfo, setCommentInfo] = useState<IComment>(
    reviewInfo.detailInfo.comment
  );
  const [updatedValue, setUpdatedValue] = useState<IDetail>();
  const disabled = !commentInfo.content.length || !commentInfo.creator.length;

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentInfo({
      ...commentInfo,
      [event.target.name]: event.target.value,
      date: moment().format("MM/DD/YYYY") as string,
    });
  };

  const handleOnSave = () => {
    const newDetailUpdated = { ...reviewInfo.detailInfo };
    newDetailUpdated.comment = commentInfo;
    setUpdatedValue(newDetailUpdated);
    setEditMode(false);
  };

  const displayEditableCommentField = () => (
    <>
      <Stack
        component="form"
        sx={{
          width: "80%",
          alignItems: "center",
          marginLeft: "10%",
        }}
        spacing={2}
        noValidate
        autoComplete="off"
      >
        <TextField
          label="Enter your comment here"
          value={commentInfo.content}
          name="content"
          onChange={handleCommentChange}
          variant="filled"
          inputProps={{ "data-testid": "comment-field" }}
          fullWidth
        />
        <TextField
          label="Enter your name here"
          name="creator"
          value={commentInfo.creator}
          inputProps={{ "data-testid": "creator-field" }}
          onChange={handleCommentChange}
          variant="filled"
          size="small"
          fullWidth
        />
      </Stack>
      <div style={{ float: "right" }}>
        <Button
          onClick={() => setEditMode(false)}
          variant="contained"
          disabled={disabled}
          data-testId="cancel-button"
          role="button"
        >
          Cancel
        </Button>
        <Button
          sx={{ marginLeft: 2, backgroundColor: "green" }}
          onClick={handleOnSave}
          variant="contained"
          disabled={disabled}
          data-testId="save-button"
          role="button"
        >
          Save
        </Button>
      </div>
    </>
  );

  const displayCommentField = () => (
    <div style={{ marginLeft: 20 }}>
      {!!commentInfo.content.length ? (
        <>
          <Typography sx={{ fontWeight: "bold" }}>
            {commentInfo.content}
          </Typography>
          <Typography sx={{ float: "bottom" }}>
            {commentInfo.creator} - {commentInfo.date}{" "}
          </Typography>
        </>
      ) : (
        displayEditableCommentField()
      )}
    </div>
  );
  const { place, rating, content, author, published_at } =
    reviewInfo.detailInfo;
  return (
    <div style={{ marginLeft: "20%" }}>
      <Card sx={{ width: "80%", marginTop: 15 }}>
        <CardContent>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ flex: 1 }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", cursor: "pointer" }}
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

      <Paper
        variant="outlined"
        sx={{
          width: "80%",
          height: editMode ? 300 : 170,
          marginTop: 10,
        }}
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ flex: 1 }}>
            <Button
              onClick={() =>
                navigate("/", {
                  state: updatedValue,
                })
              }
            >
              Back
            </Button>
          </div>
          <IconButton onClick={() => setEditMode(true)}>
            <Edit />
          </IconButton>
        </div>
        <>{editMode ? displayEditableCommentField() : displayCommentField()}</>
      </Paper>
    </div>
  );
};

export default ReviewDetailInfo;
