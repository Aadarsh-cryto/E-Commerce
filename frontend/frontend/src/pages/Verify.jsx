import React from "react";

const Verify = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-900">

      <div className="bg-white p-10 rounded-xl text-center shadow-xl">

        <div className="text-6xl mb-5">

            📧

        </div>

        <h1 className="text-3xl font-bold">

            Check Your Email

        </h1>

        <p className="mt-5 text-gray-500">

            We've sent a verification link to your email.

            <br/>

            Please click the link to verify your account.

        </p>

      </div>

    </div>
  );
};

export default Verify;