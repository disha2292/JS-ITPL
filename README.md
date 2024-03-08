# js-cli-exercise - Google Play Store Apps
This project is a versatile app management system offering detailed analytics, search functionalities, and filtering options, facilitating efficient app discovery, analysis, and optimization.

## technologies 
javascript

node 20.11.0

## Requirements

For development, you will only need Node.js and a node global package manager npm installed in your environement.

### Node
- #### Node installation on Macos
  Open Terminal.
Install Homebrew if you haven't already:
  ```
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  ```
  Install Node.js:
  ```
  brew install node
  ```

- #### Node installation on Linux(Garuda)
    You can install nodejs and npm easily with pacman (use package manager based on ypur distro), just run the following commands.
     ```
     sudo pacman -S nodejs npm
- #### Node installation on Windows
  
  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

## Install
  ```
   $ git clone https://github.com/disha2292/js-cli-exercise.git
  ```
  ```
   $ cd js-cli-exercise
  ```
   Install Dependencies
   ```
   npm install
   ```
# Examples
### Question-1) List apps with total review count, and add search functionality with --search flag.
  **RUN**
  ```
  node appname_reviews.js
  ```
  **OUTPUT**
  ```
  { App: 'App', Reviews: 'Reviews' },
  {
    App: 'Photo Editor & Candy Camera & Grid & ScrapBook',
    Reviews: '159'
  },
  { App: 'Coloring book moana', Reviews: '967' },
  {
    App: 'U Launcher Lite – FREE Live Cool Themes, Hide Apps',
    Reviews: '87510'
  },

 ```
  
### Question-2) Command that accepts a name as input and prints details of the app (including reviews).
  **RUN**
  ```
  node appDetails.js " Flowers Live Wallpaper"
  ```
  **OUTPUT** 
  | App name                | Reviews        | Sentiment     |
  | :---                    |     :---:      |          ---: |
  | Flowers Live Wallpaper  |      not good  |     Neutral   |

  


### Question-3) List most liked (install x rating) Apps also create command which accepts filters such as category, rating, size, and type and prints the apps.
  **RUN**
  ```
  node mostLiked.js
  ```
  **OUTPUT**
### Question-4) Apps having (0 to 0.5) highest objective and positive review.
  **RUN**
  ```
  node filterBasedOnSentiment.js
  ```
  **OUTPUT**
### Question-5) Create a command that prints the analytics (e.g.Number of Apps , percentage count w.r.t to size , unique genres & categories , most and least reviewed apps , most and least downloaded apps , total playstore aize and total installs.)
  **RUN**
  ```
  node analytics.js
  ```
  **OUTPUT**
  ```
  Analytics complete.
  Result: {
  totalApps: 10842,
  uniqueGenres: 1378,
  uniqueCategories: 34,
  totalInstalls: 0n,
  totalPlayStoreSize: 0,
  mostReviewedApp: 'Angry Birds Classic',
  leastReviewedApp: 'Drawing Clothes Fashion Ideas',
  mostDownloadedApp: Photo Designer - Write your name with shapes,
  leastDownloadedApp: I Creative Idea,
  sizePercentages: {
    '0': '0.14',
    '1': '24.09',
    '5': '12.09',
    '10': '24.83',
    '50': '8.97',
    '100': '21.19',
    '500': '8.68',
    NaN: '0.01'
  }
}
```




















  
 

