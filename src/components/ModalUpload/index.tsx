/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable tailwindcss/no-custom-classname */
import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, message, Modal, Upload } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { GetAllProductApi } from '@/services/product.service';
import { UploadProductApi } from '@/services/upload.service';

type IProps = {
  open: any;
  setOpen: any;
};

export const ModalUpload = (props: IProps) => {
  const dispatch = useDispatch();
  const [FormUpload] = Form.useForm();
  const [file, setFile] = useState<any>('');
  console.log(file);
  const handleCancel = () => {
    props.setOpen({
      ...props.open,
      openUploadModal: false,
    });
  };
  const onFinish = () => {
    FormUpload.validateFields().then((val) => {
      const payload = {
        photo: file.originFileObj,
        name: val.name,
        buyPrice: val.buyPrice,
        sellPrice: val.sellPrice,
        stockLeft: val.stockLeft,
      };
      UploadProductApi(payload);
      GetAllProductApi(dispatch);
      window.location.reload();
      handleCancel();
    });
  };
  const handleUploadChange = (info: any) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} uploaded successfully`);
      setFile(info.fileList[0]);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} upload failed.`);
    }
  };

  const handleKeyPress = (e: any) => {
    // Prevent input of non-numeric characters
    const charCode = e.which ? e.which : e.keyCode;
    if (
      (charCode !== 8 && charCode !== 0 && charCode !== 13 && charCode < 48) ||
      charCode > 57
    ) {
      e.preventDefault();
    }
  };

  const validateFileSize = (file: any) => {
    const maxSize = 100 * 1024; // 100KB
    if (file.size > maxSize) {
      message.error('File size must be no more than 100KB');
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  const currencyFormatter = (value: any) => {
    return `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const currencyParser = (value: any) => {
    // Parse currency value into number
    return value.replace(/Rp\s?|(\.*)/g, '');
  };

  return (
    <div className="mt-32">
      <Modal
        title=""
        open={props.open}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div>
          <h1 className="text-3xl font-semibold text-black">Add Product</h1>
        </div>
        <div className="mt-8">
          <Form layout="vertical" form={FormUpload} onFinish={onFinish}>
            <Form.Item
              name="file"
              label="Upload Photo"
              valuePropName="fileList"
              getValueFromEvent={(e) => e && e.fileList}
              rules={[
                { required: true, message: 'Please upload a file' },
                // Add additional validation rules if needed
              ]}
            >
              <Upload
                name="file"
                // action="/upload"
                method="POST"
                onChange={handleUploadChange}
                multiple={false}
                beforeUpload={(file) => {
                  // Check file type
                  const acceptedTypes = ['image/jpeg', 'image/png'];
                  const isAccepted = acceptedTypes.includes(file.type);
                  if (!isAccepted) {
                    message.error('You can only upload JPEG or PNG files');
                  }
                  return isAccepted
                    ? validateFileSize(file)
                    : Upload.LIST_IGNORE;
                }}
                accept=".jpeg,.jpg,.png"
                maxCount={1}
              >
                <Button className="flex items-center" icon={<UploadOutlined />}>
                  Select Your File
                </Button>
              </Upload>
            </Form.Item>
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="buyPrice" label="Buy Price">
              <InputNumber
                formatter={currencyFormatter}
                parser={currencyParser}
                onKeyPress={handleKeyPress}
                min={0}
              />
            </Form.Item>
            <Form.Item name="sellPrice" label="Sell Price">
              <InputNumber
                formatter={currencyFormatter}
                parser={currencyParser}
                onKeyPress={handleKeyPress}
                min={0}
              />
            </Form.Item>
            <Form.Item name="stockLeft" label="StockLeft">
              <InputNumber min={0} onKeyPress={handleKeyPress} />
            </Form.Item>
            <div className="flex justify-end">
              <Form.Item>
                <Button
                  htmlType="submit"
                  className="flex items-center bg-orange-500 text-white"
                >
                  Submit
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
};
