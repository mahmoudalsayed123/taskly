import { getCurrentUser } from '@/lib/getCurrentUser';
import '../globals.css';
import MainSection from '@/app/(main)/_components/MainSection';
import { redirect } from 'next/navigation';

const Page = async () => {
  const user = await getCurrentUser();
  
  if (user) {
    redirect('/project');
  }
  return (
    <main className="col-span-6 md:col-span-6 md:ms-[198px] ">
      <MainSection />
      

    </main>
  );
};
export default Page;
