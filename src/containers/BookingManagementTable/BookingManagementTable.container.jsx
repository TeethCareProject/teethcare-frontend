import {
  Form,
  notification,
  Row,
  Col,
  Button,
  Input,
  Pagination,
  Modal,
  Select,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useEffect, useState } from "react";
import CommonTableComponent from "../../components/CommonTable/CommonTable.component";
import {
  checkIn,
  getAllBooking,
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
import BookingStatusConstants from "../../constants/BookingStatusConstants";
import { RoleConstant } from "../../constants/RoleConstants";

const BookingManagementTableContainer = () => {
  const role = useSelector((state) => state?.authentication?.user?.roleName);

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

  const onViewDetailClick = (bookingId) => {
    history.push(
      generatePath(RoutePath.EXAMINATION_PAGE, {
        bookingId,
      })
    );
  };

  const fetchData = async (options) => {
    try {
      let data;
      if (!options) {
        data = (await getAllBooking({})).data;
      } else {
        data = (await getAllBooking({ ...options })).data;
      }
      if (role === RoleConstant.DENTIST) {
        const bookingData = data?.content?.map((booking) => ({
          ...booking,
          getDetail: () => {
            onViewDetailClick(booking.id);
          },
        }));
        setData(bookingData);
      } else {
        const bookingData = data?.content?.map((booking) => ({
          ...booking,
          getDetail: () => {
            setNeededBooking(booking.id);
          },
        }));
        setData(bookingData);
      }
      setTotalElements(data.totalElements);
    } catch (e) {
      //map handle Action in here

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
      status: values.status,
    });
  };

  const resetAction = () => {
    form.setFieldsValue({
      bookingId: "",
      patientName: "",
      patientPhone: "",
      status: null,
    });
    setSearchValue({
      bookingId: "",
      patientName: "",
      patientPhone: "",
      status: null,
    });
  };

  const handleQrScanResult = async (value) => {
    const bookingId = value.substring(value.lastIndexOf("/") + 1);
    try {
      Modal.destroyAll();

      await checkIn(bookingId);
      notification["success"]({
        message: `Checkin successfully`,
        duration: 2,
      });
      setNeededBooking(bookingId);
    } catch ({ response }) {
      const { status, data } = response;
      if (status == 404) {
        Modal.error({
          title: "Invalid booking Id",
          content: data?.message[0],
        });
      }
      if (status == 400) {
        Modal.error({
          title: "Error!",
          content: data?.message[0],
        });
        setNeededBooking(bookingId);
      }
    }
  };

  const handleOpenScanQr = () => {
    Modal.info({
      closable: true,
      title: "Scan QR for booking ID",
      content: <QrScannerComponent handleResult={handleQrScanResult} />,
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
          <Col
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Button
              className="auto-check-in-btn"
              style={{ marginTop: "6px" }}
              type="primary"
              onClick={handleOpenScanQr}
            >
              Auto checkin
            </Button>
          </Col>
        </Row>
        <Row style={{ display: "block", width: "90%" }}>
          <CommonTableComponent
            className="booking-table"
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
  const { Option } = Select;
  return (
    <Form layout="vertical" {...antdProps}>
      <Row gutter={[16, 16]} align="bottom">
        <Col span={5}>
          <Form.Item name="bookingId" label="Search booking Id">
            <Input placeholder="Search by booking Id" />
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item name="patientName" label="Search patient name">
            <Input placeholder="Search by patient name" />
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item name="patientPhone" label="Search patient phone">
            <Input placeholder="Search by patient phone" />
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item name="status">
            <Select placeholder="status">
              <Option>None</Option>
              {Object.keys(BookingStatusConstants).map((status) => (
                <Option key={status} value={status}>
                  {status}
                </Option>
              ))}
            </Select>
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
