<template>
  <div class="px-4 md:px-16 lg:px-32 pt-8 pb-8">
    <h2 class="font-bold text-2xl py-5">Hook, Time and Singer: Grammy Song Analysis</h2>
    <h4 class="text-gray-600 font-medium text-xs" style="padding-bottom: 10px">
      Data Science • NLP • Python • Music Analytics
    </h4>
    <div class="flex flex-wrap mt-5 gap-2 items-center">
      <img class="w-auto h-5 rounded-none text-xs" alt="Python" src="https://img.shields.io/badge/-Python-3776AB?logo=python&logoColor=white" />
      <img class="w-auto h-5 rounded-none text-xs" alt="Pandas" src="https://img.shields.io/badge/-Pandas-150458?logo=pandas&logoColor=white" />
      <img class="w-auto h-5 rounded-none text-xs" alt="Matplotlib" src="https://img.shields.io/badge/-Matplotlib-000000?logo=matplotlib&logoColor=white" />
      <img class="w-auto h-5 rounded-none text-xs" alt="NLTK" src="https://img.shields.io/badge/-NLTK-3E4D30?logo=nltk&logoColor=white" />
      <img class="w-auto h-5 rounded-none text-xs" alt="Spotify API" src="https://img.shields.io/badge/-Spotify-1DB954?logo=spotify&logoColor=white" />
    </div>
    <div class="pt-7">
      <h3 class="underline font-bold text-md pb-1">About the Project</h3>
      <p class="font-thin text-sm pb-2.5">
        Songs are more than just catchy tunes—they're cultural time capsules. In this project, I analyzed Grammy "Song of the Year" nominees from the 1960s to the 2020s to uncover how lyrics reflect shifts in language, emotion, and society.
      </p>
    </div>
    <div class="pt-7">
      <h3 class="underline font-bold text-md pb-1">How I Did It</h3>
      <ul class="list-disc pl-5 font-thin text-sm pb-2.5 ml-4">
        <li class="mb-1"><b>Data Collection:</b> I scraped a comprehensive list of Grammy "Song of the Year" nominees from the 1960s to the 2020s using Python, BeautifulSoup, and regex. This involved pulling song metadata from Wikipedia, then using the Genius and Spotify APIs to fetch lyrics and musical features. I had to handle inconsistencies in song titles, artist names, and missing data, which required custom cleaning scripts and manual verification for accuracy.</li>
        <li class="mb-1"><b>Data Cleaning & Preparation:</b> I wrote scripts to clean and standardize the lyrics, removing annotations, special characters, and formatting quirks. I also normalized the data structure for analysis, ensuring each song entry included decade, artist, title, lyrics, and Spotify features like danceability and valence.</li>
        <li class="mb-1"><b>Sentiment & Linguistic Analysis:</b> Using Python libraries (NLTK, TextBlob), I computed sentiment scores for each song and analyzed linguistic features such as lexical diversity, grammatical errors, and the frequency of repeated phrases (hooks). I also explored how often key themes (like "time" and "fame") appeared and how their context changed over time.</li>
        <li class="mb-1"><b>Musical Feature Analysis:</b> I leveraged Spotify's API to extract musical attributes (danceability, valence, energy) and compared these to the lyrical sentiment, revealing interesting mismatches between how songs sound and what their lyrics express.</li>
        <li class="mb-1"><b>Visualization & Interpretation:</b> I visualized trends across decades using matplotlib and seaborn, plotting sentiment, hook frequency, and other features. This helped uncover patterns like the rise of negative sentiment and the increasing importance of hooks in modern pop music.</li>
        <li class="mb-1"><b>Contextual Research:</b> To interpret the results, I reviewed academic literature on pop music trends and cultural shifts, connecting my findings to broader research on the "saddening" of pop and the evolution of songwriting in the streaming era.</li>
      </ul>
    </div>
    <div class="pt-7">
      <h3 class="underline font-bold text-md pb-1">Key Insights</h3>
      <ul class="list-disc pl-5 font-thin text-sm pb-2.5 ml-4">
        <li class="mb-1"><b>80s optimism vs. 2010s/2020s cynicism:</b> Sentiment analysis revealed that 1980s Grammy-nominated songs were notably positive and upbeat, reflecting a sense of hope and aspiration. In contrast, songs from the 2010s and 2020s show a marked shift toward negativity and cynicism, echoing broader cultural anxieties and a more introspective, sometimes disillusioned, worldview.</li>
        <li class="mb-1"><b>Changing themes of time and fame:</b> While concepts like love and time are ever-present, their portrayal has evolved. In the 80s, time was often comforting and cyclical, but in recent years, it is depicted as fleeting, painful, or even confining. Similarly, fame has shifted from being glamorous and aspirational to being viewed with skepticism and regret.</li>
        <li class="mb-1"><b>Rise of the hook and relaxed grammar:</b> The frequency of repeated phrases (hooks) in songs has increased, especially in the streaming era, likely influenced by algorithmic playlisting and the need for catchiness. There is also a clear trend toward more grammatical errors in lyrics, suggesting that emotional impact and memorability are prioritized over technical correctness.</li>
        <li class="mb-1"><b>Music vs. lyrics—emotional dissonance:</b> Spotify's musical features show that while tracks have become more danceable, their "valence" (musical positivity) is often lower than the sentiment of the lyrics. This means that even if a song sounds happy and energetic, its words may tell a more somber or complex story, highlighting a growing emotional dissonance in popular music.</li>
      </ul>
    </div>
    <div class="pt-7">
      <h3 class="underline font-bold text-md pb-1">Listen & Explore</h3>
      <a style="color:rgb(174, 48, 19); display: block;" href="https://open.spotify.com/playlist/6XSZOXB8nZoWtTsaNBsg0t" class="font-thin text-sm pb-2.5" target="_blank" rel="noopener">Listen to the playlist</a>
      <a style="color:rgb(174, 48, 19); display: block;" href="https://github.com/swiftiecoder/Digital-Humanities-Project" class="font-thin text-sm pb-2.5" target="_blank" rel="noopener">View the code on GitHub</a>
    </div>
  </div>
</template>

<style scoped>
.flex {
  display: flex;
}
.flex-wrap {
  flex-wrap: wrap;
}
.gap-2 {
  gap: 0.5rem;
}
.items-center {
  align-items: center;
}
.mt-5 {
  margin-top: 1.25rem;
}
.pt-7 {
  padding-top: 1.75rem;
}
.font-bold {
  font-weight: bold;
}
.text-2xl {
  font-size: 1.5rem;
}
.py-5 {
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
}
.text-gray-600 {
  color: #4b5563;
}
.font-medium {
  font-weight: 500;
}
.text-xs {
  font-size: 0.75rem;
}
.underline {
  text-decoration: underline;
}
.text-md {
  font-size: 1rem;
}
.pb-1 {
  padding-bottom: 0.25rem;
}
.font-thin {
  font-weight: 300;
}
.text-sm {
  font-size: 0.875rem;
}
.pb-2.5 {
  padding-bottom: 0.625rem;
}
.list-disc {
  list-style-type: disc;
}
.pl-5 {
  padding-left: 1.25rem;
}
.ml-4 {
  margin-left: 1rem;
}
ul {
  list-style-type: "* ";
  padding-left: 0.5rem !important;
}
ul li {
  display: list-item !important;
  list-style-type: "* ";
}
</style>
