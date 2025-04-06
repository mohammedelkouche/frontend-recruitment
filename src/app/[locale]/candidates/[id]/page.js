"use client";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Card, Button, Divider, Typography, Space } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useTranslation } from "../../../../i18n/I18nProvider";

const { Title, Text } = Typography;

const CandidateDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const { t, locale } = useTranslation();
  
  const candidate = useSelector((state) =>
    state.candidates.find((c) => c.id === id)
  );

  if (!candidate) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-full max-w-xl shadow-lg border-red-200">
          <div className="text-center py-4">
            <Text className="text-red-500 text-xl">{t('candidateDetails.notFound')}</Text>
            <div className="mt-4">
              <Button 
                onClick={() => router.push(`/${locale}/recruiters`)}
                icon={<ArrowLeftOutlined />}
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                {t('candidateDetails.returnToList')}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  const handleGoBack = () => {
    // Include the current locale in the navigation path
    router.push(`/${locale}/recruiters`);
  };

  // Function to map position value to readable label
  const getPositionLabel = (positionValue) => {
    return t(`candidateDetails.positions.${positionValue}`) || positionValue;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <Card 
        title={<Title level={4} className="m-0">{t('candidateDetails.title')}</Title>} 
        className="w-full max-w-xl shadow-lg"
        bordered={true}
      >
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-md">
            <Title level={5} className="text-blue-700 mb-1">{candidate.name}</Title>
            <Text className="text-blue-600">{getPositionLabel(candidate.position)}</Text>
          </div>
          
          <Divider className="my-4" />
          
          <div className="grid grid-cols-1 gap-3">
            <div className="flex flex-col">
              <Text type="secondary" className="text-sm">{t('candidateDetails.fields.email')}</Text>
              <Text className="font-medium">{candidate.email}</Text>
            </div>
            
            <div className="flex flex-col">
              <Text type="secondary" className="text-sm">{t('candidateDetails.fields.phone')}</Text>
              <Text className="font-medium">{candidate.phone}</Text>
            </div>
            
            <div className="flex flex-col">
              <Text type="secondary" className="text-sm">{t('candidateDetails.fields.position')}</Text>
              <Text className="font-medium">{getPositionLabel(candidate.position)}</Text>
            </div>
            
            <div className="flex flex-col">
              <Text type="secondary" className="text-sm">{t('candidateDetails.fields.experience')}</Text>
              <Text className="font-medium">{candidate.experienceLevel || t('candidateDetails.notProvided')}</Text>
            </div>
            
            {candidate.resume && (
              <div className="flex flex-col">
                <Text type="secondary" className="text-sm">{t('candidateDetails.fields.resume')}</Text>
                <a
                  href={candidate.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline font-medium"
                >
                  {t('candidateDetails.viewResume')}
                </a>
              </div>
            )}
          </div>
        </div>
        
        {/* Go Back Button */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <Button 
            onClick={handleGoBack} 
            icon={<ArrowLeftOutlined />}
            className="bg-blue-500 text-white hover:bg-blue-600"
            size="large"
          >
            {t('candidateDetails.goBackButton')}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CandidateDetails;