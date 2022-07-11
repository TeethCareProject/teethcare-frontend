import React, { useState, useEffect } from "react";
import ConfirmBookingComponent from "../../components/ConfirmBooking/ConfirmBooking.component";
import {
  getBookingById,
  confirmBooking,
} from "../../services/teeth-apis/BookingController";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { notification } from "antd";
import RoutePath from "../../routers/Path";

const ConfirmBookingContainer = () => {
  const history = useHistory();
  const { search } = useLocation();
  const emailVersion = search.split("")[search.length - 1];
  const { bookingId } = useParams();
  const [bookingData, setBookingData] = useState();

  const fetchBookingData = async () => {
    try {
      const { data } = await getBookingById(bookingId);
      setBookingData(data);
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching booking data, try again later`,
        duration: 2,
      });
    }
  };

  const rejectUpdate = async () => {
    try {
      await confirmBooking({
        bookingId,
        version: bookingData.version - 1,
      });
      history.push(RoutePath.REJECT_CONFIRM_PAGE);
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while reject, try again later`,
        duration: 2,
      });
    }
  };

  const confirmUpdate = async () => {
    try {
      await confirmBooking({
        bookingId,
        version: bookingData.version,
      });
      history.push(RoutePath.ACCEPT_CONFIRM_PAGE);
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while confirm, try again later`,
        duration: 2,
      });
    }
  };

  useEffect(() => {
    fetchBookingData();
  }, [bookingId]);

  return (
    <div>
      {bookingData?.version && emailVersion == bookingData.version ? (
        <ConfirmBookingComponent
          bookingData={bookingData}
          rejectUpdate={rejectUpdate}
          confirmUpdate={confirmUpdate}
        />
      ) : (
        <div>This is not the latest update version</div>
      )}
    </div>
  );
};

export default ConfirmBookingContainer;
