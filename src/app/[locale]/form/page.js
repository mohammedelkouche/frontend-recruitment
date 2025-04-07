// "use client";
// import { Form, Input, Button, Select, Upload, message } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
// import { useDispatch } from "react-redux";
// import { addCandidate } from "../../redux/candidatesSlice";
// import { useRouter } from "next/navigation";

// export default function CandidateForm() {
//   const dispatch = useDispatch();
//   const router = useRouter();

//   const onFinish = (values) => {
//     const { resume, experienceLevel, ...rest } = values;

//     // Extract file URL if uploaded
//     const fileUrl = resume?.[0]?.originFileObj
//       ? URL.createObjectURL(resume[0].originFileObj)
//       : null;

//     dispatch(addCandidate({ ...rest, resume: fileUrl, experienceLevel }));
//     message.success("Your application was submitted successfully!", 3);
//   };

//   const goBack = () => {
//     router.push("/");
//   };

//   // // new
//   // // src/app/[locale]/form/page.js
//   // // Update the goBack function
//   // const goBack = () => {
//   //   router.push(`/${locale}/`);
//   // };
//   // // end new

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
//         <h2 className="text-2xl font-semibold text-center mb-6 text-blue-600">
//           Candidate Form
//         </h2>

//         <Form layout="vertical" onFinish={onFinish}>
//           <Form.Item
//             label="Full Name"
//             name="name"
//             rules={[{ required: true, message: "Please enter your name" }]}
//           >
//             <Input placeholder="Enter your full name" />
//           </Form.Item>

//           <Form.Item
//             label="Email"
//             name="email"
//             rules={[
//               { required: true, type: "email", message: "Please enter a valid email" },
//             ]}
//           >
//             <Input placeholder="Enter your email" />
//           </Form.Item>

//           <Form.Item
//             label="Phone"
//             name="phone"
//             rules={[{ required: true, message: "Please enter your phone number" }]}
//           >
//             <Input placeholder="Enter your phone number" />
//           </Form.Item>

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

//           <Form.Item
//             label="Experience Level"
//             name="experienceLevel"
//             rules={[{ required: true, message: "Please select your experience level" }]}
//           >
//             <Select
//               placeholder="Select your experience level"
//               options={[
//                 { value: "entry", label: "Entry Level (0-2 years)" },
//                 { value: "mid", label: "Mid-Level (3-5 years)" },
//                 { value: "senior", label: "Senior (5+ years)" },
//                 { value: "lead", label: "Lead (8+ years)" },
//               ]}
//             />
//           </Form.Item>

//           <Form.Item
//             name="resume"
//             label="Resume/CV"
//             rules={[{ required: true, message: "Please upload your resume" }]}
//             valuePropName="fileList"
//             getValueFromEvent={(e) => e?.fileList}
//           >
//             <Upload
//               beforeUpload={() => false}
//               maxCount={1}
//               accept=".pdf,.doc,.docx"
//               className="w-full"
//             >
//               <Button
//                 icon={<UploadOutlined />}
//                 className="rounded-md w-full border-dashed border-2 p-6 flex items-center justify-center hover:text-blue-500 hover:border-blue-500"
//               >
//                 Click to Upload Resume/CV
//               </Button>
//             </Upload>
//           </Form.Item>

//           {/* Submit Button */}
//           <div className="flex justify-between">
//             <Button onClick={goBack} className="mr-4">
//               Previous
//             </Button>
//             <Button type="primary" htmlType="submit">
//               Submit
//             </Button>
//           </div>
//         </Form>
//       </div>
//     </div>
//   );
// }


// src/app/[locale]/form/page.js - Updated goBack function
"use client";
import { Form, Input, Button, Select, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { addCandidate } from "../../redux/candidatesSlice";
import { useRouter } from "next/navigation";
// import { useTranslation } from "../../i18n/I18nProvider";
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
