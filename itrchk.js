let totalIteration = 0;

function generateRandom2DArray(rows, cols, min, max) {
  const result = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      const randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
      row.push(randomValue);
    }
    result.push(row);
  }
  return result;
}

let parseIteration = 0;
function parse(array) {
    const obj = {};

    const numRows = array.length;
    const numCols = array[0].length;

    for (let index = 0; index < numRows * numCols; index++) {
        const row = Math.floor(index / numCols);
        const col = index % numCols;
        const element = array[row][col];

        obj[element] = obj[element] || [];
        obj[element].push([row, col]);
        parseIteration++;
    }

    return obj;
}

let shuffleIteration = 0;
function shuffle(object) {
    const shuffledKeys = Object.keys(object);
    shuffleIteration += shuffledKeys.length;
    for (let i = shuffledKeys.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledKeys[i], shuffledKeys[j]] = [shuffledKeys[j], shuffledKeys[i]];
        shuffleIteration++;
    }
  
    const temp = { };
    const res = { };
    shuffledKeys.forEach((key, index) => {
        temp[index] = object[key];
        shuffleIteration++;
    });

    const originalKeys = Object.keys(object);
    shuffleIteration += originalKeys.length;
    originalKeys.forEach((key, index) => {
        res[key] = temp[index];
        shuffleIteration++;
        console.log(`Tiles with type of ${shuffledKeys[index]} is now of type ${key}`);
    });

    console.log(`shuffle() took ${shuffleIteration} iterations`);
    return res;
}

let reconstructIteration = 0;
function reconstruct(object) {
    const array = [];
    const objectKeys = Object.keys(object);
    reconstructIteration += objectKeys.length;
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            const locations = object[key];
            locations.forEach(([row, column]) => {
                array[row] = array[row] || [];
                array[row][column] = parseInt(key);
                reconstructIteration += 2; // One for array assignment and one for parseInt
            });
            reconstructIteration += locations.length; // Increment for each location iteration
        }
    }

    console.log(`reconstruct() took ${reconstructIteration} iterations`);
    return array;
}

const arr = generateRandom2DArray(8400, 2400, 0, 650);
// console.log(arr);
/*console.log(*/reconstruct(shuffle(parse(arr)));
console.log("Total iterations done: " + (parseIteration + shuffleIteration + reconstructIteration));
