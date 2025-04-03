"use client";
import { useRouter } from "next/navigation";
import { Button, Space, Typography } from "antd";

const { Title, Paragraph } = Typography;

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
        <div className="text-center mb-8">
          <Title level={2} className="text-blue-600 mb-2">Welcome to the Recruitment Platform</Title>
          <Paragraph className="text-gray-600 text-lg">Select your role to continue</Paragraph>
        </div>
        
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
          <Button 
            type="primary" 
            size="large"
            onClick={() => router.push("/form")}
            className="bg-blue-500 hover:bg-blue-600 border-blue-500 font-medium px-6 py-2 h-auto"
          >
            I am a Candidate
          </Button>
          
          <Button 
            size="large"
            onClick={() => router.push("/recruiters")}
            className="border-gray-300 text-gray-700 hover:text-blue-500 hover:border-blue-500 font-medium px-6 py-2 h-auto"
          >
            I am a Recruiter
          </Button>
        </div>
      </div>
      
      <div className="mt-16 text-center text-gray-500 text-sm">
        <p>Need help? <a href="#" className="text-blue-500 hover:underline">Contact support</a></p>
      </div>
    </div>
  );
}