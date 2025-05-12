# What Your Spotify Wrapped Says About Society: Unpacking Culture Through Song Lyrics

You know how certain songs just *feel* like a moment in time? Like the instant you hear a classic tune from the 80s, you're transported to a different vibe? Or how the latest chart-topper perfectly captures a feeling you didn't even know how to name?

It's not just you. Songs have this incredible power to bottle up culture, memory, and emotion. They're like tiny time capsules, reflecting the world when they were written. Think about it: the birthday song, national anthems, even that pop earworm you can't get out of your head – they all mark something about us.

But can we actually *see* these shifts if we look at the songs themselves over time? That's the big question I explored in my recent research project. My hunch was that by analyzing song lyrics across decades, we could uncover clues about how our language, feelings, and even our society's mindset have changed.

## Becoming a Music Detective: My Data Journey

To investigate this, I needed a solid collection of songs that represented key cultural moments over the years. Just picking random songs wouldn't cut it. I needed something like a "best of" list that spanned decades.

So, I decided to focus on the **Grammy Awards' "Song of the Year" nominees** from the 1960s all the way up to the 2020s. Why these? Because they're recognized by music industry peers for their artistic merit and songwriting excellence – they're essentially a "literary canon" for popular songs. This gave me a dataset of 353 songs, each a snapshot from its time.

*   **Skill I used:** Data scraping! I wrote Python code using libraries like BeautifulSoup and regex to pull information about these songs from Wikipedia and get their lyrics from Genius and Spotify's API. It was a cool exercise in gathering data from the web and cleaning it up so it was ready for analysis.

## What Did the Data Sing Back?

Once I had my dataset ready, I applied some computational tools to analyze the lyrics quantitatively. I looked at a few key things:

1.  **Sentiment:** Are the lyrics generally positive or negative?
2.  **Linguistic Features:** How complex is the language? Are there grammatical errors? How often are phrases repeated?
3.  **Musical Features (from Spotify):** Things like danceability and "valence" (how musically positive/negative a track feels).

And the results were fascinating!

*   **Sentiment Swings:** When I plotted the sentiment of songs by decade, a clear pattern emerged. The 1980s stood out as remarkably positive. Fast forward to the 2010s and early 2020s, and things look much more negative. This aligns with other research suggesting pop music has gotten "sadder and angrier" recently. It seems the optimistic vibe of the 80s has shifted to something more, well, cynical today.

*   **Time Feels Different:** Themes like "love" and "time" pop up in lyrics across *all* decades, but *how* they're talked about changes. In the 80s, time often felt cyclical and comforting ("Time After Time," "That's What Friends Are For"). It was something reliable. In recent years ("Shallow," "All Too Well"), time feels fleeting, painful, or even like a prison you're stuck in. The idea of "time flying" is replaced with "time won't fly."

*   **Fame Gets a Reality Check:** The shift in sentiment also shows up in themes like fame. Songs in the 80s (like "Fame" or "Fast Car") often portrayed stardom as a glamorous, aspirational goal. By the late 2010s ("everything i wanted"), fame is viewed with regret and cynicism.

*   **The Rise of the Hook (and Fewer Grammar Rules?):** I also looked at the *structure* of the language. I counted how often the most repeated phrase (often the hook!) showed up per song. This peaked in the 80s, but remained important, especially in today's music (think Sabrina Carpenter's "Espresso" and its catchy phrase "that's that me"). This might be linked to how algorithmic playlists favor catchy, memorable hooks. Interestingly, the data also showed an increasing trend in **grammatical errors** in lyrics over the decades. It seems catching ears with a memorable, perhaps technically incorrect phrase is more important than sticking to grammar rules.

*   **Music vs. Lyrics:** Analyzing Spotify's data showed that while danceability has increased recently, the overall "valence" (musical positivity) is lower compared to the lyrical sentiment in Figure 1. This suggests that even if the beat makes you want to dance, the words themselves are telling a different, less positive story.

## The Takeaway: Songs as Cultural Mirrors

My project suggests that we can indeed understand a lot about the changing "zeitgeist" – the mood of the time – by looking closely at song lyrics, both quantitatively and qualitatively. The shift from 80s optimism to more recent pessimism is reflected not just in the overall feeling of the lyrics, but in how core concepts like time and fame are discussed, and even in structural changes like the increasing importance of hooks and a relaxed approach to grammar.

It's a testament to how songwriting evolves in parallel with culture, finding new ways to resonate with listeners. A catchy tune can do more than just get stuck in your head; it carries meaning and memory that reflect the world around us.

This was just scratching the surface, of course. Future work could look at even more songs, different genres, or use more advanced AI tools to dig deeper into thematic shifts. But for now, it's clear: the songs we love aren't just soundtracks to our lives; they're mirrors of the times we live in.

**Curious to hear the songs?** I put together a Spotify playlist with the referenced songs mentioned in the paper [Link to Playlist if available](https://open.spotify.com/playlist/6XSZOXB8nZoWtTsaNBsg0t). Give it a listen and see if you can hear the changes yourself! You can also check out the code behind this analysis.