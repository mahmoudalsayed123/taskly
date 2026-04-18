const MainHeading = ({
  heading,
  title,
  resetSection,
}: {
  heading: string;
  title: string;
  resetSection: boolean;
}) => {
  return (
    <div
      className={`${resetSection ? "p-0" : "pt-8 pb-12"} md:pt-4 md:text-center`}
    >
      <h1 className="text-[24px] md:text-[30px] font-semibold text-slate-dark">
        {heading}
      </h1>
      <p className="pb-[0.63px] font-normal text-body text-muted-body">
        {title}
      </p>
    </div>
  );
};

export default MainHeading;
