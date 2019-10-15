window.addEventListener('DOMContentLoaded', () => {
    let colors = ['crimson', 'blue', 'green', 'gold', 'blueviolet', 'darkorchid', 'deeppink', 'dodgerblue', 'lawngreen', 'magenta', 'yellowgreen', 'mediumslateblue', 'tomato', 'slateblue', 'orangered', 'mediumvioletred'],

        title = document.getElementById('title'),
        mapContainer = document.getElementById('map-container'),
        map = document.getElementById('map'),
        informer = document.getElementById('informer'),
        treasure = document.createElement('div'),
        mapWidht = map.clientWidth,
        mapHeight = map.clientWidth,
        diagonal = Math.sqrt((mapWidht * mapWidht) + (mapHeight * mapHeight)),
        target =  {
            x: Math.floor(Math.random() * (mapWidht - 10)),
            y: Math.floor(Math.random() * (mapHeight - 10)),
        },
        clicks = 0;

    treasure.classList.add('treasure');
    treasure.style.cssText = `left: ${target.x}px; top: ${target.y}px;`;
    mapContainer.appendChild(treasure);
    colorizeTitle(title);


    // Click on the map
    map.addEventListener('click', event => {
        clicks++;
        informer.textContent = getDistanceHint(getDistants(event, target));
    });

    // Click on the treasure: Win
    treasure.addEventListener('click', () => {
        mapContainer.classList.add('block');
        treasure.classList.add('ping', 'show');
        informer.innerHTML = `You won!<br>Treasure found after<br>${clicks} clicks!`;
    });
    
    // Get click distance
    function getDistants(event, target) {
        let diffX = event.offsetX - target.x,
            diffY = event.offsetY - target.y;

        return Math.sqrt((diffX * diffX) + (diffY * diffY));
    }

    // Get distance comment
    function getDistanceHint(distance) {
        if      (distance < diagonal * 0.05)  return 'Burn yourself!';
        else if (distance < diagonal * 0.1)   return 'Very hot!';
        else if (distance < diagonal * 0.2)   return 'Hot!';
        else if (distance < diagonal * 0.4)   return 'Heat!';
        else if (distance < diagonal * 0.6)   return 'Coldly!';
        else if (distance < diagonal * 0.8)   return 'Very cold!';
        else                                  return 'Freeze!';
    }

    // Colorize title
    function colorizeTitle(title) {
        let titleContent = title.innerHTML;

        title.innerHTML = '';

        // Make new title
        for (let i = 0; i < titleContent.length; i++) {
            let newElement = document.createElement('span');

            newElement.innerHTML = titleContent[i] == ' ' ? '&nbsp;' : titleContent[i];
            title.appendChild(newElement);
        }

        // Colorize title
        colorize(title.querySelectorAll('span'));
    }

    // Colorize a text function
    function colorize(title) {
        for (let i = 0; i < title.length; i++) {
            title[i].style.color = getRandomItemOfArray(colors);
        }

        setInterval(() => {
            title[Math.floor(Math.random() * title.length)].style.color = getRandomItemOfArray(colors);
        }, 500);
    }

    // Get random item from an array
    function getRandomItemOfArray(array) {
        if (Array.isArray(array)) {
            return array[Math.floor(Math.random() * array.length)];
        }

        console.log(new TypeError("Object isn't array!"));
    }    
});