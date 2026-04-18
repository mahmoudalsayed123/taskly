import Logo from '@/components/Logo';
import MainHeading from '../_components/MainHeading';
import Link from 'next/link';
import FormSignUp from '../_components/FormSignUp';

const Signup = async () => {
  // const user = await prisma.user.deleteMany();
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
          <FormSignUp />
          {/* Footer */}
          <div className="px-8 py-[47.5px] md:w-full md:px-0 md:pt-8 md:pb-0">
            <p className="text-center text-body font-semibold text-slate-medium">
              Already have an account?{' '}
              <Link href="/login" className="text-primary text-body">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
