import React, { useEffect, useState } from "react";
import { Input, Form, Row, Col, notification, Button, Pagination } from "antd";
import BookingListComponent from "../../components/BookingList/BookingList.component";
import { useForm } from "antd/lib/form/Form";
import { getAllAppointments } from "../../services/teeth-apis/AppointmentController";

const AppointmentListContainer = () => {
  const [searchValue, setSearchValue] = useState({
    bookingId: "",
    clinicName: "",
  });
  const [appointmentListData, setAppointmentListData] = useState([]);
  const [form] = useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [neededBooking, setNeededBooking] = useState(null);
  const pageSize = 6;

  const fetchData = async (options) => {
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
          setNeededBooking(appointment?.id);
        },
      }));

      setAppointmentListData(mapperData);
      setTotalElements(data.totalElements);
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching booking data, try again later`,
        duration: 2,
      });
    }
  };

  const onFinish = (values) => {
    setSearchValue({
      bookingId: values.bookingId,
      clinicName: values.clinicName,
    });
  };

  const resetAction = () => {
    form.setFieldsValue({
      bookingId: "",
      clinicName: "",
    });
    setSearchValue({
      bookingId: "",
      clinicName: "",
    });
  };

  useEffect(() => {
    fetchData({ size: pageSize, ...searchValue });
    setCurrentPage(1);
  }, [searchValue]);

  useEffect(() => {
    if (!neededBooking) {
      fetchData({ size: pageSize, page: currentPage - 1, ...searchValue });
    }
  }, [neededBooking]);

  useEffect(() => {
    fetchData({ size: pageSize, page: currentPage - 1, ...searchValue });
  }, [currentPage]);

  return (
    <>
      <SearchForm form={form} onFinish={onFinish} resetAction={resetAction} />
      <BookingListComponent bookingListData={appointmentListData} />
      <div style={{ marginTop: "1rem" }}>
        <Pagination
          total={totalElements}
          current={currentPage}
          pageSize={pageSize}
          onChange={(page) => {
            setCurrentPage(page);
          }}
        />
      </div>
    </>
  );
};

const SearchForm = ({ resetAction, ...antdProps }) => {
  return (
    <Form layout="vertical" {...antdProps}>
      <Row gutter={[16, 16]} align="bottom">
        <Col span={7}>
          <Form.Item name="bookingId" label="Search booking Id">
            <Input placeholder="Search by booking Id" />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item name="clinicName" label="Search clinic name">
            <Input placeholder="Search by Clinic name" />
          </Form.Item>
        </Col>
        <Col span={2}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
          </Form.Item>
        </Col>
        <Col span={2}>
          <Form.Item>
            <Button onClick={resetAction}>Reset</Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default AppointmentListContainer;
