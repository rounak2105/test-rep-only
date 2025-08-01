import axios from "axios"

const API_BASE_URL = "https://bingeit-backend.onrender.com"

export interface Show {
  id: string | number
  title: string
  releaseDate: string
  genreIds: number[]
  overview: string
  posterUrl: string
  originalLanguage: string
  originalCountry: string[]
  showType: "tv" | "movie"
  watchProviders: number[]
  trailerLink?: string // Added trailerLink as optional
  backdrop_path?: string
  popularity: number
  homepage?: string
}

export interface Movie {
  id: number
  title: string
  releaseDate: string
  genreIds: number[]
  overview: string
  posterUrl: string
  originalLanguage: string
  originalCountry: string[]
  showType: "movie"
  watchProviders: number[]
  homepage?: string
}

export interface Provider {
  providerName: string
  providerKey: number
  shows: Show[]
}

export interface BlogPost {
  _id: string
  title: string
  description: string
  imageUrl: string
  author: string
  category: string
  body?: string
  blogId: string
  createdDate: string
  updatedDate: string
}

export interface AIMovie {
  backdrop_path: string | null
  genres: string
  id: number
  overview: string
  poster_url: string
  release_year: string
  special_attribruite: string
  title: string
  vote_average: number
}

export interface AIResponse {
  message: string
  data: {
    movies: AIMovie[]
  }
}

export interface Content {
  id: string
  title: string
  image: string
  genre: string
  platform: string
  releaseDate: string
  language: string
  posterUrl?: string
}

export interface Filters {
  genre: string
  country: string
  language: string
}

// Provider key mapping for converting platform names to API keys
export const providerKeyMap = {
  'netflix': 8,
  'amazonprimevideo': 119,
  'hotstar': 122,
  'jiocinema': 220,
  'jiohotstar': 2336,
  'zee5': 232,
  'sonyliv': 237,
  'mxplayer': 515,
  'amazonminitv': 1898,
  'watchmore': 0,
} as const;

export interface ShowsResponse {
  shows: Show[]
  totalCount: number
}

export const fetchShows = async (
  showType?: "tv" | "movie",
  limit = 100,
  filters?: { originalLanguage?: string; genreIds?: number[] },
): Promise<Provider[]> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/show/home`, {
      showType: showType,
      limit: limit,
      ...filters,
    })
    return response.data
  } catch (error) {
    console.error("Error fetching shows:", error)
    return []
  }
}

export const fetchRecommendations = async (query: string): Promise<Movie[]> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/recommend`, { query })
    return response.data
  } catch (error) {
    console.error("Error fetching recommendations:", error)
    return []
  }
}

export const fetchAllBlogs = async (): Promise<BlogPost[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/blog/get-all-blogs`)
    return response.data
  } catch (error) {
    console.error("Error fetching blogs:", error)
    return []
  }
}

export const fetchBlogById = async (blogId: string): Promise<BlogPost> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/blog/${blogId}`)
    return response.data
  } catch (error) {
    console.error("Error fetching blog:", error)
    throw error
  }
}

export const generateAIRecommendations = async (query: string): Promise<AIResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/ai/generate`, { query })
    return response.data
  } catch (error) {
    console.error("Error generating AI recommendations:", error)
    throw error
  }
}

interface FilterParams {
  limit: number;
  offset: number;
  watchProviders: number[];
  genreIds?: number[];
  originalLanguage?: string;
  releaseDate?: string;
}

export async function fetchShowsByProvider(
  provider: string,
  limit: number = 100,
  offset: number = 0,
  filterParams?: FilterParams
): Promise<ShowsResponse> {
  try {
    const providerKey = providerKeyMap[provider as keyof typeof providerKeyMap]
    console.log('Fetching shows for provider:', provider)
    console.log('Provider key:', providerKey)

    const params = filterParams || {
      limit,
      offset,
      watchProviders: [providerKey]
    }

    const response = await axios.post(`${API_BASE_URL}/show/all`, params)
    console.log('API Response:', response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching shows:', error)
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      })
    }
    throw error
  }
}

interface FeedbackData {
  name: string;
  email: string;
  feedbackType: string;
  message: string;
}

export const submitFeedback = async (data: FeedbackData): Promise<any> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/feedback`, data)
    return response.data;
  } catch (error) {
    console.error('Error submitting feedback:', error);
    throw error;
  }
}

