import React from 'react';
import { ReactNode } from 'react';

const Page = ({ title, children }: { title: string; children: ReactNode }) => {
  return (
    <div className="page">
      <h1>{title}</h1>
      <div>{children}</div>
    </div>
  );
};

export default Page;
