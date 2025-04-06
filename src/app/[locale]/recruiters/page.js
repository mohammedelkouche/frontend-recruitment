"use client";
import { Table, Button } from "antd";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useTranslation } from "../../../i18n/I18nProvider";

const RecruiterList = () => {
  const candidates = useSelector((state) => state.candidates);
  const router = useRouter();
  const { t, locale } = useTranslation();

  const handleViewDetails = (id) => {
    // Include the current locale in the navigation path
    router.push(`/${locale}/candidates/${id}`);
  };

  const handleGoBack = () => {
    // Include the current locale in the navigation path
    router.push(`/${locale}`);
  };

  const columns = [
    { 
      title: t('recruiters.columns.name'), 
      dataIndex: "name", 
      key: "name" 
    },
    { 
      title: t('recruiters.columns.email'), 
      dataIndex: "email", 
      key: "email" 
    },
    { 
      title: t('recruiters.columns.phone'), 
      dataIndex: "phone", 
      key: "phone" 
    },
    {
      title: t('recruiters.columns.action'),
      key: "action",
      render: (_, record) => (
        <button
          onClick={() => handleViewDetails(record.id)}
          className="text-blue-500 hover:underline"
        >
          {t('recruiters.viewDetails')}
        </button>
      ),
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-center mb-6 text-blue-600">
          {t('recruiters.title')}
        </h2>
        
        <div className="mb-4">
          <Button onClick={handleGoBack} className="bg-blue-500 text-white hover:bg-blue-600">
            {t('recruiters.goBackButton')}
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