// ****************** Roads ***********************

const roads = [
  "Alice's House-Bob's House",   "Alice's House-Cabin",
  "Alice's House-Post Office",   "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
];

// ************* Turn Roads into Graph ***************

function buildGraph(edges) {

  let graph = Object.create(null);

  function addEdge(from, to) {
    // if graph doesn't have from as a property, add from as a
    // property. Set to as from's value.
    if (graph[from] == null) {
      graph[from] = [to];
    // else, add another "destination to the from property"
    } else {
      graph[from].push(to);
    }
  }

  let connectedPointsArray = edges.map(r => r.split("-"));

  // [from, to] is simply the destructed element currently being looped over
  for (let [from, to] of connectedPointsArray) {
    // have to addEdge twice, to ge a full list of connected points.
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}

const roadGraph = buildGraph(roads);

// ************* VillageState Class ***************

class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

  move(destination) {

    if (!roadGraph[this.place].includes(destination)) {
      // if the desintation isn't connected to the current
      // place, then return. (impossible move)
      return this;

    } else {
      let parcels = this.parcels.map(p => {
        // don't update (deliver) parcel if it has a different destination
        // than the robot's current place.
        if (p.place != this.place) return p;
        // else, update (deliver) the parcel to its destination address
        return {place: destination, address: p.address};
        // filter out delivered parcels
      }).filter(p => p.place != p.address);

      // create new VillageState instance, "moving" the robot
      // to the next location and the updated parcels array.
      return new VillageState(destination, parcels);
    }
  }
}

// ************** Testing VillageState ******************

// let first = new VillageState(
//   "Post Office",
//   [{place: "Post Office", address: "Alice's House"}]
// );

// The Post Office is in connected with Alice's House,
// so the robot will move and deliver the package.

// let next = first.move("Alice's House");

// console.log(next.place);
// → Alice's House
// console.log(next.parcels);
// → []
// console.log(first.place);
// → Post Office


// ************** Main Execution Function ******************

function runRobot(state, robot, memory) {
  for (let turn = 0;; turn++) {
    if (state.parcels.length == 0) {
      // console.log(`Done in ${turn} turns`);
      return turn;
    }
    let action = robot(state, memory);
    // move updates local state variable, instead of global village class?
    state = state.move(action.direction);
    memory = action.memory;
    // console.log(`Moved to ${action.direction}`);
  }
}

// *************** Generate Random Village ******************

function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

// populate VillageState with Post Office and 5 random parcels.
VillageState.random = function(parcelCount = 5) {
  let parcels = [];
  for (let i = 0; i < parcelCount; i++) {
    let address = randomPick(Object.keys(roadGraph));
    let place;
    // fancy way of making sure a parcel doesn't have
    // the same place and destination
    do {
      place = randomPick(Object.keys(roadGraph));
    } while (place == address);
    parcels.push({place, address});
  }
  return new VillageState("Post Office", parcels);
};

// ***************** Random Robot *************************

// runRobot(VillageState.random(), randomRobot);

function randomRobot(state) {
  // provides a random destination (from state) as direction
  return {direction: randomPick(roadGraph[state.place])};
}

// ****************** Mail Route Robot ********************

// runRobot(VillageState.random(), routeRobot, []);

const mailRoute = [
  "Alice's House", "Cabin", "Alice's House", "Bob's House",
  "Town Hall", "Daria's House", "Ernie's House",
  "Grete's House", "Shop", "Grete's House", "Farm",
  "Marketplace", "Post Office"
];

function routeRobot(state, memory) {
  if (memory.length == 0) {
    memory = mailRoute;
  }
  return {direction: memory[0], memory: memory.slice(1)};
}

// ****************** Pathfinding Robot ********************

// runRobot(VillageState.random(), goalOrientedRobot, []);

function findRoute(graph, from, to) {
  let work = [{at: from, route: []}];
  for (let i = 0; i < work.length; i++) {
    let {at, route} = work[i];
    for (let place of graph[at]) {
      // first 'thread' of the web reaches destination, so
      // thread is traced back to the start, giving us our route
      if (place == to) return route.concat(place);
      if (!work.some(w => w.at == place)) {
        // otherwise add another entry to the work array
        work.push({at: place, route: route.concat(place)});
      }
    }
  }
}

function goalOrientedRobot({place, parcels}, route) {
  if (route.length == 0) {
    let parcel = parcels[0];
    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return {direction: route[0], memory: route.slice(1)};
}

// ************* Exercise: Measuring a Robot ***************

  // runRobot(VillageState.random(), randomRobot);

  // runRobot(VillageState.random(), routeRobot, []);

  // runRobot(VillageState.random(), goalOrientedRobot, []);

// function compareRobots(robot1, memory1, robot2, memory2) {
//   let measurements = Object.create(null);
//   let robot1Total;
//   let robot2Total;
//   measurements.robot1Total = 0;
//   measurements.robot2Total = 0;
//
//   for (let i = 0; i < 100; i++) {
//     let randomVillage = VillageState.random();
//     let robot1Result = runRobot(randomVillage, robot1, memory1);
//     let robot2Result = runRobot(randomVillage, robot2, memory2);
//     measurements.robot2Total += robot2Result;
//     measurements.robot1Total += robot1Result;
//   }
//   let robotAverages = Object.create(null);
//   let robot1Average;
//   let robot2Average;
//   robotAverages.robot1Average = measurements.robot1Total / 100;
//   robotAverages.robot2Average = measurements.robot2Total / 100;
//   console.log(robotAverages);
//   return robotAverages;
// }

function compareRobots(robot1, memory1, robot2, memory2) {
  let averageSteps = [0, 0];

  for (let i = 0; i < 100; i++) {
    let randomVillage = VillageState.random();
    averageSteps[0] += runRobot(randomVillage, robot1, memory1);
    averageSteps[1] += runRobot(randomVillage, robot2, memory2);
  }

  averageSteps[0] = averageSteps[0]/100;
  averageSteps[1] = averageSteps[1]/100;

  console.log(averageSteps);
}

compareRobots(routeRobot, [], goalOrientedRobot, []);








//
