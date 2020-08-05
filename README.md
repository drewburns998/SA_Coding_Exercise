# State Auto Coding Exercise

### Primary Technology Used

* Node v14.6.0 is used on this application (other versions are not guaranteed)


### Running the application locally:

This application was built using Node version v14.6.0.  It may work on different versions, however it has only been tested on v14.6.0.  Consider using nvm (node version manager) and switching to this version to ensure the application runs as expected.

* Ensure correct Node version
* Clone this repository into a directory of your choosing
* Navigate to the root directory of the repository and install dependencies 
    * npm install
* For the sake of this exercise, the simulations are run as a unit test.  In order to run the simulation, use the following script in the root directory ```npm run test:simulation ```

### Useful Commands
Install Dependencies
```
npm install
```

Run / Watch All Tests 
```
npm run test
npm run test:watch
```

Run / Watch Only Simulation
```
npm run test:simulation
```


### Key Notes:
Originally when working through the problem, I outlined my approach as described below.  I did deviate slightly to solve a simpler problem.  Rather than updating the seats with occupied, I decided to discard them from the availableSeats array as they were assigned.  Given the contraints of the problem, there was no impact.

So, rather than the below approach I remove a random unassigned seat

* Remove a random seat from the plane (this represents the first person boarding)
* Iterate over the remaining passengers, assigning them to seats (their own if available, a random one otherwise)
* I stop at the last seat and use the value to determine if it's seat 100 (which corresponds to the last person boarding)

```

Plane
[{seat:1, occupied:false}, {seat:1, occupied:false} ... 100]

Passengers
[{name:"jon", ticket_seat_number: 3}, ... 100]

Passengers length 100
iterate over Passengers
    1st passenger - assign randomly to something inside Plane
        update seat availablility to false
    2nd passenger through 99
        if seat available, grab it
        otherwise, pick random seat
        set the chosen seat to unavailable


evaluate person 100, check if the only available seat == person's ticket_seat_number


One simulation.


Outer wrapper to run N number simulations

take the output of each scenario, accumulate either success/failure to show if the person has available
has a seat assigned correctly, or not
```