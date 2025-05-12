import 'dotenv/config';
import OpenAI from 'openai';

const apiKey = process.env.VITE_OPENAI_API_KEY;
const assistantId = 'asst_toGTymW2p8eGb6SiED6ouyI5';

const openai = new OpenAI({ apiKey });

async function getAssistantResponse(userMessage) {
  if (!apiKey || !assistantId) {
    throw new Error('Missing VITE_OPENAI_API_KEY or VITE_OPENAI_ASSISTANT_ID');
  }

  console.log('Creating thread...');
  const thread = await openai.beta.threads.create();
  console.log('Thread created:', thread.id);

  console.log('Adding message to thread...');
  await openai.beta.threads.messages.create(thread.id, {
    role: 'user',
    content: userMessage,
  });
  console.log('Message added.');

  console.log('Running assistant...');
  const run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: assistantId,
  });
  console.log('Run started:', run.id);

  // Wait until complete (basic version)
  let status = run.status;
  let runId = run.id;
  while (status !== 'completed' && status !== 'failed' && status !== 'cancelled') {
    console.log('Waiting for run to complete... Current status:', status);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const check = await openai.beta.threads.runs.retrieve(thread.id, runId);
    status = check.status;
  }

  if (status !== 'completed') {
    console.log('Run did not complete. Status:', status);
    return 'Run did not complete.';
  }

  console.log('Run completed. Fetching messages...');
  const messages = await openai.beta.threads.messages.list(thread.id);
  const lastMessage = messages.data.reverse().find(m => m.role === 'assistant');

  if (lastMessage) {
    console.log('Assistant replied:', lastMessage.content?.[0]?.text?.value);
  } else {
    console.log('No response from assistant.');
  }

  return lastMessage?.content?.[0]?.text?.value || 'No response from assistant.';
}

// Example usage:
(async () => {
  const userMessage = 'Hello, who are you?';
  console.log('Sending message to assistant:', userMessage);
  const reply = await getAssistantResponse(userMessage);
  console.log('Assistant reply:', reply);
})();
