export interface Content {
  id: string
  title: string
  image: string
  genre: string
  platform: string
  releaseDate: string
  language: string
}

export interface Movie {
  id: string
  title: string
  image: string
  genre: string
  imdbRating: number
  language: string
  releaseDate: string
  platform: string
}

export interface BlogPost {
  id: string
  title: string
  tag: string
  date: string
  content: string
  author: string
  image: string
}

export interface TVShow {
  id: string
  title: string
  image: string
  genre: string
  rating: number
  language: string
  releaseDate: string
  seasons: number
  platform: string
}

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

export interface Provider {
  providerName: string
  providerKey: number
  shows: Show[]
}

const generateMockData = (platform: string, count: number): Content[] => {
  const genres = ["Action", "Drama", "Comedy", "Thriller", "Sci-Fi", "Romance", "Horror", "Documentary"]
  const languages = ["English", "Spanish", "French", "German", "Japanese", "Korean", "Chinese", "Hindi"]
  return Array.from({ length: count }, (_, i) => ({
    id: `${platform}-${i + 1}`,
    title: `${platform} Show ${i + 1}`,
    image: `https://picsum.photos/seed/${platform}${i}/300/450`,
    genre: genres[Math.floor(Math.random() * genres.length)],
    platform: platform,
    releaseDate: new Date(Date.now() + Math.random() * 10000000000).toISOString().split("T")[0],
    language: languages[Math.floor(Math.random() * languages.length)],
  }))
}

export const mockMovies: Provider[] = [
  {
    providerName: "Netflix",
    providerKey: 8,
    shows: [
      {
        id: 1001,
        title: "The Last Frontier",
        releaseDate: "2025-02-01",
        genreIds: [28, 12],
        overview:
          "An epic western that reimagines the genre for the modern era. With breathtaking landscapes and complex characters, this film is a testament to the enduring appeal of the American frontier.",
        posterUrl: "https://picsum.photos/seed/lastfrontier/300/450",
        originalLanguage: "en",
        originalCountry: ["US"],
        showType: "movie",
        watchProviders: [8],
      },
      {
        id: 1002,
        title: "Neon Nights",
        releaseDate: "2025-02-15",
        genreIds: [80, 53],
        overview:
          "A neon-soaked neo-noir that takes place in a futuristic Tokyo. The blend of traditional detective storytelling with cyberpunk elements creates a unique and unforgettable viewing experience.",
        posterUrl: "https://picsum.photos/seed/neonnights/300/450",
        originalLanguage: "ja",
        originalCountry: ["JP"],
        showType: "movie",
        watchProviders: [8],
      },
    ],
  },
  {
    providerName: "Amazon Prime Video",
    providerKey: 119,
    shows: [
      {
        id: 1003,
        title: "Echoes of Silence",
        releaseDate: "2025-03-01",
        genreIds: [18, 10402],
        overview:
          "A poignant drama that follows the journey of a deaf musician trying to make it in the cutthroat music industry. The performances are raw and powerful, making this a strong contender for the upcoming award season.",
        posterUrl: "https://picsum.photos/seed/echoesofsilence/300/450",
        originalLanguage: "en",
        originalCountry: ["US"],
        showType: "movie",
        watchProviders: [119],
      },
      {
        id: 1004,
        title: "The Quantum Paradox",
        releaseDate: "2025-03-15",
        genreIds: [878, 53],
        overview:
          "A mind-bending sci-fi thriller that explores the consequences of time travel. Director Christopher Nolan outdoes himself with stunning visuals and a plot that keeps you guessing until the very end.",
        posterUrl: "https://picsum.photos/seed/quantumparadox/300/450",
        originalLanguage: "en",
        originalCountry: ["US", "GB"],
        showType: "movie",
        watchProviders: [119],
      },
    ],
  },
]

