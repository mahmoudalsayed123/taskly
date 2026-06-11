import Logo from '@/components/Logo';
import MainHeading from '../_components/MainHeading';
import FormSignUp from '../_components/FormSignUp';
import { Suspense } from 'react';

const Signup = () => {
  return (
    <section className="md:max-h-screen md:mt-[80px]">
      <Logo />
      <div className="px-6 pb-5 flex flex-col gap-2 items-center justify-center ">
        <div className="flex flex-col gap-2 items-center justify-center md:bg-white md:shadow-[0px_1px_2px_0px_#0000000D] md:px-7 md:py-5 md:rounded-lg">
          <MainHeading
            heading="Create your workspace"
            title="Join the editorial approach to task management."
            resetSection={false}
          />
          <Suspense fallback={<div>Loading...</div>}>
            <FormSignUp />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default Signup;
