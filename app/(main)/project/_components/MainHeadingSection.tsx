const MainHeadingSection = ({
  heading,
  desc,
}: {
  heading: string;
  desc: string;
}) => {
  return (
    <div className="flex flex-col items-start gap-1">
      <h1 className="text-[24px] md:text-heading font-bold text-slate-dark">
        {heading}
      </h1>
      <p className="text-body font-normal text-muted-body max-w-[400px]">
        {desc}
      </p>
    </div>
  );
};

export default MainHeadingSection;
