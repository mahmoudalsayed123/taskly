import Image from 'next/image';
import InviteMembers from '../_components/InviteMembersLg';
import MainHeadingSection from '../_components/MainHeadingSection';
import { BreadcrumbProject } from '../_components/BreadCrumb';
import FromNewProject from '../_components/FromNewProject';

const NewProject = async () => {
  return (
    <section className="section px-6! py-8!">
      <div className=" w-full flex items-center">
        {/* BreadCrumb */}
        {/* <BreadcrumbProject /> */}
      </div>
      {/* Heading Section + Invite Members */}
      <div className="hidden md:flex items-center justify-between w-full mb-8">
        <MainHeadingSection heading="Add New Project" desc={''} />
        <InviteMembers />
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
        <FromNewProject />
      </div>
      {/* Pro Tip */}
      <div className=" p-6 rounded-[8px] bg-resend-container mt-8 md:mt-0 md:p-6">
        <p className="text-label font-bold text-slate-medium mb-1">Pro Tip</p>
        <p className="text-label font-normal text-slate-medium">
          You can invite project members and assign epics immediately after the
          initial creation process.
        </p>
      </div>
    </section>
  );
};
export default NewProject;
