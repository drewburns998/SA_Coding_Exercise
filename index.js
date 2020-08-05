const populatePlaneWithEmptySeats = num => {
    return Array(num).fill({}).map((seat, index) => {
        return {
            seatNumber: index + 1,
            occupied: false
        }
    });
}

const populatePassengerList = num => {
    return Array(num).fill({}).map((seat, index) => {
        return {
            passengerId: `${index+1}_passenger`,
            assignedSeat: index + 1,
        }
    });
}

const removeRandomSeat = (emptySeats = []) => {
    let availableSeats = emptySeats
    availableSeats.splice(Math.floor(Math.random()*availableSeats.length),1)

    return availableSeats;
}

const boardPlane = (emptySeats = [], passengers = []) => {
    let availableSeats = removeRandomSeat(emptySeats)

    for(let i = 1; i < passengers.length - 1; i++) {
        let seatFound = availableSeats.filter(seat => (seat.seatNumber === passengers[i].assignedSeat))
        
        seatFound.length != 0 ? 
            availableSeats = availableSeats.filter(seat => (seat.seatNumber !== passengers[i].assignedSeat)) :
            availableSeats = removeRandomSeat(availableSeats)
    }
    
    return availableSeats
}

const simulateBoardingScenario = (simulationCount = 1, seatCount = 0) =>  {
    let simulationsRun = 0;
    let simulationResults = [];

    while(simulationCount > 0) {
        simulationsRun++
        simulationCount--
        
        let remainingSeat = boardPlane(populatePlaneWithEmptySeats(100), populatePassengerList(100));
        simulationResults.push(remainingSeat);
    }

    const lastSeatAvailableCount = simulationResults.flat().filter(seat => seat.seatNumber == 1).length
    const lastSeatUnavailableCount = simulationResults.flat().filter(seat => seat.seatNumber != 1).length
    const lastSeatAvailablePercentage = 100 * lastSeatAvailableCount / (lastSeatAvailableCount + lastSeatUnavailableCount) 

    return {
        simulationsRun,
        lastSeatAvailableCount,
        lastSeatUnavailableCount,
        lastSeatAvailablePercentage
    }
}

module.exports = { populatePlaneWithEmptySeats, populatePassengerList, removeRandomSeat, boardPlane, simulateBoardingScenario }