export const mockTVShows: Provider[] = [
  {
    providerName: "Netflix",
    providerKey: 8,
    shows: [
      {
        id: 271406,
        title: "The Roshans",
        releaseDate: "2025-01-17",
        genreIds: [99],
        overview:
          "This documentary series chronicles the trials and triumphs of Bollywood's iconic Roshan family — musician Roshan Lal Nagrath, Rajesh, Rakesh and Hrithik.",
        posterUrl: "https://image.tmdb.org/t/p/w500/qfanotr54XJwX1wSdnyo9mlclLt.jpg",
        originalLanguage: "hi",
        originalCountry: ["IN"],
        showType: "tv",
        watchProviders: [8],
      },
      {
        id: 278404,
        title: "Lovers Anonymous",
        releaseDate: "2025-01-16",
        genreIds: [18, 35],
        overview:
          'Cem, scarred by a childhood that crushed his trust in love, runs the "Love Hospital" — until Hazal, a believer in the power of love, disrupts his life.',
        posterUrl: "https://image.tmdb.org/t/p/w500/fpZrwu2PQJMxrXvLx1C3G2hrjqw.jpg",
        originalLanguage: "tr",
        originalCountry: ["TR"],
        showType: "tv",
        watchProviders: [8],
      },
    ],
  },
  {
    providerName: "Amazon Prime Video",
    providerKey: 119,
    shows: [
      {
        id: 279901,
        title: "Molly Mae: Behind It All",
        releaseDate: "2025-01-17",
        genreIds: [99],
        overview:
          "Go beyond the headlines to uncover the real Molly-Mae, following her journey after her highly publicised break-up and adapting to the challenges of motherhood, all while preparing to launch her biggest business venture to date: 'Maebe'.",
        posterUrl: "https://image.tmdb.org/t/p/w500/hh64SI1ZC86yCJE4GhRxQpQfazZ.jpg",
        originalLanguage: "en",
        originalCountry: ["GB"],
        showType: "tv",
        watchProviders: [119],
      },
      {
        id: 261217,
        title: "The LIberation",
        releaseDate: "2025-01-17",
        genreIds: [18],
        overview:
          "Three women join forces to prevent a sexual harassment complaint against a renowned movie director from coming to light. This controversial mission will take them to the doors of a feminist group named La Aldea, which will take them on an inward journey to heal their patriarchal wounds.",
        posterUrl: "https://image.tmdb.org/t/p/w500/tgS5SqTpinL6yN1kS77ayD2l6fE.jpg",
        originalLanguage: "es",
        originalCountry: ["MX"],
        showType: "tv",
        watchProviders: [119],
      },
    ],
  },
  {
    providerName: "Hotstar",
    providerKey: 122,
    shows: [
      {
        id: 239006,
        title: "Unmasked",
        releaseDate: "2025-01-15",
        genreIds: [35, 80, 9648],
        overview:
          "In modern-day Seoul, a crack team of investigative journalists fight for their careers after broadcasting a controversial story. With time running out, the team are given an impossible task if they want to save their jobs – solve a twenty-year-old cold case involving a famous actor who disappeared without a trace.",
        posterUrl: "https://image.tmdb.org/t/p/w500/piSUZXvzOw7GxwrtRuTmimW8YJE.jpg",
        originalLanguage: "ko",
        originalCountry: ["KR"],
        showType: "tv",
        watchProviders: [122],
      },
      {
        id: 281666,
        title: "Goosebumps: The Vanishing",
        releaseDate: "2025-01-10",
        genreIds: [10759, 10765, 35],
        overview:
          "When twins Devin and Cece are sent to spend a summer in Gravesend, Brooklyn with their divorced dad, scientist Anthony Brewer, they must band together with new friends to save the neighborhood from a long-dormant threat.",
        posterUrl: "https://image.tmdb.org/t/p/w500/ajghauMTZ4RKVeISDUzxcMWjXnI.jpg",
        originalLanguage: "en",
        originalCountry: ["US"],
        showType: "tv",
        watchProviders: [122],
      },
    ],
  },
]

export const mockContents: Provider[] = [...mockTVShows, ...mockMovies]

