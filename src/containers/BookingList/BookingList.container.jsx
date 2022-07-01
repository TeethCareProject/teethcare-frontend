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
import BookingListComponent from "../../components/BookingList/BookingList.component";
import { useForm } from "antd/lib/form/Form";
import { getAllBooking } from "../../services/teeth-apis/BookingController";
import BookingDetailModalContainer from "../BookingDetailModal/BookingDetailModal.container";
import BookingStatusConstants from "../../constants/BookingStatusConstants";

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
      <div className="title-mobile">Your booking list</div>
      <div style={{ width: "90vw" }}>
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
        <BookingListComponent bookingListData={bookingListData} />
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
    </>
  );
};

const SearchForm = ({ resetAction, statusButtonClick, ...antdProps }) => {
  const { Option } = Select;
  return (
    <>
      <Form layout="vertical" {...antdProps}>
        <Row gutter={[16, 16]} align="bottom">
          <Col span={6}>
            <Form.Item name="bookingId" label="Search by booking Id">
              <Input placeholder="Search by booking Id" />
            </Form.Item>
          </Col>
          <Col span={6}>
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
          <Col sm={3} md={2} lg={2}>
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
      <div className="status-option">
        <Button className="status-button">All</Button>
        {Object.keys(BookingStatusConstants).map((status) => (
          <Button
            className="status-button"
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
