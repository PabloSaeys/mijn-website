// URL of the Hacker News API
let topStoriesUrl = 'https://hacker-news.firebaseio.com/v0/topstories.json';
// URL of a specific news item
let newsItemURL = 'https://hacker-news.firebaseio.com/v0/item/';

// Function to fetch data using fetch
const fetchData = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
};

// Function to retrieve and display the first 5 top stories with their links to Hacker News comments
const showTopStories = async () => {
    try {
        // Fetch top stories
        let storyIds = await fetchData(topStoriesUrl);
        console.log(storyIds);

        // Counter for the number of displayed top stories
        let count = 0;

        // Fetch details for each top story, limited to the first 5
        for (const storyId of storyIds) {
            if (count >= 5) break; // Stop the loop if we have reached 5 top stories
            let storyData = await fetchData(`${newsItemURL}${storyId}.json`);
            console.log(storyData);

            // Check if the story has a URL
            if (storyData.url) {
                // Create a link for the story and add it to the list in HTML
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.textContent = storyData.title;
                link.href = `https://news.ycombinator.com/item?id=${storyId}`; // Link to the comments on Hacker News
                link.target = "_blank"; // Open the link in a new tab
                listItem.appendChild(link);
                document.getElementById('news').appendChild(listItem);

                count++; // Increment the counter for the number of displayed top stories
            }
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
};

// Call the function to display the first 5 top stories with their links to comments
showTopStories();