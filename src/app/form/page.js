"use client";
import { Form, Input, Button, Select, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { addCandidate } from "../redux/candidatesSlice";
import { useRouter } from "next/navigation";

export default function CandidateForm() {
  const dispatch = useDispatch();
  const router = useRouter();

  const onFinish = (values) => {
    const { resume, experienceLevel, ...rest } = values;

    // Extract file URL if uploaded
    const fileUrl = resume?.[0]?.originFileObj
      ? URL.createObjectURL(resume[0].originFileObj)
      : null;

    dispatch(addCandidate({ ...rest, resume: fileUrl, experienceLevel }));
    message.success("Your application was submitted successfully!", 3);
  };

  const goBack = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center mb-6 text-blue-600">
          Candidate Form
        </h2>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Enter your full name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "Please enter your phone number" }]}
          >
            <Input placeholder="Enter your phone number" />
          </Form.Item>

          <Form.Item
            label="Position Applied For"
            name="position"
            rules={[{ required: true, message: "Please select a position" }]}
          >
            <Select
              placeholder="Select a position"
              options={[
                { value: "frontend", label: "Frontend Developer" },
                { value: "backend", label: "Backend Developer" },
                { value: "fullstack", label: "Full Stack Developer" },
                { value: "devops", label: "DevOps Engineer" },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="Experience Level"
            name="experienceLevel"
            rules={[{ required: true, message: "Please select your experience level" }]}
          >
            <Select
              placeholder="Select your experience level"
              options={[
                { value: "entry", label: "Entry Level (0-2 years)" },
                { value: "mid", label: "Mid-Level (3-5 years)" },
                { value: "senior", label: "Senior (5+ years)" },
                { value: "lead", label: "Lead (8+ years)" },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="resume"
            label="Resume/CV"
            rules={[{ required: true, message: "Please upload your resume" }]}
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
                Click to Upload Resume/CV
              </Button>
            </Upload>
          </Form.Item>

          {/* Submit Button */}
          <div className="flex justify-between">
            <Button onClick={goBack} className="mr-4">
              Previous
            </Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

