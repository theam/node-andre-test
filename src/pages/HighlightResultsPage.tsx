import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import Loader from "../components/atoms/Loader";
import { ResourceItem } from "../components/atoms/ResultCard";
import IntroSection from "../components/molecules/IntroSection";
import NoResultsSection from "../components/molecules/NoResultsSection";
import { ResourcesSection } from "../components/molecules/ResourcesSection";
import SearchBar from "../components/molecules/SearchBar";
import HighlightSection from "../components/organisms/HighlightSection";
import { SearchService } from "../services/SearchService";
import Layout from "../templates/Layout";
import { AuthStatusEnum } from "../types/auth-status-enum";
import { TextUtils } from "../utils/TextUtils";

const AuthStatus = import.meta.env.VITE_AUTH0_STATUS;

const HighlightResultsPage: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [otherResources, setOtherResources] = useState<ResourceItem[] | null>(
    null,
  );
  const [mainResource, setMainResource] = useState<ResourceItem | null>(null);
  const [extract, setExtract] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [askedQuestion, setAskedQuestion] = useState<string>("");
  const { getAccessTokenSilently } = useAuth0();
  const isAuthEnabled = AuthStatus !== AuthStatusEnum.Disabled;

  const handleSearch = async () => {
    if (!searchInput) return;

    setIsSearching(true);
    setMainResource(null);
    setOtherResources(null);
    setAskedQuestion(searchInput);

    try {
      const authToken = isAuthEnabled ? await getAccessTokenSilently() : "";
      const { extract, content, embeddings } =
        await SearchService.getExtractAnswer(searchInput, authToken);

      const resources: ResourceItem[] = embeddings.map((item) => ({
        title:
          item?.metadata?.metaTitle ||
          TextUtils.getSanitizedUrlTitle(item.metadata.siteUrl),
        description: item?.metadata?.metaDescription || "",
        url: item?.metadata?.siteUrl,
      }));
      setExtract(extract || "");
      setContent(content || "");
      const [_mainResource, ..._otherResources] = resources;

      setMainResource(_mainResource);
      setOtherResources(_otherResources);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setMainResource({} as ResourceItem);
      setOtherResources([]);
      setAskedQuestion("");
    } finally {
      setIsSearching(false);
    }
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

  if (!mainResource) {
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

  if (!otherResources?.length) {
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
      <HighlightSection
        resource={mainResource}
        extract={extract}
        content={content}
      />
      <ResourcesSection resources={otherResources || []} />
    </Layout>
  );
};

export default HighlightResultsPage;
