import { notification, Form, DatePicker, Button, Row, Col } from "antd";
import SpinFC from "antd/lib/spin";
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { GenericDonutChart } from "../../components/Chart/GenericDonutChart.component";
import { useSWRFetch } from "../../hooks/useSWRFetch";
import { CLINIC_END_POINT } from "../../services/end-points/ClinicEndPoints";
import { ManagerDashBoardGeneralInformation } from "./ManagerDashboardGeneralInformation.component";

const { RangePicker } = DatePicker;

const ManagerStatisticsPage = () => {
  const clinicId = useSelector(
    (state) => state?.authentication?.user?.clinic?.id
  );

  const [dateRange, setDateRange] = useState([moment.now(), moment.now()]);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    setDateRange(values.dateRange);
  };

  const { response, isLoading, isError } = useSWRFetch(
    `${CLINIC_END_POINT}/${clinicId}/statistics`,
    { startDate: dateRange[0].valueOf(), endDate: dateRange[1].valueOf() },
    null,
    null,
    5000
  );

  if (isLoading) return <SpinFC />;
  if (isError) {
    notification["error"]({
      message: `Something went wrong! Try again latter!`,
      description: `There is problem while fetching data, try again later`,
      duration: 2,
    });
    return null;
  }

  const data = response?.data;

  const bookingStatusColorMapping = ({ type }) =>
    [
      {
        type: "Done",
        value: data?.bookingStatisticResponse?.doneBooking,
        color: "#62daab",
      },
      {
        type: "Failed",
        value: data?.bookingStatisticResponse?.failedBooking,
        color: "rgba(253,216,14,0.87)",
      },
      {
        type: "Pending",
        value: data?.bookingStatisticResponse?.pendingBooking,
        color: "#f34b49",
      },
      {
        type: "Processing",
        value: data?.bookingStatisticResponse?.processingBooking,
        color: "#096dd9",
      },
    ].find((category) => category.type === type).color;

  const bookingChartConfig = {
    defaultTitle: "Total booking",
    defaultValue: `${data?.bookingTotal}`,
    contentSuffix: " Jobfair(s)",
    color: bookingStatusColorMapping,
    width: 450,
    height: 450,
  };

  return (
    <div style={{ marginBottom: "2rem" }}>
      <h1>Statistics dashboard</h1>
      <Form onFinish={onFinish}>
        <Row>
          <Col>
            <Form.Item name="dateRange">
              <RangePicker />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Search
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <ManagerDashBoardGeneralInformation
        staffNum={data?.customerSeviceTotal + data?.dentistTotal}
        dentistNum={data?.dentistTotal}
        CSNum={data?.customerSeviceTotal}
      />
      <GenericDonutChart
        data={[
          {
            type: "Done",
            value: data?.bookingStatisticResponse?.doneBooking,
            color: "#62daab",
          },
          {
            type: "Failed",
            value: data?.bookingStatisticResponse?.failedBooking,
            color: "rgba(253,216,14,0.87)",
          },
          {
            type: "Pending",
            value: data?.bookingStatisticResponse?.pendingBooking,
            color: "#f34b49",
          },
          {
            type: "Processing",
            value: data?.bookingStatisticResponse?.processingBooking,
            color: "#096dd9",
          },
        ]}
        config={bookingChartConfig}
        title={"Booking statistics"}
      />
    </div>
  );
};

export default ManagerStatisticsPage;
