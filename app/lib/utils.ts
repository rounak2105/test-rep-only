import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const languageMap: Record<string, string> = {
  af: "Afrikaans",
  en: "English",
  es: "Spanish",
  fr: "French",
  de: "German",
  it: "Italian",
  pt: "Portuguese",
  ru: "Russian",
  ja: "Japanese",
  ko: "Korean",
  zh: "Chinese",
  hi: "Hindi",
  ar: "Arabic",
  bg: "Bulgarian",
  bn: "Bengali",
  ca: "Catalan",
  ch: "Chamorro",
  cs: "Czech",
  da: "Danish",
  el: "Greek",
  eo: "Esperanto",
  eu: "Basque",
  fa: "Persian",
  fi: "Finnish",
  he: "Hebrew",
  hu: "Hungarian",
  id: "Indonesian",
  ka: "Georgian",
  kn: "Kannada",
  lt: "Lithuanian",
  ml: "Malayalam",
  nb: "Norwegian Bokmål",
  nl: "Dutch",
  no: "Norwegian",
  pl: "Polish",
  ro: "Romanian",
  sk: "Slovak",
  sl: "Slovenian",
  sr: "Serbian",
  sv: "Swedish",
  ta: "Tamil",
  te: "Telugu",
  th: "Thai",
  tr: "Turkish",
  uk: "Ukrainian",
  vi: "Vietnamese",
}

export const genreMap = [
  { ids: [28, 10759], name: "Action & Adventure" },
  { ids: [12], name: "Adventure" },
  { ids: [16], name: "Animation" },
  { ids: [35], name: "Comedy" },
  { ids: [80], name: "Crime" },
  { ids: [99], name: "Documentary" },
  { ids: [18], name: "Drama" },
  { ids: [10751], name: "Family" },
  { ids: [14], name: "Fantasy" },
  { ids: [36], name: "History" },
  { ids: [27], name: "Horror" },
  { ids: [10402], name: "Music" },
  { ids: [9648], name: "Mystery" },
  { ids: [10749], name: "Romance" },
  { ids: [878], name: "Science Fiction" },
  { ids: [10770], name: "TV Movie" },
  { ids: [53], name: "Thriller" },
  { ids: [10752], name: "War" },
  { ids: [37], name: "Western" },
  { ids: [10762], name: "Kids" },
  { ids: [10763], name: "News" },
  { ids: [10764], name: "Reality" },
  { ids: [10765], name: "Sci-Fi & Fantasy" },
  { ids: [10766], name: "Soap" },
  { ids: [10767], name: "Talk" },
  { ids: [10768], name: "War & Politics" },
]

export function getLanguageName(code: string): string {
  return languageMap[code] || code.toUpperCase()
}

export function getLanguageCode(name: string): string {
  return Object.keys(languageMap).find((key) => languageMap[key] === name) || name
}

export function getGenreName(id: number): string {
  const genre = genreMap.find((g) => g.ids.includes(id))
  return genre ? genre.name : "Unknown"
}

export function getGenreIds(name: string): number[] {
  const genre = genreMap.find((g) => g.name === name)
  return genre ? genre.ids : []
}

