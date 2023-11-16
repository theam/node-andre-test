import React from "react";

interface Props {
  color?: "white" | "black";
}

const SearchIcon: React.FC<Props> = (props: Props) => {
  const color = props.color ?? "white";

  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_20_3599)">
        <path
          d="M8.0312 15.0656C3.8786 15.0656 0.5 11.687 0.5 7.53437C0.5 3.38177 3.8786 0.00317383 8.0312 0.00317383C12.1838 0.00317383 15.5624 3.38177 15.5624 7.53437C15.5624 11.687 12.1838 15.0656 8.0312 15.0656ZM8.0312 2.32067C5.1557 2.32067 2.8175 4.65977 2.8175 7.53437C2.8175 10.409 5.1566 12.7481 8.0312 12.7481C10.9058 12.7481 13.2449 10.409 13.2449 7.53437C13.2449 4.65977 10.9058 2.32067 8.0312 2.32067Z"
          fill={color}
        />
        <path
          d="M17.3418 18.0032C17.0457 18.0032 16.7487 17.8898 16.5228 17.6639L12.426 13.568C11.9733 13.1153 11.9733 12.3818 12.426 11.93C12.8787 11.4773 13.6122 11.4773 14.064 11.93L18.1607 16.0259C18.6135 16.4786 18.6135 17.2121 18.1607 17.6639C17.9339 17.8898 17.6379 18.0032 17.3418 18.0032Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_20_3599">
          <rect
            width="18"
            height="18"
            fill={color}
            transform="translate(0.5 0.00317383)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default SearchIcon;
