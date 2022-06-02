import React from "react";
import { Comment, Tooltip, Avatar } from "antd";
import moment from "moment";

const FeedbackPreviewComponent = ({ feedbacks }) => {
  return feedbacks?.map((feedback, index) => (
    <Comment
      key={index}
      author={
        <a>
          {`${
            feedback?.patientResponse?.firstName +
            " " +
            feedback?.patientResponse?.lastName
          }`}
        </a>
      }
      avatar={<Avatar src={feedback?.patientResponse?.avatarImage} />}
      content={
        <p>
          We supply a series of design principles, practical patterns and high
          quality design resources (Sketch and Axure), to help people create
          their product prototypes beautifully and efficiently.
        </p>
      }
      datetime={
        <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
          <span>{moment().fromNow()}</span>
        </Tooltip>
      }
    />
  ));
};

export default FeedbackPreviewComponent;
