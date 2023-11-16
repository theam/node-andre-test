import React, { useMemo } from "react";
import { AppMarkdown } from "../atoms/AppMarkdown";
import HeartIcon from "../atoms/HeartIcon";
import { OpenLinkIcon } from "../atoms/OpenLinkIcon";
import { ResourceItem } from "../atoms/ResultCard";

interface HighlightSectionProps {
  resource: ResourceItem;
  content: string;
  extract: string;
}

const HighlightSection: React.FC<HighlightSectionProps> = ({
  resource,
  content,
  extract,
}) => {
  const trimmedContent = useMemo(() => {
    const NSENTENCES_AROUND = 2;

    const sentences = content.split(/\n(?=\d+\.\s)|\n\n/).filter(Boolean);
    const formattedExtract = extract.toLowerCase();

    let extractSentenceFirstIdx = -1;
    let extractSentenceLastIdx = -1;
    sentences.forEach((sentence, idx) => {
      const formattedSentence = sentence.toLowerCase();
      if (
        formattedExtract.includes(formattedSentence) ||
        formattedSentence.includes(formattedExtract)
      ) {
        if (extractSentenceFirstIdx === -1) {
          extractSentenceFirstIdx = idx;
        }
        extractSentenceLastIdx = idx;
      }
    });

    if (extractSentenceFirstIdx === -1) return "";

    const beforeExtractIdx = Math.max(
      0,
      extractSentenceFirstIdx - NSENTENCES_AROUND,
    );
    const afterExtractIdx = extractSentenceLastIdx + NSENTENCES_AROUND;

    return `[...] ${sentences
      .slice(beforeExtractIdx, afterExtractIdx)
      .join("\n\n")} [...]`;
  }, [content, extract]);

  return (
    <>
      <div className="bg-white p-8">
        <div className="flex items-end mb-14 gap-3">
          <HeartIcon />
          <p className="text-[#6D6E71] font-montserrat">
            Result that best answers your question:
          </p>
        </div>
        <div className="result-card pb-10 font-montserrat">
          <AppMarkdown content={trimmedContent} highlightStr={extract} />
        </div>
        <div className="flex gap-4">
          <span className="font-montserrat text-lg text-[#67768B]">
            Source link:{" "}
          </span>
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#C0242B] text-lg font-bold hover:underline leading-6 flex gap-2 items-center font-montserrat"
          >
            <OpenLinkIcon />
            {resource.title || resource.url}
          </a>
        </div>
      </div>
    </>
  );
};

export default HighlightSection;
