import React from "react";
import SearchIcon from "../atoms/SearchIcon";

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSearch }) => {
  return (
    <div className="flex flex-col items-center justify-center my-12 2xl:my-24">
      <div className="flex items-center max-w-[1024px] w-full">
        <input
          type="search"
          value={value}
          onChange={onChange}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
          className={`flex-grow bg-[#F8F9FA] px-4 py-2 rounded-l border border-[#7E8C9A] focus:border-l focus:border-t focus:border-b focus:border-r-[#7E8C9A] focus:border-[#006fcf] placeholder-[#7E8C9A] h-12 outline-none text-[#67768B] text-lg md:text-[22px]`}
          placeholder="Ask a question"
        />
        <button
          onClick={onSearch}
          className={`flex items-center justify-center bg-[#C10E21] rounded-r w-16 h-12`}
        >
          <SearchIcon />
        </button>
      </div>
      <div className="flex w-full justify-between gap-3 md:gap-0 max-w-[1024px] mt-2">
        <p className="text-[#6d6e71] text-sm font-montserrat">
          Ask using natural language and get only useful results
        </p>
        <p className="text-[#6d6e71] text-sm font-montserrat text-right">
          Powered by{" "}
          <a
            href="https://www.searchwithalden.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold"
          >
            Alden
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default SearchBar;
