const { assert } = require('chai')
const { populatePlaneWithEmptySeats, populatePassengerList, removeRandomSeat, boardPlane, simulateBoardingScenario } = require('./index')

describe('plane boarding simulator', () => {
    describe('populate plane with empty seats', () => {
        it('creates the plane with seats and availability', () => {
            const numberSeats = 2;
            const planeResult = populatePlaneWithEmptySeats(numberSeats);

            assert.deepEqual(planeResult.length, numberSeats)
            assert.deepEqual(planeResult[0], { seatNumber: 1, occupied: false });
            assert.deepEqual(planeResult[1], { seatNumber: 2, occupied: false });
        })
    })

    describe('populate list of passengers', () => {
        it('creates the passengers with random seat information', () => {
            const numberPassengers = 2;
            const passengerList = populatePassengerList(numberPassengers);

            assert.deepEqual(passengerList.length, numberPassengers)
            assert.deepEqual(passengerList[0], { passengerId: "1_passenger", assignedSeat: 1 });
            assert.deepEqual(passengerList[1], { passengerId: "2_passenger", assignedSeat: 2 });
        })
    })

    describe('remove random seat', () => {
        it('returns empty array if no seats are available', () => {
            const resultWithRemovedSeat = removeRandomSeat();
            const expectedResult = [];

            assert.deepEqual(resultWithRemovedSeat, expectedResult);
        })

        it('returns an array with one less seat than it started', () => {
            const resultWithRemovedSeat = removeRandomSeat(["foo", "bar"]);
            const expectedSize = 1;

            assert.deepEqual(resultWithRemovedSeat.length, expectedSize);
        })

        it('returns an array that is a subset of the original array', () => {
            const availableSeats = ["foo", "bar"]
            const resultWithRemovedSeat = removeRandomSeat(availableSeats);

            assert.includeDeepMembers(availableSeats, resultWithRemovedSeat);
        })
    })

    describe('board plane', () => {
        it('returns an empty array if no seats are provided', () => {
            const passengers = populatePassengerList(4);

            const planeResult = boardPlane(undefined, passengers);

            assert.deepEqual(planeResult, []);
        })
        it('returns the original list of empty seats if no passengers are provided', () => {
            const emptyPlane = populatePlaneWithEmptySeats(4);

            const planeResult = boardPlane(emptyPlane, undefined);

            assert.deepEqual(planeResult, emptyPlane);
        })
        

        it('returns the final seat when the passenger list is not larger than the number of seats', () => {
            const emptyPlane = populatePlaneWithEmptySeats(4);
            const passengers = populatePassengerList(4);

            const planeResult = boardPlane(emptyPlane, passengers);

            assert.deepEqual(planeResult.length, 1);
            assert.containsAllKeys(planeResult[0], ['occupied', 'seatNumber']);
        })

        it('returns empty array when the passenger list is larger than the number of seats', () => {
            const emptyPlane = populatePlaneWithEmptySeats(4);
            const passengers = populatePassengerList(5);

            const planeResult = boardPlane(emptyPlane, passengers);

            assert.deepEqual(planeResult, []);
        })
    })

    describe('simulate boarding', () => {
        it('runs at least one simulation if simulation amount is not provided', () => {
            const { simulationsRun } = simulateBoardingScenario(4);

            assert.deepEqual(simulationsRun, 4);
        })

        it('the last seat being available/unavailable should sum to the number of simulations', () => {
            const simulationCount = 50;
            const seatCount = 100;
            
            const { lastSeatAvailableCount, lastSeatUnavailableCount } = simulateBoardingScenario(simulationCount, seatCount);
            const lastSeatCheckedCount = lastSeatAvailableCount + lastSeatUnavailableCount;

            assert.deepEqual(lastSeatCheckedCount, simulationCount);           
        })

        it('number of simulations run should equal the simulation count', () => {
            const simulationCount = 50;
            const seatCount = 100;
            
            const { simulationsRun } = simulateBoardingScenario(simulationCount, seatCount);
            
            assert.deepEqual(simulationsRun, simulationCount);           
        })

        it('returns a valid percentage between 0 and 100 inclusive', () => {
            const simulationCount = 50;
            const seatCount = 100;
            
            const { lastSeatAvailablePercentage } = simulateBoardingScenario(simulationCount, seatCount);
            const isValidPercent = lastSeatAvailablePercentage >= 0 && lastSeatAvailablePercentage <= 100;
            assert.isTrue(isValidPercent);
        })

        it('produces simulation results', () => {
            const simulationCount = 1000;
            const seatCount = 100;
            
            const { lastSeatAvailablePercentage } = simulateBoardingScenario(simulationCount, seatCount);
            
            console.log("Total Simulations: ", simulationCount)
            console.log("Seats per simulation: ", seatCount)
            console.log("Passengers per simulation: ", seatCount)
            console.log("% of simulations that the final person gets the correct set: ", lastSeatAvailablePercentage, "%")
        })
    })
})