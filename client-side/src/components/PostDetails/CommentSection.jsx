import React, { useState, useEffect, useRef } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { commentPost } from "../../actions/posts";

import useStyles from "./styles";

export default function CommentSection({ post }) {
  const classes = useStyles();
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const commentsRef = useRef();

  const handleClick = async () => {
    console.log(`${user?.result?.name}: ${comment}`);
    const newComments = await dispatch(
      commentPost({ value: `${user?.result?.name}: ${comment}` }, post._id)
    );
    setComment("");
    setComments(newComments);
  };

  useEffect(() => {
    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  }, [comments])

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            {comments?.map((c, i) => (
              <Typography
                key={i}
                gutterBottom
                variant="subtitle1"
                ref={commentsRef}
              >
                <strong>{c?.split(":")[0]}</strong>{" "}
                {c?.split(":")[1]}

              </Typography>
            ))}
          </Typography>
        </div>
        {user?.result.name && (
          <div style={{ width: "70%" }}>
            <Typography gutterBottom variant="h6">
              Write a comment
            </Typography>
            <TextField
              fullWidth
              rows={4}
              variant="outlined"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              disabled={!comment}
              variant="contained"
              onClick={handleClick}
              color="primary"
            >
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}