 /**
 * Represents the filepath of the Google Play Store CSV file.
 * @type {string}
 */
 const filePathOfPlaystore = './assets/googleplaystore.csv';
 const GENRE_COLUMN_INDEX = 10;
 const INSTALLS_COLUMN_INDEX = 6;
 const SIZE_COLUMN_INDEX = 5;
 
 
 
 
 /**
  * Represents the filepath of the Google Play Store user reviews CSV file.
  * @type {string}
  */
 const filePathOfReviews = './assets/googleplaystore_user_reviews.csv';
 
 import { readDataFromCSV } from "./commonparserfile.js";
 
 /**
  * Counts the total number of apps.
  * @param {Array<Array<string>>} appDetails - The details of apps from the CSV file.
  * @returns {Promise<number>} The total number of apps.
  */
 async function countTotalApps(appDetails) {
     try {
         // Count the number of apps
         const totalApps = appDetails.length;
         return totalApps;
     } catch (error) {
         throw new Error(`Error: ${error.message}`); 
     }
 }
 
 /**
  * Counts the number of unique genres.
  * @param {Array<Array<string>>} appDetails - The details of apps from the CSV file.
  * @returns {Promise<number>} The number of unique genres.
  */
 async function countUniqueGenres(appDetails) {
     try { 
         // Extract genres from app details
         const genres = appDetails.map(app => app[GENRE_COLUMN_INDEX]);
         // Remove duplicates
         const uniqueGenres = [...new Set(genres)];
         return uniqueGenres.length;
     } catch (error) {
         throw new Error(`Error: ${error.message}`); 
     }
 }
 
 /**
  * Counts the number of unique categories.
  * @param {Array<Array<string>>} appDetails - The details of apps from the CSV file.
  * @returns {Promise<number>} The number of unique categories.
  */
 async function countUniqueCategories(appDetails) {
     try {
         // Extract categories from app details
         const categories = appDetails.map(app => app[1]);
         // Remove duplicates
         const uniqueCategories = [...new Set(categories)];
         return uniqueCategories.length;
     } catch (error) {
         throw new Error(`Error: ${error.message}`); 
     }
 }
 
 /**
  * Calculates the total number of installs.
  * @param {Array<Array<string>>} appDetails - The details of apps from the CSV file.
  * @returns {Promise<BigInt>} The total number of installs.
  */
 async function calculateTotalInstalls(appDetails) {
     try {
         // Extract installs from app details and sum them up
         const totalInstalls = appDetails.reduce((total, app) => {
             // Extract numerical value from the "Installs" column
             const installsStr = app[INSTALLS_COLUMN_INDEX]; 
             const installs = parseInstallCount(installsStr); // Parse the install count
             return BigInt(total) + BigInt(installs);
         }, BigInt(0));
         return totalInstalls;
     } catch (error) {
         throw new Error(`Error: ${error.message}`); 
     }
 }
 
 /**
  * Parses the install count from a string.
  * @param {string} installsStr - The string representing the install count.
  * @returns {number} The parsed install count.
  */
 function parseInstallCount(installsStr) {
     // Handle cases like "50,000,000+" by trimming and splitting
     const trimmedStr = installsStr.trim();
     const parts = trimmedStr.split("+");
     // Extract the first numerical part and return it
     const numericPart = parts[0].match(/([\d,]+)\+/);
     if (numericPart) {
         return parseInt(numericPart[0].replace(/,/g, ''), 10); // Remove commas and convert to integer
     } else {
         return 0; // Return 0 if no numeric part found (invalid format)
     }
 }
 
 /**
  * Calculates the total size of apps in the Play Store.
  * @param {Array<Array<string>>} appDetails - The details of apps from the CSV file.
  * @returns {Promise<number>} The total size of apps.
  */
 async function calculateTotalPlayStoreSize(appDetails) {
     try {
         // Extract sizes from app details and sum them up
         const totalSize = appDetails.reduce((total, app) => {
             const sizeStr = app[SIZE_COLUMN_INDEX]; 
             let size = 0;
             if (sizeStr.endsWith('M')) {
                 size = parseFloat(sizeStr) * 1024; // Convert MB to KB
             } else if (sizeStr.endsWith('k')) {
                 size = parseFloat(sizeStr); // Size is already in KB
             }
             return total + size;
         }, 0);
         return totalSize;
     } catch (error) {
         throw new Error(`Error: ${error.message}`); 
     }
 }
 
 /**
  * Retrieves the app with the least reviews.
  * @param {Array<Array<string>>} appReviews - The reviews of apps from the CSV file.
  * @returns {Promise<string|null>} The name of the app with the least reviews.
  */
 async function getAppWithLeastReviews(appReviews) {
     try {
         // Count reviews for each app
         const reviewsCount = {};
         // Start iterating from the second row (index 1) to exclude the header row
         for (let i = 1; i < appReviews.length; i++) {
             const review = appReviews[i];
             const appName = review[0];
             reviewsCount[appName] = (reviewsCount[appName] || 0) + 1;
         }
         // Find app with least reviews
         let leastReviewedApp = null;
         let minReviews = Infinity;
         for (const appName in reviewsCount) {
             if (reviewsCount[appName] < minReviews) {
                 leastReviewedApp = appName;
                 minReviews = reviewsCount[appName];
             }
         }
         return leastReviewedApp;
     } catch (error) {
         throw new Error(`Error: ${error.message}`); 
     }
 }
 
 /**
  * Retrieves the app with the most reviews.
  * @param {Array<Array<string>>} appReviews - The reviews of apps from the CSV file.
  * @returns {Promise<string|null>} The name of the app with the most reviews.
  */
 async function getAppWithMostReviews(appReviews) {
     try {
         // Count reviews for each app
         const reviewsCount = {};
         appReviews.forEach(review => {
             const appName = review[0];
             reviewsCount[appName] = (reviewsCount[appName] || 0) + 1;
         });
         // Find app with most reviews
         let mostReviewedApp = null;
         let maxReviews = 0;
         for (const appName in reviewsCount) {
             if (reviewsCount[appName] > maxReviews) {
                 mostReviewedApp = appName;
                 maxReviews = reviewsCount[appName];
             }
         }
         return mostReviewedApp;
     } catch (error) {
         throw new Error(`Error: ${error.message}`); 
     }
 }
 
 /**
  * Retrieves the app(s) with the most downloads.
  * @param {Array<Array<string>>} appDetails - The details of apps from the CSV file.
  * @returns {Promise<Array<string>>} The name(s) of the app(s) with the most downloads.
  */
 async function getAppsWithMostDownloads(appDetails) {
     try {
         // Initialize variables to track apps with most downloads
         let maxInstalls = -1;
         let mostDownloadedApps = [];
         // Iterate through app details to find the maximum number of downloads
         for (const app of appDetails) {
             // Extract numerical value from the "Installs" column
             const installsStr = app[INSTALLS_COLUMN_INDEX].replace(/[,+]/g, ''); 
             const installs = parseInt(installsStr); // Convert string to integer
             if (installs > maxInstalls) {
                 maxInstalls = installs;
                 mostDownloadedApps = [app[0]]; // Reset the array with the new app
             } else if (installs === maxInstalls) {
                 mostDownloadedApps.push(app[0]); // Add the app to the array if it has the same maximum installs
             }
         }
         return mostDownloadedApps;
     } catch (error) {
         throw new Error(`Error: ${error.message}`); 
     }
 }
 
 /**
  * Retrieves the app(s) with the least downloads.
  * @param {Array<Array<string>>} appDetails - The details of apps from the CSV file.
  * @returns {Promise<Array<string>>} The name(s) of the app(s) with the least downloads.
  */
 async function getAppsWithLeastDownloads(appDetails) {
     try {
         // Initialize variables to track apps with least downloads
         let minInstalls = Infinity;
         let leastDownloadedApps = [];
         // Iterate through app details to find the minimum number of downloads
         for (const app of appDetails) {
             // Extract numerical value from the "Installs" column
             const installsStr = app[INSTALLS_COLUMN_INDEX].replace(/[,+]/g, ''); // Assuming installs are in the 6th column
             const installs = parseInt(installsStr); // Convert string to integer
             if (installs < minInstalls) {
                 minInstalls = installs;
                 leastDownloadedApps = [app[0]]; // Reset the array with the new app
             } else if (installs === minInstalls) {
                 leastDownloadedApps.push(app[0]); // Add the app to the array if it has the same minimum installs
             }
         }
         return leastDownloadedApps;
     } catch (error) {
         throw new Error(`Error: ${error.message}`); 
     }
 }
 
 /**
  * Analyzes the distribution of app sizes.
  * @param {Array<Array<string>>} appDetails - The details of apps from the CSV file.
  * @returns {Promise<Object>} An object containing the count and percentage of apps for each size category.
  */
 async function analyzeAppSizes(appDetails) {
     // Initialize an object to store the count for each size category
     const sizeCounts = {};
     // Iterate through app details to count apps for each size category
     for (const app of appDetails) {
         // Extract size from the app details
         const sizeStr = app[SIZE_COLUMN_INDEX]; // Assuming size is in the 5th column
         let size = parseFloat(sizeStr); // Parse size as a float
         if (sizeStr.endsWith('M')) {
             size *= 1024; // Convert MB to KB
         }
         // Round size to the nearest integer for simplicity
         size = Math.round(size);
        // Increment the count for the corresponding size category
        const roundedSize = Math.round(size);
        sizeCounts[roundedSize] = (sizeCounts[roundedSize] || 0) + 1;

         
     }
     // Calculate the total number of apps
     const totalApps = appDetails.length;
     // Calculate the percentage for each size category using map and Object.fromEntries
     const sizePercentages = Object.fromEntries(
    Object.entries(sizeCounts).map(([size, count]) => [size, ((count / totalApps) * 100).toFixed(2)])
) ;

    return sizePercentages;

  
     
 }
 
 /**
  * Formats the size percentages for display.
  * @param {Object} sizePercentages - An object containing the percentage of apps for each size category.
  * @returns {string} The formatted size percentages.
  */
 function formatSizePercentages(sizePercentages) {
    const sortedSizes = Object.keys(sizePercentages).sort((a, b) => parseFloat(a) - parseFloat(b));
    
    const header = '| Size (MB) | Percentage |';
    const separator = '|-----------|------------|';
    
    const rows = sortedSizes.map(size => `| ${size} MB      | ${sizePercentages[size]}%       |`);
    
    return [header, separator, ...rows].join('\n');
}

 
 /**
  * Executes the analytics process.
  * @returns {Promise<Object>} The result of the analytics.
  */
 async function executeAnalytics() {
     try {
         // Read data from CSV files
         const appDetails = await readDataFromCSV(filePathOfPlaystore);
         const appReviews = await readDataFromCSV(filePathOfReviews);
 
         // Perform analytics calculations
         const totalApps = await countTotalApps(appDetails);
         const uniqueGenres = await countUniqueGenres(appDetails);
         const uniqueCategories = await countUniqueCategories(appDetails);
         const totalInstalls = await calculateTotalInstalls(appDetails);
         const totalPlayStoreSize = await calculateTotalPlayStoreSize(appDetails);
         const mostReviewedApp = await getAppWithMostReviews(appReviews);
         const leastReviewedApp = await getAppWithLeastReviews(appReviews);
         const mostDownloadedApp = await getAppsWithMostDownloads(appDetails);
         const leastDownloadedApp = await getAppsWithLeastDownloads(appDetails);
         const sizePercentages = await analyzeAppSizes(appDetails);
 
         // Construct the result object
         const result = {
             totalApps,
             uniqueGenres,
             uniqueCategories,
             totalInstalls,
             totalPlayStoreSize,
             mostReviewedApp,
             leastReviewedApp,
             mostDownloadedApp,
             leastDownloadedApp,
             sizePercentages
         };
 
         // Return the result object
         return result;
     } catch (error) {
         // Throw any errors that occur during analytics execution
         throw new Error(`Error in executeAnalytics: ${error.message}`);
     }
 }
 
 // Call the executeAnalytics function and handle the result
 executeAnalytics()
     .then(result => {
         console.log('Analytics complete.');
         console.log('Result:', result);
     })
     .catch(error => {
         console.error('Error:', error.message);
     });