"use client";
import { Table, Button } from "antd";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const RecruiterList = () => {
  const candidates = useSelector((state) => state.candidates);
  const router = useRouter();

  const handleViewDetails = (id) => {
    router.push(`/candidates/${id}`);
  };

  const handleGoBack = () => {
    router.push("/");
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <button
          onClick={() => handleViewDetails(record.id)}
          className="text-blue-500 hover:underline"
        >
          View Details
        </button>
      ),
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-center mb-6 text-blue-600">
          Recruiter - Candidate List
        </h2>
        
        <div className="mb-4">
          <Button onClick={handleGoBack} className="bg-blue-500 text-white hover:bg-blue-600">
            Go Back
          </Button>
        </div>

        <Table
          dataSource={candidates}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </div>
    </div>
  );
};

export default RecruiterList;
