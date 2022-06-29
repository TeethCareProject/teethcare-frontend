import { Pagination, notification } from "antd";
import React, { useEffect, useState } from "react";
import CommonTableComponent from "../../components/CommonTable/CommonTable.component";
import { getAllAccounts } from "../../services/teeth-apis/AccountController";
import { useForm } from "antd/lib/form/Form";
import AccountManagementTableColumn from "./AccountManagementTable.column";
import DetailForm from "../DetailForm/DetailForm.container";
import SearchAccountFormComponent from "../../components/SearchAccountForm/SearchAccountForm.component";

const AccountManagementTableContainer = () => {
  const [form] = useForm();

  const [data, setData] = useState([]);
  const [neededAccount, setNeededAccount] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const pageSize = 6;

  const [filterData, setFilterData] = useState({
    id: null,
    role: null,
    status: null,
    fullName: null,
  });

  const onFinish = async (values) => {
    setFilterData({
      id: values.id,
      role: values.role,
      status: values.status,
      fullName: values.fullName,
    });
  };

  const resetAction = () => {
    form.setFieldsValue({
      id: null,
      role: null,
      status: null,
      fullName: null,
    });
    setFilterData({
      id: null,
      role: null,
      status: null,
      fullName: null,
    });
  };

  const fetchData = async (options) => {
    try {
      let data;
      if (!options) {
        data = (await getAllAccounts({ pageSize: null })).data;
      } else {
        data = (await getAllAccounts({ ...options })).data;
      }
      setTotalElements(data.totalElements);
      //map handle Action in here
      const accountData = data?.content.map((account) => ({
        ...account,
        getDetail: () => {
          setNeededAccount(account.id);
        },
      }));
      setData(accountData);
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching account data, try again later`,
        duration: 2,
      });
    }
  };

  useEffect(() => {
    fetchData({ size: pageSize, ...filterData });
    setCurrentPage(1);
  }, [filterData]);

  useEffect(() => {
    fetchData({ size: pageSize, page: currentPage - 1, ...filterData });
  }, [currentPage]);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <SearchAccountFormComponent
        form={form}
        onFinish={onFinish}
        resetAction={resetAction}
      />
      <DetailForm
        accountId={neededAccount}
        setNeededAccount={setNeededAccount}
        fetchData={fetchData}
        setCurrentPage={setCurrentPage}
      ></DetailForm>
      <CommonTableComponent
        tableTitle="User Management"
        columns={AccountManagementTableColumn}
        dataSource={data}
        pagination={false}
      />
      <Pagination
        total={totalElements}
        current={currentPage}
        pageSize={pageSize}
        onChange={onPageChange}
      />
    </div>
  );
};

export default AccountManagementTableContainer;
