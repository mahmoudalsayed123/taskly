import React from 'react';

const RetryConnection = () => {
  return (
    <button
      className={`w-fit px-6 py-3 items-center gap-2 rounded-sm bg-primary-container text-white font-semibold cursor-pointer`}
    >
      <span className="lg:text-title md:text-body font-medium">
        Retry Connection
      </span>
    </button>
  );
};

export default RetryConnection;
