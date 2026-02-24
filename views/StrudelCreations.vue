<script setup>
import { ref, onMounted } from 'vue'

const creations = ref([])
const loading = ref(true)
const activeCreation = ref(null)

onMounted(async () => {
    try {
        const res = await fetch('/strudel.json')
        if (res.ok) {
            creations.value = await res.json()
        }
    } catch (e) {
        console.error('Error fetching strudel creations:', e)
    } finally {
        loading.value = false
    }
})

const openPreview = (creation) => {
    activeCreation.value = creation
}

const closePreview = () => {
    activeCreation.value = null
}
</script>

<template>
    <div class="ao3-work">
        <!-- AO3 Meta Tags Box -->
        <div class="ao3-meta-box">
            <dl class="ao3-tags">
                <dt>Rating:</dt>
                <dd><span class="rating-badge tag-gen">General Audiences</span></dd>

                <dt>Archive Warning:</dt>
                <dd><strong><span class="warning-tag">No Archive Warnings Apply</span></strong></dd>

                <dt>Tech:</dt>
                <dd>
                    <a class="ao3-tag-link">Strudel</a>,
                    <a class="ao3-tag-link">JavaScript</a>,
                    <a class="ao3-tag-link">Livecoding</a>
                </dd>

                <dt>Fandom:</dt>
                <dd>
                    <a class="ao3-tag-link">Algorave</a>
                </dd>

                <dt>Additional Tags:</dt>
                <dd>
                    <a class="ao3-tag-link">Musical Experiments</a>,
                    <a class="ao3-tag-link">Learning Journey</a>,
                    <a class="ao3-tag-link">Generative Music</a>,
                    <a class="ao3-tag-link">Accountability Post</a>
                </dd>

                <dt>Language:</dt>
                <dd>English</dd>

                <dt>Stats:</dt>
                <dd class="ao3-stats">
                    Published: <span>2024-02-24</span>
                    Words: <span>342</span>
                    Creations: <span>{{ creations.length }}/?</span>
                    Kudos: <span>12</span>
                </dd>
            </dl>
        </div>

        <!-- Summary / Notes -->
        <div class="userstuff module">
            <h3 class="landmark heading">Summary:</h3>
            <blockquote class="userstuff">
                <p>
                    This is where I document my journey of learning livecoding with
                    <a href="https://strudel.cc" target="_blank" class="ao3-external-link">Strudel</a>.
                    I've been dipping in and out of it for a while now, and I'm sharing my creations
                    here mainly to keep myself accountable and to track my progress.
                </p>
            </blockquote>
        </div>

        <hr class="ao3-divider" />

        <!-- Chapters (Creations) -->
        <div v-if="loading" class="text-center italic">Tuning the oscillators...</div>
        <div v-else class="userstuff chapter-content">
            <div v-if="activeCreation" class="iframe-container">
                <div class="iframe-header">
                    <button @click="closePreview" class="back-link">« Back to List</button>
                    <span class="preview-title">Creation #{{ creations.indexOf(activeCreation) + 1 }}</span>
                </div>
                <iframe :src="activeCreation.link" class="strudel-iframe" allow="autoplay"></iframe>
            </div>
            <div v-else>
                <h3 class="chapter-title">Creations</h3>
                <ul class="creations-bullet-list">
                    <li v-for="(creation, index) in creations" :key="creation.id">
                        <a href="#" @click.prevent="openPreview(creation)" class="ao3-external-link">› Listen to
                            Creation #{{ index + 1 }}</a>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Final Notes -->
        <div class="userstuff module end-notes">
            <h3 class="landmark heading">End Notes:</h3>
            <blockquote class="userstuff">
                <p>More patterns coming soon (hopefully). If you're into livecoding, feel free to reach out! God knows I
                    could use the help lol</p>
            </blockquote>
        </div>
    </div>
</template>

<style scoped>
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
    grid-template-columns: 150px 1fr;
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

.tag-gen {
    background-color: #2e7d32;
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
    margin: 2rem 0 0.5rem;
    font-size: 1.3rem;
    border-bottom: 1px solid #eee;
    padding-bottom: 0.2rem;
}

.chapter-meta {
    text-align: center;
    font-size: 0.85rem;
    color: #666;
    margin-bottom: 1.5rem;
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

.creations-bullet-list {
    list-style-type: disc;
    padding-left: 2rem;
    margin-top: 1rem;
}

.creations-bullet-list li {
    margin-bottom: 0.8rem;
}

.tags-row {
    margin: 1rem 0;
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.small-tag {
    font-size: 0.8rem;
    background: #eee;
    padding: 2px 8px;
    border-radius: 10px;
    color: #444;
}

.chapter-divider {
    border: 0;
    border-top: 1px dashed #ccc;
    margin: 2rem auto;
    width: 50%;
}

.text-center {
    text-align: center;
}

.italic {
    font-style: italic;
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

.iframe-container {
    display: flex;
    flex-direction: column;
    height: 500px;
    margin-top: 1rem;
    border: 1px solid #ddd;
    background: #fff;
}

.iframe-header {
    background: #eee;
    padding: 0.5rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
}

.back-link {
    background: none;
    border: none;
    color: #990000;
    font-family: 'Lucida Grande', sans-serif;
    font-size: 0.9rem;
    font-weight: bold;
    cursor: url('/mouse2.cur'), pointer;
    padding: 0;
}

.back-link:hover {
    text-decoration: underline;
}

.preview-title {
    font-size: 0.85rem;
    color: #666;
    font-style: italic;
}

.strudel-iframe {
    flex: 1;
    border: none;
    width: 100%;
}
</style>
