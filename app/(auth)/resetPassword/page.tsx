import Image from "next/image";
import Link from "next/link";
import React from "react";
import MainHeading from "../_components/MainHeading";
import Logo from "@/components/Logo";

const ResetPassword = () => {
  return (
    <section className="md:max-h-screen md:mt-[80px]">
      <Logo />
      {/* main heading */}
      <div className="text-center text-[24px]! p-0!">
        <MainHeading
          heading="Create New Password"
          title="Create a new, strong password to secure your workstation access."
          resetSection={true}
        />
      </div>
      <div className="px-6 pb-5 flex flex-col gap-2 items-center justify-center ">
        <div
          className="relative flex flex-col gap-2 items-center justify-center p-8
        md:bg-white md:shadow-[0px_1px_2px_0px_#0000000D] md:p-10 md:rounded-lg shadow-[0px_24px_48px_-12px_#041B3C0F]"
        >
          {/* form */}
          <div className="w-full flex flex-col gap-4 pb-4">
            {/* password */}
            <div className=" flex flex-col items-center ">
              <div className=" relative w-full flex justify-between">
                <label
                  className="w-full  text-label font-bold uppercase text-slate-medium mb-[4px]"
                  htmlFor="password"
                >
                  Password
                </label>
              </div>
              <div className="relative w-full   ">
                <input
                  className="input-mobile w-[276px]! h-[48px]!"
                  type="password"
                  placeholder="Min. 8 characters"
                />
                <Image
                  src="/assets/icons/eye.svg"
                  alt="eye"
                  width={20}
                  height={15}
                  className="absolute top-[50%] translate-y-[-50%] right-3"
                />
              </div>
            </div>
            {/* confirm password */}
            <div className=" flex flex-col items-center ">
              <div className=" relative w-full flex justify-between">
                <label
                  className="w-full  text-label font-bold uppercase text-slate-medium mb-[4px]"
                  htmlFor="password"
                >
                  Confirm Password
                </label>
              </div>
              <div className="relative w-full   ">
                <input
                  className="input-mobile w-[276px]! h-[48px]!"
                  type="password"
                  placeholder="Min. 8 characters"
                />
              </div>
            </div>
          </div>
          {/* send button */}
          <button
            className="w-full btn-primary h-[48px] text-[16px] font-semibold cursor-pointer shadow-[0px_1px_2px_0px_#0000000D]"
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
          <div className="w-full flex flex-col gap-3 p-5 rounded-sm bg-surface-highest ">
            <p className="text-label font-bold text-muted-body">
              Security Requirements
            </p>
            <ul>
              <li className="flex items-center gap-2">
                <div className="mt-1 ">
                  <input
                    type="ratio"
                    id="character"
                    className="w-[15px] h-[15px] rounded-full bg-success"
                    checked={true}
                  />
                </div>
                <div>
                  <label
                    htmlFor="character"
                    className="text-[13px] font-normal text-slate-dark"
                  >
                    8 - 64 characters
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
