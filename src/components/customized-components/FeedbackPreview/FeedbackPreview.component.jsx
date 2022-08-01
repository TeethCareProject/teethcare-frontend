import React from "react";
import { Comment, Avatar, Rate } from "antd";
import "./FeedbackPreview.style.scss";

const FeedbackPreviewComponent = ({ feedbacks }) => {
  return feedbacks?.length > 0 ? feedbacks
    ?.filter((feedback) => feedback.status === "ACTIVE")
    .map((feedback, index) => (
      <Comment
        key={index}
        author={
          <span>
            {`${
              feedback?.bookingResponse?.patient?.firstName +
              " " +
              feedback?.bookingResponse?.patient?.lastName
            }`}
          </span>
        }
        avatar={
          <Avatar src={feedback?.bookingResponse?.patient?.avatarImage} />
        }
        content={<p>{feedback?.detail}</p>}
        datetime={<Rate disabled value={feedback?.ratingScore} />}
      />
    )) : <div style={{marginTop: 10}}>There is no feedback available for this clinic</div>;
};

export default FeedbackPreviewComponent;
