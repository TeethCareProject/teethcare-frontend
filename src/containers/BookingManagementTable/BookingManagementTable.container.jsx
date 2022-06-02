import { Avatar, Col, Descriptions, Modal, notification, Row } from "antd";
import React, { useEffect, useState } from "react";
import CommonTableComponent from "../../components/CommonTable/CommonTable.component";
import {
  getBookingById,
  getAllBooking,
} from "../../services/teeth-apis/BookingController";
import { UserOutlined } from "@ant-design/icons";
import BookingManagementTableColumn from "./BookingManagementTable.column";
import { useSelector } from "react-redux";
import BookingDetailModalContainer from "../BookingDetailModal/BookingDetailModal.container";

const BookingManagementTableContainer = () => {
  const [data, setData] = useState([]);
  const [neededBooking, setNeededBooking] = useState(null);
  const clinicId = useSelector(
    (state) => state?.authentication?.user?.clinic?.id
  );

  const fetchData = async () => {
    try {
      const data = (await getAllBooking(clinicId))?.data?.content;

      //map handle Action in here
      const bookingData = data.map((booking) => ({
        ...booking,
        getDetail: () => {
          setNeededBooking(booking.id);
        },
      }));

      setData(bookingData);
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching booking data, try again later`,
        duration: 2,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <BookingDetailModalContainer
        bookingId={neededBooking}
        setNeededBooking={setNeededBooking}
      ></BookingDetailModalContainer>
      <CommonTableComponent
        tableTitle="Booking Management"
        columns={BookingManagementTableColumn}
        dataSource={data}
      />
    </>
  );
};

//Please move this into a separate file if the logic becomes bigger
const DetailForm = ({ bookingId, setNeededBooking }) => {
  const [bookingDetail, setBookingDetail] = useState({});

  const fetchBookingDetail = async () => {
    try {
      const { data } = await getBookingById(bookingId);

      setBookingDetail(data);
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching booking data, try again later`,
        duration: 2,
      });
    }
  };

  useEffect(() => {
    if (bookingId) {
      fetchBookingDetail();
    }
  }, [bookingId]);

  const handleOk = () => {
    setNeededBooking(null);
  };

  const handleCancel = () => {
    setNeededBooking(null);
  };

  return (
    <div>
      <Modal
        destroyOnClose
        visible={bookingId !== null}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Row>
          <Col span={8}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Avatar size={100} icon={<UserOutlined />} />
            </div>
          </Col>
          <Col span={16}>
            <Descriptions>
              <Descriptions.Item label="ID" span={12}>
                {bookingDetail?.id}
              </Descriptions.Item>
              <Descriptions.Item label="CS" span={12}>
                {bookingDetail?.patient?.name}
              </Descriptions.Item>
              <Descriptions.Item label="Dentist" span={12}>
                {bookingDetail?.clinic?.name}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default BookingManagementTableContainer;
