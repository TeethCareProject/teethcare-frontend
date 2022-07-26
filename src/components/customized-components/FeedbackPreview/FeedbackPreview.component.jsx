import React from "react";
import { Comment, Avatar, Rate } from "antd";
import "./FeedbackPreview.style.scss";

const FeedbackPreviewComponent = ({ feedbacks }) => {
  return feedbacks?.map((feedback, index) => (
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
      avatar={<Avatar src={feedback?.bookingResponse?.patient?.avatarImage} />}
      content={<p>{feedback?.detail}</p>}
      datetime={<Rate disabled value={feedback?.ratingScore} />}
    />
  ));
};

export default FeedbackPreviewComponent;
