import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory, generatePath } from "react-router-dom";
import useQuery from "../../hooks/useQuery";
import RoutePath from "../../routers/Path";
import { getBookingById } from "../../services/teeth-apis/BookingController";

const RedirectBookingDetail = () => {
  const history = useHistory();
  const { bookingId } = useParams();

  const check = async () => {
    if (bookingId) {
      try {
        await getBookingById(bookingId);
        history.push(
          generatePath(RoutePath.DASHBOARD_WITH_TAB_PAGE, { tab: 1 }),
          { bookingId: bookingId }
        );
      } catch (e) {
        history.push("/404");
      }
    } else {
      history.push("/404");
    }
  };

  useEffect(() => {
    check();
  }, []);

  return <></>;
};

export default RedirectBookingDetail;
