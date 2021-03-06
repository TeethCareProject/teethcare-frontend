import React, { useEffect, useState } from "react";
import {
  Input,
  Form,
  Row,
  Col,
  notification,
  Button,
  Pagination,
  Select,
} from "antd";
import RoutePath from "../../routers/Path";
import BookingListComponent from "../../components/BookingList/BookingList.component";
import { useForm } from "antd/lib/form/Form";
import { getAllBooking } from "../../services/teeth-apis/BookingController";
import BookingDetailModalContainer from "../BookingDetailModal/BookingDetailModal.container";
import BookingStatusConstants from "../../constants/BookingStatusConstants";
import MobileMenuBar from "../MobileMenuBar/MobileMenuBar.container";

const BookingListContainer = () => {
  const [searchValue, setSearchValue] = useState({
    bookingId: "",
    clinicName: "",
  });
  const [bookingListData, setBookingListData] = useState([]);
  const [form] = useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [neededBooking, setNeededBooking] = useState(null);
  const pageSize = 6;

  const fetchData = async (options) => {
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
      status: values.status,
    });
  };

  const statusButtonClick = (status) => {
    setSearchValue({
      ...searchValue,
      status: status,
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
      <MobileMenuBar title="Your booking list" location={RoutePath.HOME_PAGE} />
      <div style={{ width: "80vw" }}>
        <SearchForm
          form={form}
          statusButtonClick={statusButtonClick}
          onFinish={onFinish}
          resetAction={resetAction}
        />
        <BookingDetailModalContainer
          bookingId={neededBooking}
          setNeededBooking={setNeededBooking}
        />
        <div
          className="booking-list-pagination-mobile"
          style={{ marginTop: "1rem" }}
        >
          <Pagination
            total={totalElements}
            current={currentPage}
            pageSize={pageSize}
            onChange={(page) => {
              setCurrentPage(page);
            }}
          />
        </div>
        <BookingListComponent bookingListData={bookingListData} />
        <div style={{ marginTop: "1rem" }}>
          <Pagination
            className="booking-list-pagination"
            total={totalElements}
            current={currentPage}
            pageSize={pageSize}
            onChange={(page) => {
              setCurrentPage(page);
            }}
          />
        </div>
      </div>
    </>
  );
};

const SearchForm = ({ resetAction, statusButtonClick, form, ...antdProps }) => {
  const { Option } = Select;
  return (
    <>
      <Form form={form} layout="vertical" {...antdProps}>
        <Row gutter={[16, 16]} align="bottom">
          <Col xs={24} sm={24} md={7} lg={8}>
            <Form.Item name="bookingId" label="Search by booking Id">
              <Input placeholder="Search by booking Id" />
            </Form.Item>
          </Col>
          <Col
            className="search-name-booking-list"
            xs={24}
            sm={24}
            md={7}
            lg={8}
          >
            <Form.Item name="clinicName" label="Search by clinic name">
              <Input placeholder="Search by Clinic name" />
            </Form.Item>
          </Col>
          <Col sm={0} md={4} lg={4}>
            <Form.Item
              name="status"
              label="Search status"
              className="status-select"
            >
              <Select placeholder="select status">
                <Option>None</Option>
                {Object.keys(BookingStatusConstants).map((status) => (
                  <Option key={status} value={status}>
                    {status}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={3} lg={2}>
            <Form.Item>
              <div
                className="search-btn-booking"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "-40px",
                }}
              >
                <Button type="primary" htmlType="submit">
                  Search
                </Button>
              </div>
            </Form.Item>
          </Col>
          <Col xs={0} sm={12} md={2} lg={2}>
            <Form.Item>
              <div
                className="reset-btn-booking"
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
      <div className="status-option">
        <Button
          className="status-button"
          shape="round"
          onClick={() => resetAction()}
        >
          All
        </Button>
        {Object.keys(BookingStatusConstants).map((status) => (
          <Button
            className="status-button"
            shape="round"
            onClick={() => statusButtonClick(status)}
          >
            {status}
          </Button>
        ))}
      </div>
    </>
  );
};

export default BookingListContainer;
