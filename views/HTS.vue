<template>
  <div class="ao3-work">
    <!-- AO3 Meta Tags Box -->
    <div class="ao3-meta-box">
      <dl class="ao3-tags">
        <dt>Rating:</dt>
        <dd><span class="rating-badge tag-pg">Peer-Reviewed Journal Article</span></dd>

        <dt>Archive Warning:</dt>
        <dd><strong><span class="warning-tag">Multimodal Emotional Dissonance Detected Across 7 Decades</span></strong></dd>

        <dt>Venue:</dt>
        <dd>
          <a class="ao3-tag-link" href="https://doi.org/10.16995/dscn.23539" target="_blank" rel="noopener">
            Digital Studies / Le champ numérique, 16(1) (Open Library of Humanities)
          </a>
        </dd>

        <dt>Tech:</dt>
        <dd>
          <a class="ao3-tag-link">Python</a>,
          <a class="ao3-tag-link">DistilBERT</a>,
          <a class="ao3-tag-link">TF-IDF</a>,
          <a class="ao3-tag-link">Dask</a>
        </dd>

        <dt>Integrations &amp; Libraries:</dt>
        <dd>
          <a class="ao3-tag-link">NLTK &amp; VADER</a>,
          <a class="ao3-tag-link">Spotify Web API</a>,
          <a class="ao3-tag-link">Genius Lyrics API</a>,
          <a class="ao3-tag-link">Pandas &amp; Matplotlib</a>
        </dd>

        <dt>Additional Tags:</dt>
        <dd>
          <a class="ao3-tag-link">Computational Musicology</a>,
          <a class="ao3-tag-link">Cultural Memory</a>,
          <a class="ao3-tag-link">Affective Inversion</a>,
          <a class="ao3-tag-link">Grammy Nominees (1960–2025)</a>,
          <a class="ao3-tag-link">Over-analyzing pop music</a>
        </dd>

        <dt>Stats:</dt>
        <dd class="ao3-stats">
          Published: <span>2026-03</span>
          Corpus: <span>N = 353 Songs</span>
          Span: <span>65 Years (1960–2025)</span>
          DOI: <span>10.16995/dscn.23539</span>
        </dd>
      </dl>
    </div>

    <!-- Summary / Notes -->
    <div class="userstuff module">
      <h3 class="landmark heading" id="work">Summary:</h3>
      <blockquote class="userstuff">
        <p>Songs are more than catchy tunes—they are empirical records of cultural memory. Published in <em>Digital Studies / Le champ numérique</em> (Vol. 16(1), March 2026), this study models <strong>353 Grammy "Song of the Year" nominees across 65 years (1960–2025)</strong> using fine-tuned DistilBERT, TF-IDF, and Spotify acoustic features to trace a macro-level affective inversion between sound and lyrics.</p>
      </blockquote>

      <h3 class="landmark heading">Notes:</h3>
      <blockquote class="userstuff">
        <p>(See the End Notes for the peer-reviewed journal article DOI, dataset playlist, and source repository.)</p>
      </blockquote>
    </div>

    <hr class="ao3-divider" />

    <!-- Chapter Content -->
    <div class="userstuff chapter-content" id="chapter-1">
      <h3 class="chapter-title">Chapter 1: Distributed Scraping &amp; 65 Years of Corpus Assembly</h3>

      <p>To trace 65 years of emotional culture in Western songwriting, I engineered a distributed Python pipeline using <strong>BeautifulSoup and Dask</strong> to compile a curated corpus of <strong>353 Grammy "Song of the Year" nominees (1960–2025)</strong>, uniting historical Wikipedia metadata with Genius lyrics and Spotify acoustic telemetry.</p>
      <p>Resolving decades of shifting artist credits, live annotations, and API edge cases required custom normalization pipelines and manual verification—yielding a multi-decade dataset matching textual verse with audio features like danceability, musical valence, energy, and tempo.</p>

      <h3 class="chapter-title">Chapter 2: DistilBERT, TF-IDF &amp; Acoustic Telemetry</h3>

      <p>With the corpus standardized, I applied <strong>fine-tuned DistilBERT</strong>, <strong>VADER/NLTK sentiment scoring</strong>, and <strong>TF-IDF thematic modeling</strong> to measure longitudinal emotional shifts, lexical richness, and recurring cultural motifs across seven decades.</p>

      <p>Cross-referencing NLP predictions against Spotify's musical attributes uncovered a striking structural divergence between how modern pop songs sound and what their lyrics actually articulate.</p>

      <h3 class="chapter-title">Chapter 3: Affective Inversion &amp; Multimodal Dissonance</h3>

      <p><strong>Macro-Level Affective Inversion:</strong> Quantified sentiment trajectories reveal that 1980s nominees skewed notably optimistic and aspirational, whereas songs from the 2010s and 2020s shifted sharply toward vulnerability, irony, and cynicism.</p>

      <p><strong>Multimodal Dissonance:</strong> Even as chart tracks grew steadily higher in sonic danceability and tempo, musical and lyrical emotional polarity drifted apart—demonstrating a statistically significant multimodal dissonance supported by close-reading case studies.</p>
    </div>

    <!-- Final Notes -->
    <div class="userstuff module end-notes">
      <h3 class="landmark heading" id="work">End Notes:</h3>
      <blockquote class="userstuff">
        <p>If you liked this analysis, you can:</p>
        <p>› <a class="ao3-external-link" href="https://doi.org/10.16995/dscn.23539"
            target="_blank" rel="noopener">Read the Paper (!!!)</a></p>
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
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
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
