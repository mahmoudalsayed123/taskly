import '../globals.css';
import MainSection from '@/app/(main)/_components/MainSection';

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  return (
    <main className="col-span-6 md:col-span-6 md:ms-[200px] ">
      <MainSection searchParams={searchParams} />
    </main>
  );
};
export default Page;
