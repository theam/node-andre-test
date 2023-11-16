import { FC } from "react";

export interface Auth0ErrorPageParams {
  error: Error;
}

export const Auth0ErrorPage: FC<Auth0ErrorPageParams> = ({ error }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Error</h2>
        <p className="text-red-600">{error.message}</p>
      </div>
    </div>
  );
};

export default Auth0ErrorPage;
