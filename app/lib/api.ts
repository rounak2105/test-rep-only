import axios from "axios"
import { getLanguageCode, getGenreIds } from "./utils"

const API_BASE_URL = "https://bingeit-backend.onrender.com"

export interface Show {
  id: number
  title: string
  releaseDate: string
  genreIds: number[]
  overview: string
  posterUrl: string
  originalLanguage: string
  originalCountry: string[]
  showType: "tv" | "movie"
  watchProviders: number[]
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
  id: string
  createdDate: string
  updatedDate: string
}

export interface AIMovie {
  id: number
  title: string
  releaseDate: string
  description: string
  language: string
  showType: string
  ottPlatform: string
  imdbRating: number
}

export interface AIResponse {
  message: string
  data: {
    movies: AIMovie[]
  }
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

export const fetchBlogById = async (id: string): Promise<BlogPost> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/blog/${id}`)
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

const filterByDate = (date: string, filter: string) => {
  const contentDate = new Date(date)
  const now = new Date()
  const daysDifference = Math.ceil((contentDate.getTime() - now.getTime()) / (1000 * 3600 * 24))
  switch (filter) {
    case "upcoming7days":
      return daysDifference > 0 && daysDifference <= 7
    case "upcoming14days":
      return daysDifference > 0 && daysDifference <= 14
    case "upcoming30days":
      return daysDifference > 0 && daysDifference <= 30
    case "past7days":
      return daysDifference >= -7 && daysDifference <= 0
    case "past14days":
      return daysDifference >= -14 && daysDifference <= 0
    case "past30days":
      return daysDifference >= -30 && daysDifference <= 0
    default:
      return true
  }
}

