import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, DatePicker, InputNumber, message } from 'antd';
import { CreateKpiRequest } from '../../../types/kpi';
import { createKpi } from '../../../services/kpi-client';

interface KpiModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const KpiModal: React.FC<KpiModalProps> = ({ open, onClose, onSuccess }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      form.resetFields();
    }
  }, [open, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const payload: CreateKpiRequest = {
          ...values,
          deadline: values.deadline.format('YYYY-MM-DD'),
      };
      
      await createKpi(payload);
      message.success('KPI created successfully');
      
      onSuccess();
      onClose();
    } catch (info) {
      console.log('Validate Failed:', info);
      // If it's a validation error, Ant Design handles UI feedback
      // If it's API error:
      if (info instanceof Error) {
          message.error('Failed to create KPI');
      }
    }
  };

  return (
    <Modal
      title="Create New KPI"
      open={open}
      onOk={handleOk}
      onCancel={onClose}
    >
      <Form
        form={form}
        layout="vertical"
        name="create_kpi_form"
      >
        <Form.Item
          name="name"
          label="KPI Name"
          rules={[{ required: true, message: 'Please input the KPI name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="indicatorType"
          label="Indicator Type"
          rules={[{ required: true, message: 'Please select the indicator type!' }]}
        >
          <Select>
            <Select.Option value="ARPU">ARPU (Average Revenue Per User)</Select.Option>
            <Select.Option value="ChurnRate">Churn Rate</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
            name="targetValue"
            label="Target Value"
            rules={[{ required: true, message: 'Please input target value!' }]}
        >
            <InputNumber style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
            name="deadline"
            label="Deadline"
            rules={[{ required: true, message: 'Please select deadline!' }]}
        >
            <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default KpiModal;
