import Image from 'next/image';
import RetryConnection from './RetryConnection';

const ProjectError = () => {
  return (
    <>
      <div className="w-[64px] h-[64px] flex items-center justify-center bg-invalid rounded-[12px]">
        <Image
          src="/assets/icons/retry.svg"
          alt="error"
          width={28}
          height={25}
        />
      </div>
      <h1 className="text-[20px] font-semibold ">No Projects</h1>
      <p className="max-w-[350px] text-body text-center font-normal text-muted-body">
        You don’t have any projects yet. Start by defining your first
        architectural workspace to begin tracking tasks and epics.
      </p>
      <RetryConnection />
    </>
  );
};

export default ProjectError;
