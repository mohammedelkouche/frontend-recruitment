// "use client";
// import { useRouter } from "next/navigation";
// import { Button, Space, Typography } from "antd";

// const { Title, Paragraph } = Typography;

// export default function Home() {
//   const router = useRouter();

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
//       <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
//         <div className="text-center mb-8">
//           <Title level={2} className="text-blue-600 mb-2">Welcome to the Recruitment Platform</Title>
//           <Paragraph className="text-gray-600 text-lg">Select your role to continue</Paragraph>
//         </div>
        
//         <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
//           <Button 
//             type="primary" 
//             size="large"
//             onClick={() => router.push("/form")}
//             className="bg-blue-500 hover:bg-blue-600 border-blue-500 font-medium px-6 py-2 h-auto"
//           >
//             I am a Candidate
//           </Button>
          
//           <Button 
//             size="large"
//             onClick={() => router.push("/recruiters")}
//             className="border-gray-300 text-gray-700 hover:text-blue-500 hover:border-blue-500 font-medium px-6 py-2 h-auto"
//           >
//             I am a Recruiter
//           </Button>
//         </div>
//       </div>
      
//       <div className="mt-16 text-center text-gray-500 text-sm">
//         <p>Need help? <a href="#" className="text-blue-500 hover:underline">Contact support</a></p>
//       </div>
//     </div>
//   );
// }

//====================================

// "use client";
// import { useRouter } from "next/navigation";
// import { Button, Space, Typography } from "antd";
// import { useTranslation } from "../../i18n/I18nProvider";
// import LanguageSelector from "../../components/LanguageSelector";

// const { Title, Paragraph } = Typography;

// export default function Home() {
//   const router = useRouter();
//   const { t, locale } = useTranslation();

//   const handleCandidateClick = () => {
//     router.push(`/${locale}/form`);
//   };

//   const handleRecruiterClick = () => {
//     router.push(`/${locale}/recruiters`);
//   };


//   // new
  
//   // // src/app/[locale]/page.js
//   // // Update the navigation functions to include locale

//   // const handleCandidateClick = () => {
//   //   router.push(`/${locale}/form`);
//   // };

//   // const handleRecruiterClick = () => {
//   //   router.push(`/${locale}/recruiters`);
//   // };
//   // end new

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
//       <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
//         <div className="text-center mb-8">
//           <Title level={2} className="text-blue-600 mb-2">{t('home.welcome')}</Title>
//           <Paragraph className="text-gray-600 text-lg">{t('home.selectRole')}</Paragraph>
//         </div>
        
//         <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
//           <Button 
//             type="primary" 
//             size="large"
//             onClick={handleCandidateClick}
//             className="bg-blue-500 hover:bg-blue-600 border-blue-500 font-medium px-6 py-2 h-auto"
//           >
//             {t('home.candidateButton')}
//           </Button>
          
//           <Button 
//             size="large"
//             onClick={handleRecruiterClick}
//             className="border-gray-300 text-gray-700 hover:text-blue-500 hover:border-blue-500 font-medium px-6 py-2 h-auto"
//           >
//             {t('home.recruiterButton')}
//           </Button>
//         </div>
        
//         <LanguageSelector />
//       </div>
      
//       <div className="mt-16 text-center text-gray-500 text-sm">
//         <p>{t('home.needHelp')} <a href="#" className="text-blue-500 hover:underline">{t('home.contactSupport')}</a></p>
//       </div>
//     </div>
//   );
// }




"use client";
import Link from 'next/link';
import { Button, Typography } from "antd";
import { useTranslation } from "../../i18n/I18nProvider";
import LanguageSelector from "../../components/LanguageSelector";
import { Suspense, useState, useEffect } from 'react';

const { Title, Paragraph } = Typography;

// Pre-load the next pages
const preloadPages = (locale) => {
  // This triggers Next.js's prefetching mechanism
  const links = [
    `/${locale}/form`,
    `/${locale}/recruiters`
  ];
  
  links.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    document.head.appendChild(link);
  });
};

export default function Home() {
  const { t, locale } = useTranslation();
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Preload pages after initial render
  useEffect(() => {
    preloadPages(locale);
    setIsLoaded(true);
  }, [locale]);

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0.5'}`}>
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
        <div className="text-center mb-8">
          <Title level={2} className="text-blue-600 mb-2">{t('home.welcome')}</Title>
          <Paragraph className="text-gray-600 text-lg">{t('home.selectRole')}</Paragraph>
        </div>
        
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
          <Link href={`/${locale}/form`} passHref>
            <Button 
              type="primary" 
              size="large"
              className="bg-blue-500 hover:bg-blue-600 border-blue-500 font-medium px-6 py-2 h-auto"
            >
              {t('home.candidateButton')}
            </Button>
          </Link>
          
          <Link href={`/${locale}/recruiters`} passHref>
            <Button 
              size="large"
              className="border-gray-300 text-gray-700 hover:text-blue-500 hover:border-blue-500 font-medium px-6 py-2 h-auto"
            >
              {t('home.recruiterButton')}
            </Button>
          </Link>
        </div>
        
        <Suspense fallback={<div>Loading language selector...</div>}>
          <LanguageSelector />
        </Suspense>
      </div>
      
      <div className="mt-16 text-center text-gray-500 text-sm">
        <p>{t('home.needHelp')} <a href="#" className="text-blue-500 hover:underline">{t('home.contactSupport')}</a></p>
      </div>
    </div>
  );
}