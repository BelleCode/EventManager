let events = [{
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 240000,
        date: "06/01/2017"
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 250000,
        date: "06/01/2018"
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 257000,
        date: "06/01/2019"
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 130000,
        date: "06/01/2017"
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 140000,
        date: "06/01/2018"
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 150000,
        date: "06/01/2019"
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 40000,
        date: "06/01/2017"
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 45000,
        date: "06/01/2018"
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 50000,
        date: "06/01/2019"
    },
    {
        event: "HeroesCon",
        city: "Seattle",
        state: "Washington",
        attendance: 60000,
        date: "06/01/2017"
    }, {
        event: "HeroesCon",
        city: "Seattle",
        state: "Washington",
        attendance: 55000,
        date: "06/01/2018"
    }, {
        event: "HeroesCon",
        city: "Seattle",
        state: "Washington",
        attendance: 75000,
        date: "06/01/2019"
    }
]

//build a dropdown of distict cities
function buildDropDown() {

    //collect information for DD drop down
    let eventDD = document.getElementById("eventDropDown");

    //clearing out after page-load
    eventDD.innerHTML = "";

    //retreiving the template
    let ddTemplate = document.getElementById("cityDD-template");


    let curEvents = events;

    // returns an array of uniquely identitifed events
    let distinctEvents = [...new Set(curEvents.map((event) => event.city))];

    // pulling a copy of the item
    let ddItemNode = document.importNode(ddTemplate.content, true);
    //<li>
    //<a class="dropdown-item" onclick="getEvents(this)"></a>
    //<li>

    let ddItem = ddItemNode.querySelector("a");

    //<a class="dropdown-item" onclick="getEvents(this)"></a>
    //querySelector will only return the first one
    //querySelectorAll will return the entire array

    ddItem.setAttribute("data-string", "All");

    //<a class="dropdown-item" data-string="All" onclick="getEvents(this)"></a>

    ddItem.textContent = "All";
    //<a class="dropdown-item" data-string="All" onclick="getEvents(this)">ALL</a>

    eventDD.appendChild(ddItemNode);



    //Adding cities to the dropdown 
    for (let index = 0; index < distinctEvents.length; index++) {

        //get a new event (where to get the info, nested == true)
        ddItemNode = document.importNode(ddTemplate.content, true);

        //what are we trying to change.. <a> tag
        ddItem = ddItemNode.querySelector("a");

        //
        ddItem.setAttribute("data-string", distinctEvents[index]);


        ddItem.textContent = distinctEvents[index];

        //append the node to the dropdown
        eventDD.appendChild(ddItemNode);
    }
    displayStats(curEvents);
    displayData();


}


// display stats for the filtered events
function displayStats(filteredEvents) {

    let total = 0;
    let average = 0;
    let most = 0;
    let least = -1; // since we know this is not possible, this can be less than zero
    let currentAttendance = 0;

    for (let index = 0; index < filteredEvents.length; index++) {
        currentAttendance = filteredEvents[index].attendance;
        total += currentAttendance;

        if (most < currentAttendance) {
            most = currentAttendance;
        }

        // if least is not set to -1 ,         v should be set to <=
        if (least > currentAttendance || least < 0) {
            least = currentAttendance;
        }

        // calculate average
        average = total / filteredEvents.length;

    }
    document.getElementById("total").innerHTML = total.toLocaleString();
    document.getElementById("most").innerHTML = most.toLocaleString();
    document.getElementById("average").innerHTML = average.toLocaleString(
        undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }
    );
    document.getElementById("least").innerHTML = least.toLocaleString();
}

//get the events for the selected City
function getEvents(ddElement) {

    let cityName = ddElement.getAttribute("data-string");

    let curEvents = events;

    let filteredEvents = curEvents;

    document.getElementById("statsHeader").innerHTML = `Stats for ${cityName} Events`;

    if (cityName != "All") {

        filteredEvents = curEvents.filter(function (item) {
            if (item.city == cityName) {
                return (item);
            }
        })
    }
    displayStats(filteredEvents);
}

// Display lower table (current events) => gets called in buildDropDown()
function displayData() {
    let template = document.getElementById("eventData-template");
    let eventBody = document.getElementById("eventBody");

    //clearing out after page-load
    eventBody.innerHTML = "";

    // Default data
    let curEvents = events;

    for (let index = 0; index < curEvents.length; index++) {

        // copy of arow template
        let eventRow = document.importNode(template.content, true);

        // getting an array of columns
        let eventCols = eventRow.querySelectorAll("td");

        // defining the array
        eventCols[0].textContent = curEvents[index].event;
        eventCols[1].textContent = curEvents[index].city;
        eventCols[2].textContent = curEvents[index].state;
        eventCols[3].textContent = curEvents[index].attendance;
        eventCols[4].textContent = new Date(
            curEvents[index].date).toLocaleDateString();

        //Add the items into
        eventBody.appendChild(eventRow);
    }

}