import { getCurrentUser } from '@/lib/getCurrentUser';
import Project from '../project/page';
import { redirect } from 'next/navigation';

const MainSection = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const user = await getCurrentUser();
  if (user) {
    return redirect('/project');
  }
  return (
    <div className="relative pt-[64px] h-full w-full h-[calc(100vh - 64px)]">
      <Project searchParams={searchParams} />
    </div>
  );
};
export default MainSection;
