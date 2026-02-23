<template>
  <div class="ao3-work">
    <!-- AO3 Meta Tags Box -->
    <div class="ao3-meta-box">
      <dl class="ao3-tags">
        <dt>Rating:</dt>
        <dd><span class="rating-badge tag-pg">Production Ready</span></dd>

        <dt>Archive Warning:</dt>
        <dd><strong><span class="warning-tag">Choose Not To Use Regular Expressions Properly</span></strong></dd>

        <dt>Tech:</dt>
        <dd>
          <a class="ao3-tag-link">Python</a>,
          <a class="ao3-tag-link">Data Science</a>,
          <a class="ao3-tag-link">Music Analytics</a>
        </dd>

        <dt>Integrations:</dt>
        <dd>
          <a class="ao3-tag-link">Python & Natural Language Toolkit (NLTK)</a>,
          <a class="ao3-tag-link">Spotify API / Billboard Charts</a>
        </dd>

        <dt>Libraries:</dt>
        <dd>
          <a class="ao3-tag-link">Pandas</a>,
          <a class="ao3-tag-link">Matplotlib</a>,
          <a class="ao3-tag-link">BeautifulSoup</a>
        </dd>

        <dt>Additional Tags:</dt>
        <dd>
          <a class="ao3-tag-link">Sentiment Analysis</a>,
          <a class="ao3-tag-link">Web Scraping</a>,
          <a class="ao3-tag-link">Historical Analysis</a>,
          <a class="ao3-tag-link">Over-analyzing pop music</a>,
          <a class="ao3-tag-link">Angst (but it's just the 2010s charts)</a>,
          <a class="ao3-tag-link">Data Cleaning Hell</a>
        </dd>

        <dt>Language:</dt>
        <dd>Python 3</dd>

        <dt>Stats:</dt>
        <dd class="ao3-stats">
          Published: <span>2023-05-12</span>
          Words: <span>1,200</span>
          Commits: <span>42</span>
          Hits: <span>903</span>
        </dd>
      </dl>
    </div>

    <!-- Summary / Notes -->
    <div class="userstuff module">
      <h3 class="landmark heading" id="work">Summary:</h3>
      <blockquote class="userstuff">
        <p>Songs are more than just catchy tunes—they're cultural time capsules. In this project, I analyzed Grammy
          "Song of the Year" nominees from the 1960s to the 2020s to uncover how lyrics reflect shifts in language,
          emotion, and society.</p>
      </blockquote>

      <h3 class="landmark heading" id="work">Notes:</h3>
      <blockquote class="userstuff">
        <p>(See the end of the work for links to the repository and playlist.)</p>
      </blockquote>
    </div>

    <hr class="ao3-divider" />

    <!-- Chapter Content -->
    <div class="userstuff chapter-content" id="chapter-1">
      <h3 class="chapter-title">Chapter 1: The Architecture & Methodology</h3>

      <p>I scraped a comprehensive list of Grammy "Song of the Year" nominees from the 1960s to the 2020s using Python,
        BeautifulSoup, and regex. This involved pulling song metadata from Wikipedia, then using the Genius and Spotify
        APIs to fetch lyrics and musical features. I had to handle inconsistencies in song titles, artist names, and
        missing data, which required custom cleaning scripts and manual verification for accuracy.</p>

      <p>I wrote scripts to clean and standardize the lyrics, removing annotations, special characters, and formatting
        quirks. I also normalized the data structure for analysis, ensuring each song entry included decade, artist,
        title, lyrics, and Spotify features like danceability and valence.</p>

      <h3 class="chapter-title">Chapter 2: Sentiment & Linguistic Analysis</h3>

      <p>Using Python libraries (NLTK, TextBlob), I computed sentiment scores for each song and analyzed linguistic
        features such as lexical diversity, grammatical errors, and the frequency of repeated phrases (hooks). I also
        explored how often key themes (like "time" and "fame") appeared and how their context changed over time.</p>

      <p>I leveraged Spotify's API to extract musical attributes (danceability, valence, energy) and compared these to
        the lyrical sentiment, revealing interesting mismatches between how songs sound and what their lyrics express.
      </p>

      <h3 class="chapter-title">Chapter 3: The Findings</h3>

      <p><strong>80s optimism vs. 2010s/2020s cynicism:</strong> Sentiment analysis revealed that 1980s Grammy-nominated
        songs were notably positive and upbeat, reflecting a sense of hope and aspiration. In contrast, songs from the
        2010s and 2020s show a marked shift toward negativity and cynicism, echoing broader cultural anxieties and a
        more introspective, sometimes disillusioned, worldview.</p>

      <p><strong>Music vs. lyrics—emotional dissonance:</strong> Spotify's musical features show that while tracks have
        become more danceable, their "valence" (musical positivity) is often lower than the sentiment of the lyrics.
        This means that even if a song sounds happy and energetic, its words may tell a more somber or complex story,
        highlighting a growing emotional dissonance in popular music.</p>
    </div>

    <!-- Final Notes -->
    <div class="userstuff module end-notes">
      <h3 class="landmark heading" id="work">End Notes:</h3>
      <blockquote class="userstuff">
        <p>If you liked this analysis, you can:</p>
        <p>› <a class="ao3-external-link" href="https://open.spotify.com/playlist/6XSZOXB8nZoWtTsaNBsg0t"
            target="_blank" rel="noopener">Listen to the dataset (Spotify Playlist)</a></p>
        <p>› <a class="ao3-external-link" href="https://github.com/swiftiecoder/Digital-Humanities-Project"
            target="_blank" rel="noopener">Read the Source Code (GitHub)</a></p>
      </blockquote>
    </div>

  </div>
</template>

<style scoped>
/* Core AO3 CSS Reset for this component */
.ao3-work {
  font-family: 'Lucida Grande', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: #2a2a2a;
  line-height: 1.6;
}

.ao3-meta-box {
  background: #f5f5f5;
  border: 1px solid #dddddd;
  padding: 1rem;
  margin-bottom: 2rem;
  border-radius: 2px;
}

.ao3-tags {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 0.5rem 1rem;
  margin: 0;
  font-size: 0.95rem;
}

.ao3-tags dt {
  text-align: right;
  font-weight: bold;
  color: #111;
}

.ao3-tags dd {
  margin: 0;
  padding-bottom: 0.5rem;
}

.ao3-tags dl {
  margin: 0;
}

.tag-pg {
  background-color: #f1c40f;
  color: #fff;
  padding: 2px 6px;
  border-radius: 3px;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.8rem;
}

.warning-tag {
  color: #990000;
}

.ao3-tag-link {
  color: #0000cc;
  text-decoration: none;
  cursor: url('/mouse2.cur'), pointer;
}

.ao3-tag-link:hover {
  text-decoration: underline;
  color: #990000;
}

.ao3-stats {
  color: #555;
}

.ao3-stats span {
  color: #111;
  font-weight: bold;
  margin-right: 15px;
}

.module {
  border-top: 1px solid #ddd;
  padding-top: 1rem;
  margin-top: 1rem;
}

.heading {
  font-family: 'Georgia', serif;
  color: #990000;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.userstuff {
  margin-bottom: 1.5rem;
}

.userstuff p {
  margin-bottom: 1rem;
}

blockquote.userstuff {
  border-left: 2px solid #990000;
  padding-left: 1rem;
  margin: 0 0 1.5rem 1rem;
  color: #333;
}

.ao3-divider {
  border: 0;
  height: 1px;
  background: #ccc;
  margin: 2rem 0;
}

.chapter-title {
  font-family: 'Georgia', serif;
  text-align: center;
  color: #111;
  margin: 2.5rem 0 1.5rem;
  font-size: 1.4rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
}

.ao3-external-link {
  color: #990000;
  font-weight: bold;
  text-decoration: underline;
  cursor: url('/mouse2.cur'), pointer;
}

.ao3-external-link:hover {
  color: #cc0000;
}

/* Make it responsive */
@media (max-width: 600px) {
  .ao3-tags {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .ao3-tags dt {
    text-align: left;
    margin-top: 0.5rem;
  }
}
</style>
