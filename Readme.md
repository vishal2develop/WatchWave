# WatchWave

WatchWave is a comprehensive movie and TV show catalog app built with React Native. It provides users with a seamless experience for discovering, browsing, and exploring a vast collection of movies and TV shows.

## Features

- Browse trending movies and TV shows
- Search for specific titles
- View detailed information about each movie or TV show, including ratings, release dates, genres, and summaries
- Save favorite movies and TV shows for easy access
- Seamless navigation and user-friendly interface

## Screenshots

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
  <img src="/Screenshots/Movies_Screen.png" alt="Movies Screen" width="200" height=""/>
  <img src="/Screenshots/TV_Screen.png" alt="TV Screen" width="200" />
  <img src="/Screenshots/Search_Screen.png" alt="Search Screen" width="200" />
  <img src="/Screenshots/Detail_Screen.png" alt="Detail Screen" width="200" height=""/>
  <img src="/Screenshots/Youtube_View.png" alt="Youtube View" width="200" />
  <img src="/Screenshots/Share_Screen.png" alt="Share Screen" width="200" />
</div>

## Technologies Used

- React Native
- TypeScript
- React Navigation
- TMDB API for fetch Movie & TV Data
- React Tanstack Query for data fetching and caching

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- Android/iOS emulator or physical device for testing

# Environment Variables

WatchWave uses environment variables for configuration. You'll need to set up these variables before running the app. Create a `.env` file in the root directory of your project by copying the `.env.sample` file and replacing the placeholders with actual values.

## `.env.sample`

For your convenience, a `.env.sample` file is provided in the root directory of the project. You can use this file as a template to create your `.env` file. It contains the following variables:

### Installation

1. Clone the repository:

git clone https://github.com/vishal2develop/WatchWave.git

2. Install dependencies:

cd watchwave
npm install

1. Start the development server:

npm start

IOS - npx pod-install ios

4. Run on Android/iOS emulator or physical device:

npm run android

or
npm run ios

## Contributions

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.