export const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Top 10 Must-Watch Movies of 2023",
    tag: "Recommendation",
    date: "2023-05-15",
    content: `As we approach the midpoint of 2023, the film industry has already blessed us with an array of cinematic masterpieces. From heart-pounding action flicks to thought-provoking dramas, this year's lineup has something for every movie enthusiast. Let's dive into the top 10 must-watch movies that have captivated audiences and critics alike.

1. "The Quantum Paradox"
A mind-bending sci-fi thriller that explores the consequences of time travel. Director Christopher Nolan outdoes himself with stunning visuals and a plot that keeps you guessing until the very end.

2. "Echoes of Silence"
A poignant drama that follows the journey of a deaf musician trying to make it in the cutthroat music industry. The performances are raw and powerful, making this a strong contender for the upcoming award season.

3. "The Last Frontier"
An epic western that reimagines the genre for the modern era. With breathtaking landscapes and complex characters, this film is a testament to the enduring appeal of the American frontier.

4. "Neon Nights"
A neon-soaked neo-noir that takes place in a futuristic Tokyo. The blend of traditional detective storytelling with cyberpunk elements creates a unique and unforgettable viewing experience.

5. "The Forgotten Kingdom"
An animated feature that brings African folklore to life like never before. The stunning artistry and heartwarming story make this a must-watch for audiences of all ages.

6. "Whispers in the Wind"
A haunting horror film that relies more on atmosphere and psychological tension than jump scares. It's a refreshing take on the genre that will leave you unsettled long after the credits roll.

7. "Love in the Time of AI"
A romantic comedy that explores the complexities of human relationships in an age of artificial intelligence. Both hilarious and thought-provoking, it's a timely commentary on our increasingly digital lives.

8. "The Green Revolution"
A powerful documentary that showcases innovative solutions to climate change from around the world. It's an inspiring call to action that offers hope in the face of environmental challenges.

9. "Crossroads"
A gritty crime drama that interweaves multiple storylines à la "Pulp Fiction". The ensemble cast delivers knockout performances in this tightly-scripted thrill ride.

10. "Beyond the Stars"
A space exploration adventure that combines cutting-edge special effects with a deeply human story. It's a reminder of the wonder and terror of the cosmos, and humanity's place within it.

These films represent the best that cinema has to offer in 2023, pushing boundaries and captivating audiences with their storytelling prowess. Whether you're a casual moviegoer or a dedicated cinephile, these top 10 must-watch movies promise to entertain, challenge, and inspire. So grab your popcorn, dim the lights, and prepare to be transported to worlds beyond imagination!`,
    author: "Cinephile Supreme",
    image: "https://picsum.photos/seed/movie1/1200/600",
  },
  {
    id: "2",
    title: "The Rise of AI in Film Recommendation",
    tag: "News",
    date: "2023-05-10",
    content: `In recent years, artificial intelligence has revolutionized numerous industries, and the world of entertainment is no exception. One area where AI has made significant strides is in film recommendations, transforming how we discover and enjoy movies. This article explores the rise of AI in film recommendation systems and its impact on the viewing experience.

The Evolution of Film Recommendations
Before the advent of AI, film recommendations were primarily based on simple algorithms that considered factors like genre preferences and user ratings. While these methods provided some value, they often fell short in capturing the nuances of individual tastes and the complexities of cinematic art.

Enter AI-Powered Recommendations
AI-driven recommendation systems have taken a quantum leap forward by incorporating machine learning algorithms that can analyze vast amounts of data to provide highly personalized suggestions. These systems consider a wide range of factors, including:

1. Viewing History: AI algorithms analyze not just what you've watched, but how you've watched it. Did you binge-watch a series? Did you rewatch certain scenes? This behavioral data helps create a more accurate profile of your preferences.

2. Content Analysis: Advanced AI can break down movies into their constituent elements - themes, pacing, cinematography style, dialogue patterns, and more. This allows for recommendations based on subtle similarities that might not be apparent from genre classifications alone.

3. Collaborative Filtering: By identifying patterns among users with similar tastes, AI can make predictions about what you might enjoy based on what similar viewers have liked.

4. Contextual Awareness: Some AI systems even take into account external factors like time of day, day of the week, or current events to suggest content that might be particularly relevant or appealing at a given moment.

5. Emotional Response: Cutting-edge AI is beginning to incorporate analysis of user reviews and social media reactions to gauge emotional responses to films, allowing for recommendations that align not just with your tastes, but with your desired emotional experience.

The Impact on Viewing Habits
The rise of AI in film recommendations has had several notable effects on how we consume movies:

1. Discovery of Hidden Gems: AI can surface lesser-known films that align closely with a user's tastes, helping viewers discover movies they might never have found otherwise.

2. Broadened Horizons: By identifying underlying patterns in viewing preferences, AI can suggest films from genres or cultures that a viewer might not typically explore, potentially broadening their cinematic horizons.

3. Improved User Experience: As recommendations become more accurate, users spend less time searching and more time enjoying content, leading to increased satisfaction with streaming platforms.

4. Personalized Content Creation: Some studios are beginning to use AI recommendation data to inform decisions about what types of films to produce, potentially leading to more targeted content creation.

Challenges and Considerations
While AI has greatly enhanced film recommendations, it's not without its challenges:

1. Filter Bubbles: There's a risk that highly personalized recommendations could create 'filter bubbles,' where viewers are rarely exposed to content outside their comfort zone.

2. Data Privacy: The effectiveness of AI recommendations relies on collecting and analyzing user data, raising important questions about privacy and data security.

3. Artistic Integrity: Some worry that an over-reliance on AI recommendations could lead to formulaic filmmaking, prioritizing elements that algorithms favor over artistic innovation.

The Future of AI in Film
As AI technology continues to advance, we can expect even more sophisticated recommendation systems. Future developments might include:

1. Mood-Based Recommendations: AI could analyze a user's current mood (perhaps through voice analysis or wearable tech) to suggest the perfect film for their emotional state.

2. Interactive Storytelling: AI might help create personalized viewing experiences, where the plot of a film adapts based on the viewer's preferences or choices.

3. Virtual Film Curators: Advanced AI could take on the role of a knowledgeable film buff, engaging in natural language conversations with users to understand their tastes and suggest films.

Conclusion
The rise of AI in film recommendation has transformed the way we discover and enjoy movies, offering unprecedented levels of personalization and convenience. As this technology continues to evolve, it promises to make our relationship with cinema more engaging, diverse, and tailored to our individual tastes. While challenges remain, the future of AI in film recommendation looks bright, promising to enhance our appreciation and enjoyment of the cinematic arts in ways we're only beginning to imagine.`,
    author: "Tech Cinephile",
    image: "https://picsum.photos/seed/ai1/1200/600",
  },
  {
    id: "3",
    title: "Behind the Scenes: Making of a Blockbuster",
    tag: "Review",
    date: "2023-05-05",
    content: `Have you ever wondered what goes into making a big-budget Hollywood blockbuster? From the initial concept to the final cut, the process of creating a major motion picture is a complex, collaborative effort that involves hundreds, sometimes thousands, of skilled professionals working tirelessly for months or even years. In this article, we'll take you behind the scenes of a typical blockbuster production, revealing the intricate steps and challenges involved in bringing a cinematic spectacle to life.

Pre-Production: Laying the Groundwork

1. Development
Every movie starts with an idea. This could be an original concept, a book adaptation, or a remake of an existing film. Once a studio decides to move forward with a project, they hire a screenwriter to develop the script. This process can take anywhere from a few months to several years, with multiple rewrites and revisions along the way.

2. Financing
Big-budget movies require big money. Studios often partner with production companies or seek outside investors to fund the project. The budget is meticulously planned, covering everything from actor salaries to special effects costs.

3. Casting
Finding the right actors is crucial. Casting directors work closely with the director and producers to audition and select performers who can bring the characters to life. For blockbusters, securing A-list talent is often a priority, as star power can be a major draw for audiences.

4. Pre-visualization
Modern blockbusters often rely heavily on visual effects. During pre-production, the visual effects team creates rough computer-generated previews of complex scenes. This helps the director plan shots and gives the crew a better idea of what they're working towards.

5. Location Scouting
While some scenes may be shot on studio lots, many blockbusters require exotic or specific locations. Location scouts travel the world to find the perfect settings, considering factors like visual appeal, logistical feasibility, and potential tax incentives.

Production: Lights, Camera, Action!

1. Principal Photography
This is when the actual filming takes place. A typical blockbuster shoot can last anywhere from 3 to 6 months, sometimes longer for especially complex productions. Days on set are long and intense, with cast and crew often working 12-16 hour days.

2. Practical Effects
While CGI has become increasingly prevalent, many blockbusters still rely on practical effects for certain scenes. This could involve building massive sets, creating intricate costumes and makeup, or staging elaborate stunts.

3. Motion Capture
For films heavy on CGI characters, actors often perform in special motion capture suits. This technology allows their movements to be translated into digital characters, creating more realistic and nuanced performances for non-human or fantastical creatures.

4. Second Unit Filming
While the main unit focuses on scenes with the principal actors, a second unit often shoots background plates, establishing shots, and some action sequences. This allows for more efficient use of time and resources.

Post-Production: Putting It All Together

1. Editing
Once filming wraps, the editor begins the monumental task of assembling the footage into a cohesive narrative. This process can take several months and involves close collaboration with the director to shape the final product.

2. Visual Effects
Modern blockbusters can have thousands of VFX shots. Teams of artists work tirelessly to create photo-realistic effects, from explosive action sequences to subtle environment enhancements. This is often the longest and most expensive part of post-production.

3. Sound Design and Music
A dedicated team creates and edits the film's soundscape, from ambient noise to spectacular sound effects. Meanwhile, the composer works on the score, crafting music that enhances the emotional impact of each scene.

4. Color Grading
Color grading is the process of altering and enhancing the colors of a film. This helps establish the movie's visual tone and ensure consistency across different scenes and shooting conditions.

5. Test Screenings
Before the film is finalized, it's often shown to test audiences. Their feedback can lead to additional edits or even reshoots to address any issues or improve audience reception.

Marketing and Distribution

1. Trailer Creation
Creating an effective trailer is an art in itself. Marketing teams work to craft trailers that generate excitement without giving away too much of the plot.

2. Global Marketing Campaign
Blockbusters often have marketing budgets nearly as large as their production budgets. This includes everything from billboards and TV spots to social media campaigns and merchandise.

3. Premiere and Release
Finally, after years of work, the film premieres. For major blockbusters, this often involves a star-studded event and a coordinated global release to build maximum buzz.

Conclusion
The making of a blockbuster is a mammoth undertaking, requiring the coordinated efforts of countless talented individuals across various disciplines. From the first spark of an idea to the final screening, every step of the process is crucial in creating the cinematic spectacles that captivate audiences worldwide. The next time you're marveling at a big-screen extravaganza, take a moment to appreciate the years of work and dedication that went into bringing that story to life. The magic of movies is not just in what we see on screen, but in the incredible journey it took to get there.

From the initial spark of an idea to the final cut, and from the first marketing teaser to the global premiere, every blockbuster represents a monumental collaborative effort. It's a testament to human creativity, technological innovation, and the enduring power of storytelling.

As audiences, we play a crucial role in this process too. Our excitement, our ticket purchases, and our word-of-mouth recommendations all contribute to the success of these cinematic ventures. So the next time you settle into your seat at the theater, remember that you're not just watching a movie - you're participating in the culmination of years of passion, creativity, and hard work.

The world of blockbuster filmmaking continues to evolve, with new technologies, storytelling techniques, and distribution methods constantly emerging. As we look to the future, one thing is certain: the art of creating these larger-than-life spectacles will continue to captivate and inspire audiences around the globe, pushing the boundaries of what's possible in cinema.`,
    author: "Hollywood Insider",
    image: "https://picsum.photos/seed/blockbuster1/1200/600",
  },
]

export const featuredPosts = [
  { id: "1", title: "The Evolution of Streaming Platforms", image: "https://picsum.photos/seed/featured1/1200/600" },
  {
    id: "2",
    title: "Top 5 Underrated TV Shows You Must Watch",
    image: "https://picsum.photos/seed/featured2/1200/600",
  },
  { id: "3", title: "How AI is Changing the Film Industry", image: "https://picsum.photos/seed/featured3/1200/600" },
]

