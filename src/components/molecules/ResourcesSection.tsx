import { FC, useEffect, useState } from "react";
import { ResourceCard, ResourceItem } from "../atoms/ResultCard";

const SCROLL_OFFSET = 100;

export interface ResourcesSectionProps {
  offset?: number;
  resources: ResourceItem[];
}

export const ResourcesSection: FC<ResourcesSectionProps> = ({
  resources,
  offset = 0,
}) => {
  const [showResources, setShowResources] = useState(false);

  useEffect(() => {
    if (showResources) {
      // Scroll to the bottom
      setTimeout(() => {
        const toggleResultsPos =
          document.getElementById("app-toggle-results")?.offsetTop || 0;

        window.scrollTo({
          top: toggleResultsPos - SCROLL_OFFSET,
          behavior: "smooth",
        });
      }, 100);
    }
  }, [showResources]);

  const handleToggleShowResources = () => {
    setShowResources(!showResources);
  };

  return (
    <>
      <div className="flex justify-center mt-8">
        <button
          id="app-toggle-results"
          onClick={handleToggleShowResources}
          className="bg-white border border-[#D0D0D0] rounded text-[15px] font-medium text-[#C10E21] py-1 px-4"
        >
          {showResources ? "Hide more results" : "Show more results"}
        </button>
      </div>

      {showResources && (
        <div className="mt-8 mb-12">
          {resources.map((resource, index) => (
            <ResourceCard
              key={index}
              index={offset + index}
              animate
              {...resource}
            />
          ))}
        </div>
      )}
    </>
  );
};
