// "use client";
// import { Form, Input, Button, Select } from "antd";
// import { useRouter } from "next/navigation";
// import { useDispatch } from "react-redux";
// import { addCandidate } from "../redux/candidatesSlice";

// export default function CandidateForm() {
//   const router = useRouter();
//   const dispatch = useDispatch();

//   const onFinish = (values) => {
//     dispatch(addCandidate(values)); // Store in Redux
//     router.push("/recruiters"); // Redirect to recruiter list
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
//         <h2 className="text-2xl font-semibold text-center mb-6 text-blue-600">
//           Candidate Form
//         </h2>

//         <Form layout="vertical" onFinish={onFinish}>
//           {/* Full Name */}
//           <Form.Item
//             label="Full Name"
//             name="name"
//             rules={[{ required: true, message: "Please enter your name" }]}
//           >
//             <Input placeholder="Enter your full name" />
//           </Form.Item>

//           {/* Email */}
//           <Form.Item
//             label="Email"
//             name="email"
//             rules={[
//               { required: true, type: "email", message: "Please enter a valid email" },
//             ]}
//           >
//             <Input placeholder="Enter your email" />
//           </Form.Item>

//           {/* Phone */}
//           <Form.Item
//             label="Phone"
//             name="phone"
//             rules={[{ required: true, message: "Please enter your phone number" }]}
//           >
//             <Input placeholder="Enter your phone number" />
//           </Form.Item>

//           {/* Position Applied For */}
//           <Form.Item
//             label="Position Applied For"
//             name="position"
//             rules={[{ required: true, message: "Please select a position" }]}
//           >
//             <Select
//               placeholder="Select a position"
//               options={[
//                 { value: "frontend", label: "Frontend Developer" },
//                 { value: "backend", label: "Backend Developer" },
//                 { value: "fullstack", label: "Full Stack Developer" },
//                 { value: "devops", label: "DevOps Engineer" },
//               ]}
//             />
//           </Form.Item>

//           {/* Submit Button */}
//           <div className="flex justify-end">
//             <Button type="primary" htmlType="submit">
//               Submit
//             </Button>
//           </div>
//         </Form>
//       </div>
//     </div>
//   );
// }


//============================================//

"use client";
import { Form, Input, Button, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addCandidate } from "../redux/candidatesSlice";

export default function CandidateForm() {
  const router = useRouter();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    const { resume, ...rest } = values;

    // Extract file URL if uploaded
    const fileUrl = resume?.[0]?.originFileObj
      ? URL.createObjectURL(resume[0].originFileObj)
      : null;

    dispatch(addCandidate({ ...rest, resume: fileUrl })); // Store only the file URL
    router.push("/recruiters"); // Redirect to recruiter list
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center mb-6 text-blue-600">
          Candidate Form
        </h2>

        <Form layout="vertical" onFinish={onFinish}>
          {/* Full Name */}
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Enter your full name" />
          </Form.Item>

          {/* Email */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          {/* Phone */}
          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "Please enter your phone number" }]}
          >
            <Input placeholder="Enter your phone number" />
          </Form.Item>

          {/* Position Applied For */}
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

          {/* Resume Upload */}
          <Form.Item
            name="resume"
            label="Resume/CV"
            rules={[{ required: true, message: "Please upload your resume" }]}
            valuePropName="fileList"
            getValueFromEvent={(e) => e?.fileList}
          >
            <Upload
              beforeUpload={() => false} // Prevent instant upload
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
          <div className="flex justify-end">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

