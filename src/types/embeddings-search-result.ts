export type EmbeddingSearchResultItem = {
  title: string;
  description?: string;
  url: string;
};

export type EmbeddingsSearchResult = {
  main: {
    extract: string;
    content: string;
    item: EmbeddingSearchResultItem;
  };
  secondary: EmbeddingSearchResultItem[];
};
