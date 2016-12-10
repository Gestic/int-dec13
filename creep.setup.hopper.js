var setup = new Creep.Setup('hopper');
setup.minControllerLevel = 4;
setup.globalMeasurement = true;
setup.measureByHome = false;

setup.maxCount = function(room){
    let maxRange = 3;
    let max = 0;
    let distance, flag;
    let calcMax = flagEntry => {
        distance = routeRange(room.name, flagEntry.roomName);
        if( distance > maxRange ) 
            return;
        flag = Game.flags[flagEntry.name];
        if( !flag.targetOf || flag.targetOf.length == 0 )
            max++;
            max++;
    }
    let flagEntries = FlagDir.filter(FLAG_COLOR.invade.hopper);
    flagEntries.forEach(calcMax);
    return max;
};

setup.mid = {
    fixedBody: [], 
    multiBody: [TOUGH, MOVE, MOVE, HEAL], 
    minAbsEnergyAvailable: 360, 
    minEnergyAvailable: 0.5,
    maxMulti: 7, 
    minMulti: 3, 
    maxCount: setup.maxCount,
    maxWeight: 2520
};

setup.RCL = {
    1: setup.none,
    2: setup.none,
    3: setup.none,
    4: setup.mid,
    5: setup.mid,
    6: setup.mid,
    7: setup.mid,
    8: setup.mid
};
module.exports = setup;