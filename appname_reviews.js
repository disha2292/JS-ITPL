//by disha vala
import { readDataFromCSV } from './commonparserfile.js';


const filePathOfPlaystore ='./assets/googleplaystore.csv'

async function processData(options) {
    try {
        const { searchQuery, skip = 0, limit = Infinity, orderBy, order, selects } = options;

        // Read data from the CSV file
        const playStoreInfo = await readDataFromCSV(filePathOfPlaystore);

        // Extract app names and reviews from the play store info
        const [appNames, reviews] = [0, 3].map(column => playStoreInfo.map(entry => entry[column]));

        // Combine app names and reviews into an array of objects
        let filteredAppData = appNames.map((appName, index) => ({ App: appName, Reviews: reviews[index] }));

        // Filter data based on search query if provided
        if (searchQuery) {
            filteredAppData = filteredAppData.filter(entry =>
                entry.App.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Apply ordering if provided
        if (orderBy) {
            filteredAppData.sort((a, b) => {
                const aValue = a[orderBy];
                const bValue = b[orderBy];
                if (order === 'ASC') {
                    return aValue.localeCompare(bValue);
                } else if (order === 'DSC') {
                    return bValue.localeCompare(aValue);
                }
                return 0;
            });
        }

        //Apply selects filter if provided
        if (selects) {
            const selectedColumns = selects.split(',');
            filteredAppData = filteredAppData.map(entry => {
                const selectedEntry = {};
                selectedColumns.forEach(column => {
                    selectedEntry[column] = entry[column];
                });
                return selectedEntry;
            });
        }

        // Apply pagination
        filteredAppData = filteredAppData.slice(skip, skip + limit);

        // Return the filtered data
        return filteredAppData;
    } catch (error) {
        throw new Error(`Error processing data: ${error.message}`);
    }
}

function parseCommandLineArguments() {
    const [, , ...args] = process.argv;

    const options = {
        searchQuery: getOptionValue(args, '--search'),
        skip: parseInt(getOptionValue(args, '--skip')) || 0,
        limit: parseInt(getOptionValue(args, '--limit')) || 15, // Default limit to 15 if not provided
        orderBy: getOptionValue(args, '--order-by'),
        order: getOptionValue(args, '--order'),
        selects: getOptionValue(args, '--selects')
    };

    return options;
}


function getOptionValue(args, option) {
    const optionIndex = args.indexOf(option);
    return optionIndex !== -1 && optionIndex + 1 < args.length ? args[optionIndex + 1] : null;
}

const options = parseCommandLineArguments();

processData(options)
    .then((filteredData) => {
        console.log(filteredData);
    })
    .catch((error) => {
        console.error(error.message);
    });







