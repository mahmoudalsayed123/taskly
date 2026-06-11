import Project from '../project/page';

const MainSection = ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  return (
    <div className="relative pt-[64px] h-full w-full h-[calc(100vh - 64px)]">
      <Project searchParams={searchParams} />
    </div>
  );
};
export default MainSection;
