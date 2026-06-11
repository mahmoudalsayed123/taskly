import MainHeading from '../_components/MainHeading';
import Logo from '@/components/Logo';
import FormLogin from '@/app/(auth)/_components/FormLogin';
import { cookies } from 'next/headers';

const Login = async () => {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  return (
    <section className="md:max-h-screen md:mt-[80px]">
      <Logo />
      <div className="px-6 pb-5 flex flex-col gap-2 items-center justify-center ">
        <div
          className="flex flex-col gap-2 items-center justify-center
        md:bg-white md:shadow-[0px_1px_2px_0px_#0000000D] md:px-7 md:py-5 md:rounded-lg"
        >
          {/* main heading */}
          <div className="text-center">
            <MainHeading
              heading="Welcome Back"
              title="Please enter your details to access your workspace"
              resetSection={false}
            />
          </div>
          <FormLogin token={token || ''} />
          {/* remember me */}
          <div className="w-full flex items-center gap-3 px-1 pb-4 ">
            <input
              type="checkbox"
              name="remember-me"
              id="remember-me"
              className="w-5 h-5 mt-0.5 rounded-[20px] border border-slate-medium"
            />
            <label
              htmlFor="remember-me"
              className="text-body font-medium text-muted-body"
            >
              Remember me
            </label>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
