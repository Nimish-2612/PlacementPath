# PlacementPath - Your Guided Path to Placement Success

This is a Next.js starter project for PlacementPath, a smart roadmap and progress tracker designed to help students prepare for job placements with confidence.

## Getting Started Locally

You can run this full application on your local machine. Follow these steps to get started:

### 1. Install Dependencies

First, navigate to the project's root directory in your terminal and install the necessary packages using npm:

```bash
npm install
```

### 2. Set Up Environment Variables

The application uses the Google AI (Gemini) API to power its AI features. You'll need an API key to run it locally.

1.  **Get an API Key**: Visit the [Google AI Studio](https://aistudio.google.com/app/apikey) to create and copy your free API key.

2.  **Create an Environment File**: In the root of your project, create a new file named `.env`.

3.  **Add the API Key**: Open the `.env` file and add the following line, replacing `YOUR_API_KEY_HERE` with the key you just copied:

    ```
    GEMINI_API_KEY=YOUR_API_KEY_HERE
    ```

### 3. Run the Development Server

Now you're all set! Start the Next.js development server by running:

```bash
npm run dev
```

This will start the application with Turbopack for faster performance. Open [http://localhost:3000](http://localhost:3000) in your browser to see the running application.

You can now explore the app and make any changes you like!