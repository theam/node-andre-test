import axios from "axios";

export interface SearchResult {
  id: string;
  score: number;
  content: string;
  metadata: {
    siteUrl: string;
    title: string;
    answer: string;
    metaTitle?: string;
    metaDescription?: string;
  };
}

export interface SimilarContentResult {
  embeddings: SearchResult[];
}

export interface ExtractAnswerResult {
  extract: string;
  content: string;
  embeddings: SearchResult[];
}

const API_URL = import.meta.env.VITE_API_URL;

export class SearchService {
  static async getSimilarContent(
    query: string,
    authToken: string,
  ): Promise<SimilarContentResult> {
    const response = await axios.get(`${API_URL}/search`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      params: { query },
    });

    if (!response.data) {
      return {
        embeddings: [],
      };
    }

    return {
      embeddings: response.data.entries,
    };
  }

  static async getExtractAnswer(
    query: string,
    authToken: string,
  ): Promise<ExtractAnswerResult> {
    const response = await axios.get(`${API_URL}/extract`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      params: { query },
    });

    if (
      SearchService.isExtractResponseEmpty(response.data) ||
      response.data.error
    ) {
      throw new Error(response.data.error || "No data returned");
    }

    return {
      extract: response.data.extract,
      content: response.data.content,
      embeddings: response.data.embeddings.entries,
    };
  }

  private static isExtractResponseEmpty(data: {
    extract?: string;
    content?: string;
    embeddings?: { entries: SearchResult[] };
  }) {
    if (
      !data.extract?.length ||
      !data.content?.length ||
      !data.embeddings?.entries?.length
    ) {
      return true;
    }

    return false;
  }
}
