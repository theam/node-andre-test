import { FC } from "react";

interface NoResultsSectionProps {
  query?: string;
}

const NoResultsSection: FC<NoResultsSectionProps> = ({ query }) => {
  const handleDummyContact = () => {
    alert("This functionality is not available on this demo");
  };

  return (
    <div className="flex flex-col gap-8">
      <p className="font-montserrat text-lg">
        Sorry, we didn&apos;t find results for{" "}
        <b>{query?.length ? `"${query}"` : "your question"}</b>
      </p>
      <div className="bg-white flex flex-col justify-center items-center py-10 px-4">
        <p className="text-xl font-montserrat font-semibold mb-4">
          Do you need an answer? Request it here.
        </p>
        <p className="font-montserrat mb-9">
          One of our agents will contact you with your answer
        </p>
        <button
          onClick={handleDummyContact}
          className="bg-red-700 text-white px-9 py-2 rounded-md uppercase font-montserrat"
        >
          Send my question
        </button>
      </div>
    </div>
  );
};

export default NoResultsSection;
