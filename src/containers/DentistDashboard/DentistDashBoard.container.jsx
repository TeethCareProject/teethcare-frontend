import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { notification, Typography } from "antd";
import BookingCardComponent from "../../components/BookingCard/BookingCard.component";
import { getAllBooking } from "../../services/teeth-apis/BookingController";
import BookingStatusConstants from "../../constants/BookingStatusConstants";
import BookingDetailModalContainer from "../BookingDetailModal/BookingDetailModal.container";

const DentistDashBoardContainer = () => {
  const [bookingData, setBookingData] = useState();
  const [neededBooking, setNeededBooking] = useState(null);

  const id = useSelector((state) => state?.authentication?.user?.id);
  const firstName = useSelector(
    (state) => state?.authentication?.user?.firstName
  );
  const lastName = useSelector(
    (state) => state?.authentication?.user?.lastName
  );

  const fetchData = async (options) => {
    try {
      let data;
      if (!options) {
        data = (
          await getAllBooking({
            dentistId: id,
            status: BookingStatusConstants.TREATMENT,
          })
        ).data;
      } else {
        data = (
          await getAllBooking({
            ...options,
            dentistId: id,
            status: BookingStatusConstants.TREATMENT,
          })
        ).data;
      }

      const mapperData = data?.content?.map((booking) => ({
        ...booking,
        onClick: () => {
          setNeededBooking(booking?.id);
        },
      }));
      setBookingData(mapperData);
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
    <div>
      <Typography.Title level={1}>
        Welcome back, {firstName + " " + lastName}
      </Typography.Title>
      <Typography level={5}>
        Here is some important information for you
      </Typography>
      <div style={{ marginTop: "30px" }}>
        <Typography.Title level={4}>In-coming examination:</Typography.Title>
        <div>
          <BookingDetailModalContainer
            bookingId={neededBooking}
            setNeededBooking={setNeededBooking}
          />
          <BookingCardComponent booking={bookingData} />
        </div>
      </div>
    </div>
  );
};

export default DentistDashBoardContainer;
