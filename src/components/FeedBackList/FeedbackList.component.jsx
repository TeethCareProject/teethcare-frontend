import React from "react";
import { Avatar, Button, List, Typography } from "antd";
import { CalendarOutlined } from "@ant-design/icons";

const FeedbackListComponent = ({ feedbackListData }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={feedbackListData ? feedbackListData : []}
      renderItem={(feedback) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon={<CalendarOutlined />} size={48} />}
            title={
              <Typography.Title
                level={5}
              >{`Feedback Id: ${feedback?.id} - Status: ${feedback?.status}`}</Typography.Title>
            }
            description={`By: ${feedback?.bookingResponse?.patient?.firstName} ${feedback?.bookingResponse?.patient?.lastName} - Rating: ${feedback?.ratingScore}`}
          />
          <Typography>{`${feedback?.detail}`}</Typography>
          <Button type="link" onClick={() => feedback?.onClick()}>
            Report this feedback
          </Button>
        </List.Item>
      )}
    />
  );
};

export default FeedbackListComponent;
