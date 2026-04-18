import '../globals.css';
import Header from '@/app/(main)/_components/Header';
import MainSection from '@/app/(main)/_components/MainSection';

const Page = async () => {
  return (
    <main className="col-span-6 md:col-span-5 lg:ms-[196.2px]">
      <Header />
      <MainSection />
    </main>
  );
};
export default Page;
