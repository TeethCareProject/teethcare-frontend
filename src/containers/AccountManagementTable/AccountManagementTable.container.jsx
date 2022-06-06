import { notification } from "antd";
import React, { useEffect, useState } from "react";
import CommonTableComponent from "../../components/CommonTable/CommonTable.component";
import { getAllAccounts } from "../../services/teeth-apis/AccountController";
import AccountManagementTableColumn from "./AccountManagementTable.column";
import DetailForm from "../DetailForm/DetailForm.container";

const AccountManagementTableContainer = () => {
  const [data, setData] = useState([]);
  const [neededAccount, setNeededAccount] = useState(null);

  const fetchData = async () => {
    try {
      const { data } = await getAllAccounts();

      //map handle Action in here
      const accountData = data.map((account) => ({
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
    fetchData();
  }, []);

  return (
    <>
      <DetailForm
        accountId={neededAccount}
        setNeededAccount={setNeededAccount}
      ></DetailForm>
      <CommonTableComponent
        tableTitle="User Management"
        columns={AccountManagementTableColumn}
        dataSource={data}
      />
    </>
  );
};

export default AccountManagementTableContainer;
