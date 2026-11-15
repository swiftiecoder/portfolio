<template>
  <div class="ao3-work">
    <!-- AO3 Meta Tags Box -->
    <div class="ao3-meta-box">
      <dl class="ao3-tags">
        <dt>Rating:</dt>
        <dd><span class="rating-badge tag-pg">Published Research</span></dd>

        <dt>Archive Warning:</dt>
        <dd><strong><span class="warning-tag">Canon Divergence & Quantified Fan Reinvention Applied</span></strong></dd>

        <dt>Venue:</dt>
        <dd>
          <a class="ao3-tag-link" href="https://doi.org/10.13140/RG.2.2.33712.52481" target="_blank" rel="noopener">
            Fan Studies Network North America (FSNNA '26) — Panel J1
          </a>
        </dd>

        <dt>Authors:</dt>
        <dd>
          <a class="ao3-tag-link">Mohammad Shaharyar Ahsan</a>,
          <a class="ao3-tag-link">Maira Rehman</a>
        </dd>

        <dt>Tech &amp; Methods:</dt>
        <dd>
          <a class="ao3-tag-link">Python</a>,
          <a class="ao3-tag-link">Information Theory (Shannon Entropy)</a>,
          <a class="ao3-tag-link">AO3 Metadata Analytics</a>,
          <a class="ao3-tag-link">Corpus Modeling</a>
        </dd>

        <dt>Additional Tags:</dt>
        <dd>
          <a class="ao3-tag-link">Book-to-Screen Adaptations</a>,
          <a class="ao3-tag-link">Bridgerton</a>,
          <a class="ao3-tag-link">Heated Rivalry</a>,
          <a class="ao3-tag-link">407,449 Fanworks</a>,
          <a class="ao3-tag-link">Screen-Canon Displacement</a>,
          <a class="ao3-tag-link">Digital Humanities</a>
        </dd>

        <dt>Stats:</dt>
        <dd class="ao3-stats">
          Presented: <span>2026-10</span>
          Macro Corpus: <span>407,449 Works</span>
          Micro Corpus: <span>1,316 Works</span>
          Median Growth: <span>115.7×</span>
        </dd>
      </dl>
    </div>

    <!-- Summary / Notes -->
    <div class="userstuff module">
      <h3 class="landmark heading" id="work">Summary:</h3>
      <blockquote class="userstuff">
        <p>Using Archive of Our Own (AO3) itself as our empirical laboratory, we investigate how book-to-screen adaptations reshape participatory literary fandoms at both macro-scale (<strong>407,449 fanworks across 63 adaptations</strong>) and micro-scale (<strong>1,316 works from <em>Heated Rivalry</em> and <em>Bridgerton</em></strong>).</p>
      </blockquote>

      <h3 class="landmark heading">Notes:</h3>
      <blockquote class="userstuff">
        <p>(Meta-narrative note: yes, this paper literally analyzes AO3 inside an AO3-themed portfolio modal.)</p>
      </blockquote>
    </div>

    <hr class="ao3-divider" />

    <!-- Chapter Content -->
    <div class="userstuff chapter-content" id="chapter-1">
      <h3 class="chapter-title">Chapter 1: Macro-Scale Discoverability (407,449 Works)</h3>
      <p>To measure the catalytic effect of screen adaptations beyond anecdotal fandom lore, we built a reproducible corpus-collection and statistical pipeline across <strong>63 book-to-screen adaptations</strong> hosted on Archive of Our Own (AO3), totaling <strong>407,449 fanworks</strong>.</p>
      <p>Comparing pre-screen literary publication windows against post-release adaptation windows revealed an unmistakable surge in creative participation: a <strong>115.7× median post-screen growth</strong> in fanwork output, demonstrating how television and film releases unlock latent discoverability for source texts.</p>

      <h3 class="chapter-title">Chapter 2: Micro-Scale Canon Reinvention (+3.97 Bits)</h3>
      <p>Growth in volume is only half the story. Zooming in on a curated micro-corpus of <strong>1,316 works across <em>Heated Rivalry</em> and <em>Bridgerton</em></strong>, we applied information-theoretic modeling—measuring character, relationship, and thematic tag distributions before and after adaptation.</p>
      <p>Across fandom tag vocabularies, screen adaptations coincided with up to a <strong>+3.97-bit increase in Shannon entropy</strong>, quantifying how fans actively broaden, remix, and reinvent narrative possibilities rather than simply echoing book canon.</p>

      <h3 class="chapter-title">Chapter 3: Inclusive Screen-Canon Displacement</h3>
      <p>Most compellingly, inclusive television casting actively overwrites source-text defaults in collective fan imagination. In the <em>Bridgerton</em> corpus, screen-canon <strong>Kate Sharma displaced book-canon Kate Sheffield by 532 tagged works to 18</strong>, showing how diverse media representations become the new durable center of participatory memory.</p>
    </div>

    <!-- Final Notes -->
    <div class="userstuff module end-notes">
      <h3 class="landmark heading">End Notes:</h3>
      <blockquote class="userstuff">
        <p>Presented at Fan Studies Network North America (FSNNA), October 2026 (Panel J1: Merchandising):</p>
        <p>&rsaquo; <a class="ao3-external-link" href="https://doi.org/10.13140/RG.2.2.33712.52481" target="_blank" rel="noopener">View Conference Poster &amp; Paper DOI (10.13140/RG.2.2.33712.52481)</a></p>
      </blockquote>
    </div>
  </div>
</template>

<style scoped>
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
