import { getCurrentUser } from '@/lib/getCurrentUser';
import '../globals.css';
import MainSection from '@/app/(main)/_components/MainSection';
import { redirect } from 'next/navigation';

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const user = await getCurrentUser();
  if (user) {
    return redirect('/project');
  }
  return (
    <main className="col-span-6 md:col-span-6 md:ms-[200px] ">
      <MainSection searchParams={searchParams} />
    </main>
  );
};
export default Page;
