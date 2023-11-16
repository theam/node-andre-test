import React, { useMemo } from "react";
import HeartIcon from "../atoms/HeartIcon";
import { ResourceCard, ResourceItem } from "../atoms/ResultCard";

interface ResultsSectionProps {
  results: ResourceItem[];
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ results }) => {
  const mainResults = useMemo(() => results.slice(0, 2), [results]);

  return (
    <>
      <div id="app-results" className="bg-white p-4 md:p-8">
        <div className="flex items-end mb-3 md:mb-3">
          <HeartIcon />
          <p className="text-black text-[16px] ml-3">
            <span className="font-bold">{mainResults.length}</span> Result
            {mainResults.length !== 1 && "s"} that{" "}
            <strong>best answer{mainResults.length !== 1 && "s"}</strong> your
            question
          </p>
        </div>
        {mainResults.map((result, index) => (
          <ResourceCard key={index} index={index} {...result} />
        ))}
      </div>
    </>
  );
};

export default ResultsSection;
