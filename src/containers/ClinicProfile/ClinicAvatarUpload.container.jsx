import React, { useEffect, useState } from "react";
import { Avatar, Image, Upload, message, Button, notification } from "antd";
import ImgCrop from "antd-img-crop";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import {
  updateImageProfile,
  updateProfile,
} from "../../services/teeth-apis/AccountController";
import moment from "moment";
import { updateClinicImage } from "../../services/teeth-apis/ClinicController";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });

const ClinicAvatarUploadContainer = ({ imageData, form, fetchProfile }) => {
  const [fileList, setFileList] = useState([]);
  const [imageUrl, setImageUrl] = useState(imageData);
  const [uploading, setUploading] = useState(false);

  const updateData = async (formData) => {
    try {
      await updateClinicImage(formData);
      notification["success"]({
        message: `Update successfully`,
        duration: 2,
      });
      setFileList([]);
      fetchProfile();
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while getting profile data, try again later`,
        duration: 2,
      });
      //keep the image so that user can still update
    } finally {
      setUploading(false);
    }
  };

  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("image", file);
    });
    setUploading(true);

    updateData(formData);
  };

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([file]);

      getBase64(file).then((url) => setImageUrl(url));
      return false;
    },
    fileList,
    showUploadList: false,
  };

  useEffect(() => {
    setImageUrl(imageData);
  }, [imageData]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {imageUrl ? <Image src={imageUrl} /> : <Image src={<UserOutlined />} />}
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{
          marginTop: 16,
          width: "10rem",
        }}
      >
        {uploading ? "Uploading" : "Start Upload"}
      </Button>
    </div>
  );
};

export default ClinicAvatarUploadContainer;
