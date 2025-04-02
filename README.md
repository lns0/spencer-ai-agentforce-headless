# Agentforce Headless Agent + Next.js Demo

This is a Next.js demo app showcasing the integration with Salesforce Agentforce using the Agent API.

## Tech Stack

- **UI Framework**: Next.js
- **Runtime**: Node.js
- **AI Agent**: Salesforce Agentforce (Agent API)
- **Styling**: Tailwind CSS

## Prerequisites

Before getting started, complete the [Get Started](https://developer.salesforce.com/docs/einstein/genai/guide/agent-api-get-started.html) in the Agentforce developer documentation. You will get the following values.

- **AGENT ID**
  - The ID of the agent that you want to interact with.
- **CONSUMER_KEY** / **CONSUMER_SECRET**
  - You can get the consumer key and secret by following the instructions in [Obtain Credentials](https://developer.salesforce.com/docs/einstein/genai/guide/agent-api-get-started.html#obtain-credentials).
- **MY_DOMAIN_URL**
  - From Salesforce Setup, search for My Domain. Copy the value shown in the Current My Domain URL field.

## Getting Started

1.  Clone the repository:

```bash
git clone https://github.com/misu007/agentforce-headless-agent-nextjs-demo.git
```

2.  Navigate to the project directory:

```bash
cd agentforce-headless-agent-nextjs-demo
```

3.  Install the dependencies:

```bash
npm install
```

4.  Create `.env` file in the root of project and set the following values:

```
SF_AGENT_ID=XXXXXXXXX
SF_CONSUMER_KEY=XXXXXXXXXXXXXX
SF_CONSUMER_SECRET=XXXXXXXXXXXXXX
SF_MY_DOMAIN_URL=XXXXXXXXXX
BASIC_AUTH_USERNAME=(Set an optional username which is required to open this app)
BASIC_AUTH_PASSWORD=(Set an optional password which is required to open this app)
```

5.  Start a development server:

```bash
npm run dev
```

6.  Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the app.

## Deploy on Heroku

You can easily deploy this project to your own Heroku by clicking the following button.

<a href="https://www.heroku.com/deploy?template=https://github.com/misu007/agentforce-headless-agent-nextjs-demo/">
<img src="https://www.herokucdn.com/deploy/button.svg" alt="Deploy">
</a>

> Note: Make sure to fill in the environment variables during the deployment process.

## License

MIT License
