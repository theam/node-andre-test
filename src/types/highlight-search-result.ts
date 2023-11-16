export type HighlightSearchResultItem = {
  title: string;
  description?: string;
  url: string;
};

export type HighlightsSearchResult = {
  main: {
    extract: string;
    content: string;
    item: HighlightSearchResultItem;
  };
  secondary: HighlightSearchResultItem[];
};
