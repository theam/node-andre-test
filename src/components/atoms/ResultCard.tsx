import { FC } from "react";

export interface ResourceItem {
  title: string;
  description: string;
  url: string;
}

type ResourceCardProps = ResourceItem & {
  index: number;
  startIndex?: number;
  animate?: boolean;
};

export const ResourceCard: FC<ResourceCardProps> = ({
  title,
  description,
  url,
  index,
  startIndex = 0,
  animate,
}) => {
  const cartIdx = startIndex + index + 1;
  return (
    <div
      style={{ animationDelay: `${cartIdx * 100}ms` }}
      className={`border-b border-[#DEE2E6] py-5 px-4 md:px-8 ${
        animate ? "fade-in-up" : ""
      }`}
    >
      <div className="flex">
        <span className="text-[#6D6E71] text-[12px] font-medium mr-2 flex items-start mt-1">
          {cartIdx}.
        </span>
        <div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#C10E21] text-[16px] hover:underline"
          >
            {title || url}
          </a>
          <p className="text-[#313A45] text-[15px] mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
};
