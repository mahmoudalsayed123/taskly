import { prisma } from '@/prisma';
import FormUpdateProject from './_components/FormUpdateProject';
import MainHeadingSection from '../../_components/MainHeadingSection';
import Image from 'next/image';

const UpdateProject = async ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const { projectId } = await params;
  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
  });

  return (
    <section className="section">
      <div className=" w-full flex items-center">
        {/* BreadCrumb */}
        {/* <BreadcrumbProject /> */}
      </div>
      <div className=" w-full mb-10">
        <MainHeadingSection
          heading="Update Project"
          desc={`Refine your project details, adjust the timeline, or reassign ownership to keep your project on track.`}
        />
      </div>
      <div className="md:p-4 md:shadow-lg">
        {/* Heading Form  */}
        <div className="flex items-center gap-3 mb-[60px]">
          <div className="hidden md:block p-3 rounded-lg bg-surface-highest">
            <Image
              src="/assets/icons/init-project.svg"
              alt="project"
              width={22}
              height={20}
            />
          </div>
          <div>
            <h2 className="text-[24px] font-semibold text-slate-dark">
              Initial New Project
            </h2>
            <p className="text-body font-normal text-slate-medium">
              Define the scope and foundational details of your project.
            </p>
          </div>
        </div>
        {/* Form */}
        <FormUpdateProject project={project} />
      </div>
    </section>
  );
};

export default UpdateProject;
