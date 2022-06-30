import {
  Button,
  DatePicker,
  Form,
  Input,
  notification,
  Typography,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useEffect, useState } from "react";
import { getVoucherById } from "../../services/teeth-apis/VoucherController";
import { convertMillisecondsToDate } from "../../utils/convert.utils";
import VoucherValidation from "../../validate/VoucherValidation";

const VoucherFormContainer = ({ voucherId, handleSubmit }) => {
  const [voucherData, setVoucherData] = useState({});
  const [form] = useForm();

  const fetchVoucher = async () => {
    try {
      const { data } = await getVoucherById(voucherId);
      setVoucherData(data);
      form.setFieldsValue(data);
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching voucher data, try again later`,
        duration: 2,
      });
    }
  };

  useEffect(() => {
    if (voucherId) {
      fetchVoucher();
    }
  }, [voucherId]);

  return (
    <>
      <Form onFinish={handleSubmit} form={form}>
        {voucherId ? (
          <Form.Item label="Voucher Code" name="voucherCode">
            <Input readOnly />
          </Form.Item>
        ) : (
          <Form.Item
            label="Voucher Code"
            name="voucherCode"
            rules={VoucherValidation.voucherCode}
          >
            <Input />
          </Form.Item>
        )}

        {voucherData?.discountValue ? (
          <Form.Item label="Discount value" name="discountValue">
            <Input readOnly />
          </Form.Item>
        ) : (
          <Form.Item
            label="Discount value"
            name="discountValue"
            rules={VoucherValidation.discountValue}
          >
            <Input />
          </Form.Item>
        )}
        {!voucherData?.voucherCode ? (
          <>
            <Typography>
              If you ignore this field, the quantity will be infinite
            </Typography>
            <Form.Item label="Quantity" name="quantity">
              <Input readOnly />
            </Form.Item>
          </>
        ) : (
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={VoucherValidation.quantity}
          >
            <Input />
          </Form.Item>
        )}
        {!voucherData?.voucherCode ? (
          <>
            <Typography>
              If you ignore this field, the expired time will be infinite
            </Typography>
            <Form.Item label="Expired time" name="expiredTime">
              <DatePicker showTime />
            </Form.Item>
          </>
        ) : (
          <Typography>{`Expired date: ${voucherData?.expiredTime}`}</Typography>
        )}
        {voucherData?.voucherCode ? null : (
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        )}
      </Form>
    </>
  );
};

export default VoucherFormContainer;
