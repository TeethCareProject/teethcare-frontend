import React, { useState, useEffect } from "react";
import { notification, Menu, Dropdown } from "antd";
import { useHistory } from "react-router-dom";
import RoutePath from "../../routers/Path";
import BookingListComponent from "../../components/BookingList/BookingList.component";
import AppointmentListComponent from "../../components/AppointmentList/AppointmentList.component";
import { getAllBooking } from "../../services/teeth-apis/BookingController";
import { getAllAppointments } from "../../services/teeth-apis/AppointmentController";
import BookingStatusConstants from "../../constants/BookingStatusConstants";
import moment from "moment";
import { convertMomentToMilliseconds } from "../../utils/convert.utils";
import AppointmentDetailModalContainer from "../AppointmentDetailModal/AppointmentDetailModal.container";
import BookingDetailModalContainer from "../BookingDetailModal/BookingDetailModal.container";
import { useDispatch } from "react-redux";
import MobileNavigationBar from "../MobileNavigationBar/MobileNavigationBar.container";

const PatientDashboardContainer = () => {
  const [bookingListData, setBookingListData] = useState([]);
  const [appointmentListData, setAppointmentListData] = useState([]);
  const [neededBooking, setNeededBooking] = useState(null);
  const [neededAppointment, setNeededAppointment] = useState(null);

  const history = useHistory();
  const dispatch = useDispatch();

  const fetchBookingData = async (options) => {
    try {
      let data;
      if (!options) {
        data = (await getAllBooking({})).data;
      } else {
        data = (await getAllBooking({ ...options })).data;
      }

      const mapperData = data?.content?.map((booking) => ({
        ...booking,
        onClick: () => {
          setNeededBooking(booking?.id);
        },
      }));

      setBookingListData(mapperData);
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching booking data, try again later`,
        duration: 2,
      });
    }
  };
  const fetchAppointmentData = async (options) => {
    try {
      let data;
      if (!options) {
        data = (await getAllAppointments({})).data;
      } else {
        data = (await getAllAppointments({ ...options })).data;
      }

      const mapperData = data?.content?.map((appointment) => ({
        ...appointment,
        onClick: () => {
          setNeededAppointment(appointment?.id);
        },
      }));

      setAppointmentListData(mapperData);
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching appointment data, try again later`,
        duration: 2,
      });
    }
  };

  useEffect(() => {
    fetchBookingData({
      size: 1000,
      status: BookingStatusConstants.REQUEST,
      sortBy: "examinationTime",
    });
    fetchAppointmentData();
  }, []);

  return (
    <>
      <div>
        <MobileNavigationBar title="Dashboard" />
        <div>
          <div className="dashboard-title">Your incoming examinations:</div>
          <BookingDetailModalContainer
            bookingId={neededBooking}
            setNeededBooking={setNeededBooking}
          />
          <BookingListComponent
            bookingListData={bookingListData
              ?.filter(
                (booking, index) =>
                  booking.examinationTime >=
                  convertMomentToMilliseconds(moment())
              )
              .filter((booking, index) => index < 5)}
          />
        </div>
        <div>
          <div className="dashboard-title">Incoming appointments:</div>
          <AppointmentDetailModalContainer
            appointmentId={neededAppointment}
            setNeededAppointment={setNeededAppointment}
          />
          <AppointmentListComponent
            appointmentListData={appointmentListData?.filter(
              (appointment, index) => index < 5
            )}
          />
        </div>
      </div>
    </>
  );
};

export default PatientDashboardContainer;
