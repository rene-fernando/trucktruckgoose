/*
document.addEventListener('DOMContentLoaded', function () {
    var trucks = ['Taco Truck', 'Burger Bus', 'Pizza Wagon', 'Sushi Van', 'BBQ Trailer'];

    var randomTruckBtn = document.getElementById('random-truck-btn');
    var resultDiv = document.getElementById('result');

    randomTruckBtn.addEventListener('click', function () {
        var randomIndex = Math.floor(Math.random() * trucks.length);
        var randomTruck = trucks[randomIndex];
        resultDiv.textContent = 'You should visit: ' + randomTruck;
    });
});
*/
document.addEventListener('DOMContentLoaded', function () {
    // Yelp API credentials
    const apiKey = 'J8AlKVQrx_k4kc29JzFjSGYSKsHTWm64hJtPHcLa2e8AgQVsz3yoD1RGc5_qPiAFK34Yp5L0RRUaGs9QPr3PDqzI1ZaSZ4-Rj5KIFDtill2XYwV6wOihSr3jHNDaZXYx';

    // Array of random sayings
    const randomSayings = [
        'HOW\'S THIS: ',
        'WHY DON\'T YOU TRY ',
        'GO CHECK OUT ',
        'WHY DON\'T YOU GO TO ',
        'HAVE YOU EATEN HERE YET?: ',
        'WHY NOT SUPPORT ',
        'SHOW SOME LOVE TO ',
        'LET\'S GET ROWDY AND TRY',
        'RUN OVER TO ',
        'HOW ABOUT '
    ];

    // Function to fetch data from Yelp API
    async function fetchFoodTrucks(location = 'San Antonio') {
        // const url = `https://api.yelp.com/v3/businesses/search?term=food+trucks&location=${location}`;
        
        const url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=food+trucks&location=${location}`;
        
        try {
            let ret;
            const response = await fetch(url, {
                method: 'GET', 
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${apiKey}`
                }
            })

            if (!response) {
                throw new Error('Failed to fetch data from Yelp API');
            }

            const data = await response.json();
            return data.businesses;
        } catch (error) {
            console.error('Error fetching data from Yelp API:', error.message);
            return [];
        }
    }

    // Function to display a random saying
    function getRandomSaying() {
        return randomSayings[Math.floor(Math.random() * randomSayings.length)];
    }

    // Function to display a random food truck
    function displayRandomFoodTruck(foodTrucks) {
        if (foodTrucks.length === 0) {
            document.getElementById('result').textContent = 'No food trucks found nearby.';
            return;
        }

        const randomIndex = Math.floor(Math.random() * foodTrucks.length);
        const randomFoodTruck = foodTrucks[randomIndex];
        const randomSaying = getRandomSaying();
        
        document.getElementById('result').innerHTML = `${randomSaying} <a href="${randomFoodTruck.url}" target="_blank">${randomFoodTruck.name}</a>`;
    }

    // Event listener for the button click
    document.getElementById('random-truck-btn').addEventListener('click', async function () {
        const userLocation = 'San Antonio, Texas'; // You can use geolocation to get the user's location dynamically
        const foodTrucks = await fetchFoodTrucks(userLocation);
        displayRandomFoodTruck(foodTrucks);
    });
});
