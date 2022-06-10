import {
  Form,
  notification,
  Row,
  Col,
  Button,
  Input,
  Pagination,
  Modal,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useEffect, useState } from "react";
import CommonTableComponent from "../../components/CommonTable/CommonTable.component";
import {
  getAllBooking,
  getBookingById,
} from "../../services/teeth-apis/BookingController";
import BookingManagementTableColumn from "./BookingManagementTable.column";
import { useSelector } from "react-redux";
import BookingDetailModalContainer from "../BookingDetailModal/BookingDetailModal.container";
import QrScannerComponent from "../../components/QrScanner/QrScanner.component";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { generatePath } from "react-router-dom";
import RoutePath from "../../routers/Path";
import { useParams } from "react-router-dom";

const BookingManagementTableContainer = () => {
  const location = useLocation();
  const history = useHistory();
  const { tab } = useParams();
  const [form] = useForm();
  const [searchValue, setSearchValue] = useState({
    bookingId: "",
    patientName: "",
    patientPhone: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const pageSize = 10;

  const [data, setData] = useState([]);
  const [neededBooking, setNeededBooking] = useState(null);
  const clinicId = useSelector(
    (state) => state?.authentication?.user?.clinic?.id
  );

  const fetchData = async (options) => {
    try {
      let data;
      if (!options) {
        data = (await getAllBooking({})).data;
      } else {
        data = (await getAllBooking({ ...options })).data;
      }

      //map handle Action in here
      const bookingData = data?.content?.map((booking) => ({
        ...booking,
        getDetail: () => {
          setNeededBooking(booking.id);
        },
      }));

      setData(bookingData);
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
      patientName: values.patientName,
      patientPhone: values.patientPhone,
    });
  };

  const resetAction = () => {
    form.setFieldsValue({
      bookingId: "",
      patientName: "",
      patientPhone: "",
    });
    setSearchValue({
      bookingId: "",
      patientName: "",
      patientPhone: "",
    });
  };

  const handleResult = async (value) => {
    try {
      Modal.destroyAll();
      const bookingId = value.substring(value.lastIndexOf("/") + 1);
      //check before get bookingId
      await getBookingById(bookingId);

      setNeededBooking(bookingId);
    } catch (e) {
      Modal.error({
        title: "Invalid booking Id",
        content: "Invalid booking Id, try again later!",
      });
    }
  };

  const handleOpenScanQr = () => {
    Modal.info({
      closable: true,
      title: "Scan QR for booking ID",
      content: <QrScannerComponent handleResult={handleResult} />,
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

  useEffect(() => {
    if (location?.state?.bookingId) {
      setNeededBooking(location?.state?.bookingId);
      history.replace(
        tab
          ? generatePath(RoutePath.DASHBOARD_WITH_TAB_PAGE, { tab: tab })
          : generatePath(RoutePath.DASHBOARD_PAGE),
        { bookingId: null }
      );
    }
  }, []);

  return (
    <>
      <BookingDetailModalContainer
        bookingId={neededBooking}
        setNeededBooking={setNeededBooking}
      ></BookingDetailModalContainer>
      <Col>
        <Row>
          <Col>
            <SearchForm
              form={form}
              onFinish={onFinish}
              resetAction={resetAction}
            />
          </Col>
          <Col>
            <Button type="primary" onClick={handleOpenScanQr}>
              Scan QR
            </Button>
          </Col>
        </Row>
        <Row>
          <CommonTableComponent
            tableTitle="Booking Management"
            columns={BookingManagementTableColumn}
            dataSource={data}
            pagination={false}
          />
        </Row>
        <Row>
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
        </Row>
      </Col>
    </>
  );
};

const SearchForm = ({ resetAction, ...antdProps }) => {
  return (
    <Form layout="vertical" {...antdProps}>
      <Row gutter={[16, 16]} align="bottom">
        <Col span={6}>
          <Form.Item name="bookingId" label="Search booking Id">
            <Input placeholder="Search by booking Id" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="patientName" label="Search patient name">
            <Input placeholder="Search by patient name" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="patientPhone" label="Search patient phone">
            <Input placeholder="Search by patient phone" />
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item>
            <Button onClick={resetAction}>Reset</Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default BookingManagementTableContainer;
