"use client";
import { Form, Input, Button, Select, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { addCandidate } from "../../../app/redux/candidatesSlice";
import { useRouter } from "next/navigation";
import { useTranslation } from "../../../i18n/I18nProvider";

export default function CandidateForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { t, locale } = useTranslation();

  const onFinish = (values) => {
    const { resume, experienceLevel, ...rest } = values;

    // Extract file URL if uploaded
    const fileUrl = resume?.[0]?.originFileObj
      ? URL.createObjectURL(resume[0].originFileObj)
      : null;

    dispatch(addCandidate({ ...rest, resume: fileUrl, experienceLevel }));
    message.success(t('form.submitSuccess'), 3);
  };

  const goBack = () => {
    // Include the current locale in the navigation path
    router.push(`/${locale}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center mb-6 text-blue-600">
          {t('form.title')}
        </h2>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label={t('form.fullName')}
            name="name"
            rules={[{ required: true, message: t('form.nameRequired') }]}
          >
            <Input placeholder={t('form.nameHolder')} />
          </Form.Item>

          <Form.Item
            label={t('form.email')}
            name="email"
            rules={[
              { required: true, type: "email", message: t('form.emailRequired') },
            ]}
          >
            <Input placeholder={t('form.emailHolder')} />
          </Form.Item>

          <Form.Item
            label={t('form.phone')}
            name="phone"
            rules={[{ required: true, message: t('form.phoneRequired') }]}
          >
            <Input placeholder={t('form.phoneHolder')} />
          </Form.Item>

          <Form.Item
            label={t('form.positionLabel')}
            name="position"
            rules={[{ required: true, message: t('form.positionRequired') }]}
          >
            <Select
              placeholder={t('form.positionHolder')}
              options={[
                { value: "frontend", label: t('form.positions.frontend') },
                { value: "backend", label: t('form.positions.backend') },
                { value: "fullstack", label: t('form.positions.fullstack') },
                { value: "devops", label: t('form.positions.devops') },
              ]}
            />
          </Form.Item>

          <Form.Item
            label={t('form.experienceLabel')}
            name="experienceLevel"
            rules={[{ required: true, message: t('form.experienceRequired') }]}
          >
            <Select
              placeholder={t('form.experienceHolder')}
              options={[
                { value: "entry", label: t('form.experience.entry') },
                { value: "mid", label: t('form.experience.mid') },
                { value: "senior", label: t('form.experience.senior') },
                { value: "lead", label: t('form.experience.lead') },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="resume"
            label={t('form.resumeLabel')}
            rules={[{ required: true, message: t('form.resumeRequired') }]}
            valuePropName="fileList"
            getValueFromEvent={(e) => e?.fileList}
          >
            <Upload
              beforeUpload={() => false}
              maxCount={1}
              accept=".pdf,.doc,.docx"
              className="w-full"
            >
              <Button
                icon={<UploadOutlined />}
                className="rounded-md w-full border-dashed border-2 p-6 flex items-center justify-center hover:text-blue-500 hover:border-blue-500"
              >
                {t('form.uploadButton')}
              </Button>
            </Upload>
          </Form.Item>

          {/* Submit Button */}
          <div className="flex justify-between">
            <Button onClick={goBack} className="mr-4">
              {t('form.previousButton')}
            </Button>
            <Button type="primary" htmlType="submit">
              {t('form.submitButton')}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

