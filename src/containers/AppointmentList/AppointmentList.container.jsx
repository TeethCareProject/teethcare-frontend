import React, { useEffect, useState } from "react";
import { Input, Form, Row, Col, notification, Button, Pagination } from "antd";
import { useForm } from "antd/lib/form/Form";
import { getAllAppointments } from "../../services/teeth-apis/AppointmentController";
import AppointmentListComponent from "../../components/AppointmentList/AppointmentList.component";
import AppointmentDetailModalContainer from "../AppointmentDetailModal/AppointmentDetailModal.container";
import MobileMenuBar from "../MobileMenuBar/MobileMenuBar.container";
import RoutePath from "../../routers/Path";

const AppointmentListContainer = () => {
  const [searchValue, setSearchValue] = useState({
    appointmentId: "",
    clinicName: "",
  });
  const [appointmentListData, setAppointmentListData] = useState([]);
  const [form] = useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [neededAppointment, setNeededAppointment] = useState(null);
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
          setNeededAppointment(appointment?.id);
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
      appointmentId: values.appointmentId,
      clinicName: values.clinicName,
    });
  };

  const resetAction = () => {
    form.setFieldsValue({
      appointmentId: "",
      clinicName: "",
    });
    setSearchValue({
      appointmentId: "",
      clinicName: "",
    });
  };

  useEffect(() => {
    fetchData({ size: pageSize, ...searchValue });
    setCurrentPage(1);
  }, [searchValue]);

  useEffect(() => {
    if (!neededAppointment) {
      fetchData({ size: pageSize, page: currentPage - 1, ...searchValue });
    }
  }, [neededAppointment]);

  useEffect(() => {
    fetchData({ size: pageSize, page: currentPage - 1, ...searchValue });
  }, [currentPage]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <MobileMenuBar
        title="Your apopintment list"
        location={RoutePath.HOME_PAGE}
      />
      <div
        style={{
          width: "80vw",
        }}
      >
        <SearchForm form={form} onFinish={onFinish} resetAction={resetAction} />
        <AppointmentDetailModalContainer
          appointmentId={neededAppointment}
          setNeededAppointment={setNeededAppointment}
        />
        <AppointmentListComponent appointmentListData={appointmentListData} />
      </div>
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
    </div>
  );
};

const SearchForm = ({ resetAction, form, ...antdProps }) => {
  return (
    <Form form={form} layout="vertical" {...antdProps}>
      <Row gutter={[16, 16]} align="bottom">
        <Col xs={24} sm={24} md={9} lg={8}>
          <Form.Item name="appointmentId" label="Search appointment Id">
            <Input placeholder="Search by appointment Id" />
          </Form.Item>
        </Col>
        <Col
          className="search-name-appointment-list"
          xs={24}
          sm={24}
          md={9}
          lg={8}
        >
          <Form.Item name="clinicName" label="Search clinic name">
            <Input placeholder="Search by Clinic name" />
          </Form.Item>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={6}
          lg={3}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Form.Item>
            <div
              className="search-btn-appointment"
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "-40px",
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: 10 }}
              >
                Search
              </Button>
            </div>
          </Form.Item>
          <Form.Item>
            <div
              className="reset-btn-appointment"
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "-40px",
              }}
            >
              <Button onClick={() => resetAction()}>Reset</Button>
            </div>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default AppointmentListContainer;
