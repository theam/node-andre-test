import { FC } from "react";

interface LoaderProps {
  width?: number;
  height?: number;
}

const Loader: FC<LoaderProps> = ({ width = 39, height = 39 }) => {
  return (
    <div role="status" className="animate-spin animat">
      <svg
        width={width}
        height={height}
        viewBox="0 0 39 39"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.7507 8.8055C5.08122 13.6477 4.41058 22.1691 9.25276 27.8385C14.0949 33.508 22.6163 34.1786 28.2858 29.3365C33.9553 24.4943 34.6259 15.9729 29.7837 10.3034C24.9415 4.63396 16.4202 3.96331 10.7507 8.8055Z"
          fill="#C10E21"
        />
        <path
          d="M25.0355 18.3097C27.0794 15.3358 26.3255 11.268 23.3516 9.22414C20.3777 7.18023 16.3099 7.93414 14.266 10.908C12.2221 13.882 12.976 17.9497 15.9499 19.9936C18.9238 22.0375 22.9916 21.2836 25.0355 18.3097Z"
          fill="white"
        />
      </svg>
    </div>
  );
};

export default Loader;
