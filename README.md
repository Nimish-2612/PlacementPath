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

## Saving Your Project to GitHub

To save your code and deploy it to a hosting service, you should store it in a GitHub repository.

1.  **Initialize Git:** In your project's terminal, initialize a new Git repository.
    ```bash
    git init -b main
    git add .
    git commit -m "Initial commit"
    ```

2.  **Create a Repository on GitHub:** Go to [github.com/new](https://github.com/new), create a new repository (do not add a README or .gitignore), and copy its URL.

3.  **Push Your Code:** Link your local project to GitHub and push the code.
    ```bash
    # Replace the URL with the one you copied from GitHub
    git remote add origin YOUR_REPOSITORY_URL
    git push -u origin main
    ```

## Deployment

You can deploy this application to various platforms. Here are two popular options.

### Option 1: Firebase App Hosting (Recommended)

Firebase App Hosting is designed for Next.js and integrates well with the Firebase ecosystem.

**Prerequisites:**
*   Install the Firebase CLI: `npm install -g firebase-tools`
*   Log in to Firebase: `firebase login`

**Deployment Steps:**
1.  **Create a Firebase Project:** Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2.  **Upgrade to Blaze Plan:** In the Firebase Console, go to your project settings and upgrade to the **Blaze (pay-as-you-go)** plan. You still get a generous free tier and will only be charged if you exceed it. App Hosting requires this plan.
3.  **Initialize App Hosting:** Run `firebase init apphosting` in your project terminal and link it to the project you created.
4.  **Add API Key Secret:** Go to your App Hosting backend in the Firebase Console, navigate to the **Settings** tab, and add a secret named `GEMINI_API_KEY` with your Google AI API key as the value.
5.  **Deploy:** Run the deploy command:
    ```bash
    firebase deploy
    ```
Firebase will provide you with the URL for your live application.

### Option 2: Deploying to Render

Render is another excellent platform for hosting Next.js applications.

**Prerequisites:**
*   Your project code pushed to a GitHub repository.

**Deployment Steps:**
1.  **Create a New Web Service:** Sign up or log in to Render. On your dashboard, click **New +** and select **Web Service**.
2.  **Connect Your Repository:** Choose your GitHub repository that contains the project code.
3.  **Configure the Service:** Render is smart and will likely auto-detect the settings for a Next.js app. Ensure they match the following:
    *   **Environment:** `Node`
    *   **Build Command:** `npm install && npm run build`
    *   **Start Command:** `npm start`
4.  **Add Environment Variable:** In the **Environment** section, click **Add Environment Variable**.
    *   **Key:** `GEMINI_API_KEY`
    *   **Value:** Paste your Google AI API key.
5.  **Deploy:** Click **Create Web Service**. Render will automatically pull your code from GitHub, build it, and deploy it.

After a few minutes, your application will be live at the URL provided by Render.