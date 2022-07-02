import React from "react";
import BookingServiceFormContainer from "../../containers/BookingServiceForm/BookingServiceForm.container";
import MobileNavigationBar from "../../containers/MobileNavigationBar/MobileNavigationBar.container";

const BookingServicePage = () => {
  return (
    <>
      <MobileNavigationBar title="Teethcare" />
      <div className="page" style={{ marginTop: "2rem" }}>
        <BookingServiceFormContainer />
      </div>
    </>
  );
};

export default BookingServicePage;
