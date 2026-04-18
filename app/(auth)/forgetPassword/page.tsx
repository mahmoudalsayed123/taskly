import Image from "next/image";
import Link from "next/link";
import React from "react";
import MainHeading from "../_components/MainHeading";
import Logo from "@/components/Logo";

const ForgetPassword = () => {
  return (
    <section className="md:max-h-screen md:mt-[80px]">
      <Logo />
      <div className="px-6 pb-5 flex flex-col gap-2 items-center justify-center ">
        <div
          className="relative flex flex-col gap-2 items-center justify-center  mt-[60px] p-8
        md:bg-white md:shadow-[0px_1px_2px_0px_#0000000D] md:p-10 md:rounded-lg shadow-[0px_24px_48px_-12px_#041B3C0F]"
        >
          {/* lock icon */}
          <div className="absolute top-[-24px] left-1/2 translate-x-[-50%] md:hidden min-w-[48px] min-h-[48px] flex items-center justify-center gap-2 mb-6 bg-surface-highest rounded-xl">
            <Image
              src="/assets/icons/forgetPass_lock.svg"
              alt="forgetPass_lock"
              width={20}
              height={20}
            />
          </div>
          {/* main heading */}
          <div className="text-center">
            <MainHeading
              heading="Forget Password"
              title="No worries, we'll send you reset
instructions."
            />
          </div>
          {/* form */}
          <div className="w-full  flex flex-col gap-11 pb-4">
            {/* email */}
            <div className="relative flex flex-col items-center ">
              <label className="label" htmlFor="email">
                Email Address
              </label>
              <div className="relative w-full ">
                <input
                  className="input-mobile"
                  type="email"
                  placeholder="curator@workspace.com"
                />
                <Image
                  src="/assets/icons/email.svg"
                  alt="email"
                  width={15}
                  height={15}
                  className="absolute top-[50%] translate-y-[-50%] right-3"
                />
              </div>
            </div>
          </div>
          {/* send button */}
          <button
            className="w-full btn-primary h-[56px] text-[16px] font-semibold cursor-pointer  shadow-[0px_1px_2px_0px_#0000000D]"
            type="submit"
          >
            Send
          </button>
          {/* back to login */}
          <div className="flex items-center gap-2 py-4 md:w-full md:justify-center md:px-0 md:pt-3 md:pb-3">
            <Image
              src="/assets/icons/arrow-left.svg"
              alt="arrow-left"
              width={12}
              height={12}
            />
            <Link href="/login" className="text-primary text-body font-medium">
              Back to Log in
            </Link>
          </div>
        </div>

        {/* success message */}
        <div className="bg-success-light rounded-sm p-4 md:mt-10 md:max-w-[366px]">
          {/* icon and text */}
          <div className="flex items-start gap-3">
            <Image
              src="/assets/icons/correct.svg"
              alt="forgetPass_img"
              width={20}
              height={20}
              className="mt-1 md:mt-0 min-w-5 min-h-5 max-w-6 max-h-6"
            />
            <p className="text-body font-medium text-success-text">
              If an account exists with this email, we've sent a password reset
              link.
            </p>
          </div>
          <hr className="border-success-text my-2 md:hidden" />
          {/* resend */}
          <div className="flex items-center justify-between md:hidden">
            <div>
              <p className="text-label font-bold text-success-text">
                Didn't receive an email?
              </p>
            </div>
            <div>
              <p className="text-label font-bold text-primary">
                Resend in 05:00
              </p>
            </div>
          </div>
        </div>
        {/* do not receive email */}
        <div className="mt-5 pb-10 hidden md:block">
          <p className="text-label font-bold text-muted-body text-center mb-2">
            Didn't receive the email?
          </p>
          <div className="flex items-center justify-center gap-2 rounded-sm bg-resend-container w-[366px] h-[48px]">
            <Image
              src="/assets/icons/clock.svg"
              alt="clock"
              width={18}
              height={21}
            />
            <p className="text-muted-body font-semibold">Resend in 05:00</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgetPassword;
