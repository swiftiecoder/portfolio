# Teaching an AI to Be a Doctor: My Journey Building a Medical Chatbot Dataset and Training a Model

Hey everyone! I recently got to dive into a really cool project called Khpaltabib. The main idea is awesome: use AI to provide accessible healthcare advice, especially for people who might not have easy access to doctors or clinics, and do it in their own language, like Pashto.

My piece of this project was pretty hands-on. I got to figure out how to get the right kind of data to train an AI to act like a helpful medical professional, and then actually train one of the latest AI models to do just that! It was a crash course in mixing data work with cutting-edge AI, and I learned a ton.

Here's a breakdown of how I tackled it and what skills I picked up along the way.

## Step 1: Becoming a Data Detective on Reddit (Getting the Right Questions and Answers)

To teach an AI how to answer medical questions like a doctor, I needed examples of people asking health questions and verified medical professionals answering them. Where could I find real, conversational health questions and trusted answers?

I landed on the **r/AskDocs subreddit**. It was perfect because it's moderated, and importantly, the medical responses are often verified by the moderators. Plus, people there ask questions just like they would in a chat, which was ideal for training a chatbot. Reddit also has an API, which meant I could write code to automatically collect the data I needed.

*   **Getting My Hands Dirty with Code:** I used a Python library called **PRAW** (the Reddit API wrapper). Chat-GPT gave me a starting point, but I quickly realized I had to dig into the PRAW documentation myself to make it work for my specific needs.
*   **Filtering for Gold:** I wasn't just grabbing *anything*. I focused on posts with the most engagement ('Hot' filter) and, crucially, only looked for comments with the 'Physician Responded' flair. This was a key step to ensure I was getting answers from actual medical professionals.
*   **Solving Problems on the Fly:** This part was a great learning experience! I hit snags:
    *   The top comment wasn't always the doctor – sometimes it was the auto-moderator bot. I figured out how to skip those.
    *   Not all comments had flairs, or the flairs weren't exactly 'Physician'. I learned to check for the `author_flair_text` attribute and use substring checks (like checking if the flair *contained* "Physician" or "Nurse") to make sure I didn't miss relevant, slightly different flairs like 'Physician | Neuroscience'.
    *   Some comments were too short to be useful. I added a filter for minimum length.
    *   I even optimized by prioritizing comments with the highest `score` (upvotes), assuming those were the most helpful.

This whole data collection phase really taught me about **API interaction**, **data filtering**, **handling errors/exceptions** in code, and importantly, **problem-solving** to refine the data collection logic based on real-world data quirks.

## Step 2: Cleaning Up the Text Mess (Making Data AI-Friendly)

Raw text from the internet can be messy. Posts had edits, links, strange formatting, and other inconsistencies that would confuse an AI. Before I could use this data to train the model, I had to clean it up.

*   **Using the Right Tools:** I used Python libraries like **regex** and **clean_text**.
*   **Specific Cleaning Tasks:** I wrote functions to:
    *   Remove everything after "Edit" in posts (people often added unrelated notes there).
    *   Get rid of image links and other bracketed text that wasn't part of the core message.
    *   Fix formatting issues like extra periods from post titles and unwanted line breaks or emojis.
    *   The `clean_text` library automatically handled issues like messed-up Unicode and extra spaces.

Cleaning data taught me about **text preprocessing**, using **regular expressions (regex)** to find and manipulate text patterns, and leveraging existing **text cleaning libraries** to handle common issues efficiently.

## Step 3: Teaching the AI to Answer (Finetuning Gemma)

With a clean dataset of medical questions and verified answers ready, it was time to teach an AI model to be our chatbot. I chose to work with **Gemma**, one of Google's open-source LLMs, specifically the 7 billion parameter version.

*   **Working Smart with Limited Resources:** Training huge LLMs needs serious computing power. Since I was working in a resource-constrained setting (like a free Google Colab GPU!), I used a fantastic tool called **Unsloth**. Unsloth is designed to make training LLMs much faster and use way less memory, which was essential.
*   **The Magic of LoRA:** Unsloth uses a technique called **LoRA (Low-Rank Adaptation)**. This was a key skill I learned. Instead of retraining the entire 7-billion-parameter model (which would take ages and a super powerful GPU), LoRA lets you train only a tiny fraction of the parameters (like 1-10%). It's like teaching the model a new "skill" (medical responses) without changing its entire "brain." This made training feasible on the available hardware.
*   **Formatting the Data:** I had to format my scraped data into a specific structure the training tools expected, known as the **Alpaca prompt format**. This involved structuring each example as an "Instruction" (act like a doctor), the "Input" (the patient's question), and the "Response" (the doctor's answer from Reddit). I also learned the importance of adding a special "End-Of-Sentence" token so the AI knows when to stop generating text.
*   **The Training Loop:** Using libraries like `trl` and `transformers`, I set up the training process. It was cool to see how LoRA reduced the number of parameters I actually had to train from billions down to about 50 million! (Thanks, Unsloth!). I monitored the training loss to see the model learning.

This part taught me about **LLM finetuning**, using **specialized AI training libraries**, understanding and applying **parameter-efficient finetuning techniques like LoRA**, and **preparing data** in the correct format for AI training.

## Step 4: Trying the AI Out (Inference)

After training, I could ask the finetuned Gemma model questions to see how it responded.

```python
# Example of asking the finetuned model a question
# (Simplified from notebook code)
prompt = """Below is an instruction that describes a task, paired with an input that provides further context. Write a response that appropriately completes the request.

### Instruction:
If you are a doctor, please answer the medical questions based on the patient's description

### Input:
I have got a high fever along with coughing and vomiting. I was sick 2 months ago as well. I have been taking medicines for two days and still feel sick. What do I do?

### Response:
""" # Leave Response blank for generation!

# Code to tokenize input and generate response...
```

When I ran this, the model generated responses like:

```
<bos>Below is an instruction that describes a task, paired with an input that provides further context. Write a response that appropriately completes the request.

### Instruction:
If you are a doctor, please answer the medical questions based on the patient's description

### Input:
I have got a high fever along with coughing and vomiting. I was sick 2 months ago as well. I have been taking medicines for two days and still feel sick. What do I do?

### Response:
Hi, I understand your concern. As per your description, it seems that you are suffering from acute viral fever. The symptoms that you are experiencing are common in viral fever. The fever will subside on its own. But you need to take care of your diet and fluid intake. Drink plenty of fluids to avoid dehydration. Take plenty of fruits and vegetables. Avoid spicy and oily foods. Take care.<eos>
```
It was pretty amazing to see the AI respond in a helpful, doctor-like tone!

*   **What I learned:** How to load a finetuned model and perform **AI inference** to generate text responses.

## Step 5: Saving My Progress (Exporting the Model)

Since I used LoRA, I didn't need to save the *entire* huge Gemma model. I only needed to save the small LoRA adapter file, which contains the specific changes I made during training. This file is much smaller and can be combined with the original Gemma model later.

*   **What I learned:** How to save **LoRA adapters** and why this is useful for sharing and deploying models trained with parameter-efficient techniques. I also learned about different model formats like **.gguf** for running models on different hardware.

## Putting It All Together

This task was a fantastic way to learn the full pipeline of creating a specialized AI chatbot: from finding and preparing the right data to using advanced (but accessible!) techniques like LoRA and Unsloth to train a powerful language model.

It felt great contributing to the Khpaltabib project's goal of making healthcare more accessible in local languages. Getting hands-on with data scraping, text cleaning, prompt formatting, and LoRA finetuning gave me a solid foundation in building real-world AI applications. It's exciting to see how these skills can be used to create tools that can genuinely help people!