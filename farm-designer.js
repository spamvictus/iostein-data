const farmData = {
  dropRateAvg: 9,
  rows: 28,
  cols: 10,
  colWidth: 9,
  rowDepth: 5,
  stackSize: 64,
  invStackSpace: 33,
  unusableFieldBlocks: 1,
}


function calcStopPoints(fd){
  const stopPoints = [];
  const frontRowStacks = ((5*fd.colWidth-fd.unusableFieldBlocks)*fd.dropRateAvg)/fd.stackSize;
  let currInvStacks = 0;
  console.log(frontRowStacks);
  for (let currRow = 1; currRow <= fd.rows; currRow++) {

    for (
      let currCol = (currRow % 2 ? 1 : fd.cols );
      (currRow % 2 ?  currCol <= fd.cols : currCol > 0); 
      (currRow % 2 ? currCol++ : currCol--)
    ) {
      currInvStacks += frontRowStacks;

      if((fd.invStackSpace - currInvStacks) < frontRowStacks){
        currInvStacks = 0;
        stopPoints.push([currRow, currCol]);
      }

    }

  }
  console.log(stopPoints.length);
  return stopPoints;
}

console.log((farmData.colWidth*farmData.rowDepth-farmData.unusableFieldBlocks)*farmData.dropRateAvg*farmData.cols*farmData.rows);

console.log((farmData.colWidth*farmData.rowDepth-farmData.unusableFieldBlocks)*farmData.cols*farmData.rows);


console.log('test', calcStopPoints(farmData));
