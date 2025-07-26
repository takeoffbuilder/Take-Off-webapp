"use client";

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-50">
      <div className="bg-white p-8 rounded shadow text-center">
        <h1 className="text-2xl font-bold mb-4 text-sky-600">
          Verify Your Email
        </h1>
        <p className="text-gray-700">
          Please check your inbox for a verification link. <br />
          Once you verify your email, log in to get started.
        </p>
      </div>
    </div>
  );
}
