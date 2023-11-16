import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import Loader from "../components/atoms/Loader";
import { ResourceItem } from "../components/atoms/ResultCard";
import IntroSection from "../components/molecules/IntroSection";
import NoResultsSection from "../components/molecules/NoResultsSection";
import { ResourcesSection } from "../components/molecules/ResourcesSection";
import SearchBar from "../components/molecules/SearchBar";
import ResultsSection from "../components/organisms/ResultsSection";
import { SearchService } from "../services/SearchService";
import Layout from "../templates/Layout";
import { AuthStatusEnum } from "../types/auth-status-enum";
import { TextUtils } from "../utils/TextUtils";

const MAIN_RESULTS_COUNT = 2;
const AuthStatus = import.meta.env.VITE_AUTH0_STATUS;

const SearchResults: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [mainResources, setMainResources] = useState<ResourceItem[] | null>(
    null,
  );
  const [otherResources, setOtherResources] = useState<ResourceItem[] | null>(
    null,
  );
  const [askedQuestion, setAskedQuestion] = useState<string>("");
  const { getAccessTokenSilently } = useAuth0();
  const isAuthEnabled = AuthStatus !== AuthStatusEnum.Disabled;

  const handleSearch = async () => {
    if (!searchInput) return;

    setIsSearching(true);
    setMainResources(null);
    setOtherResources(null);
    setAskedQuestion(searchInput);

    try {
      const authToken = isAuthEnabled ? await getAccessTokenSilently() : "";
      const { embeddings } = await SearchService.getSimilarContent(
        searchInput,
        authToken,
      );

      const searchResults: ResourceItem[] = embeddings.map((item) => ({
        title:
          item?.metadata?.metaTitle ||
          TextUtils.getSanitizedUrlTitle(item.metadata.siteUrl),
        description: item?.metadata?.metaDescription || "",
        url: item?.metadata?.siteUrl,
      }));

      setMainResources(searchResults.slice(0, MAIN_RESULTS_COUNT));
      setOtherResources(searchResults.slice(MAIN_RESULTS_COUNT));
    } catch (error) {
      setMainResources([]);
      console.error("Error fetching search results:", error);
    }

    setIsSearching(false);
  };

  if (isSearching) {
    return (
      <Layout>
        <SearchBar
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onSearch={handleSearch}
        />
        <div className="w-full bg-white p-8 flex flex-col gap-10">
          <div className="flex gap-4 items-center">
            <Loader />
            <p className="text-[#C10E21] font-bold font-montserrat">
              Powered by Alden
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <div className="animate-pulse w-full h-4 rounded-[50px] bg-[#BDBDBD]/10"></div>
            <div className="animate-pulse w-full h-4 rounded-[50px] bg-[#BDBDBD]/10"></div>
            <div className="animate-pulse w-full h-4 rounded-[50px] bg-[#BDBDBD]/10"></div>
            <div className="animate-pulse w-1/2 h-4 rounded-[50px] bg-[#C10E21]/10"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!mainResources) {
    return (
      <Layout>
        <SearchBar
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onSearch={handleSearch}
        />
        <IntroSection />
      </Layout>
    );
  }

  if (!mainResources.length) {
    return (
      <Layout>
        <SearchBar
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onSearch={handleSearch}
        />
        <NoResultsSection query={askedQuestion} />
      </Layout>
    );
  }

  return (
    <Layout>
      <SearchBar
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onSearch={handleSearch}
      />
      <ResultsSection results={mainResources} />
      <ResourcesSection
        offset={mainResources.length || 0}
        resources={otherResources || []}
      />
    </Layout>
  );
};

export default SearchResults;
