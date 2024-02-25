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
