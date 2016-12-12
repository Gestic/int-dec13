var action = new Creep.Action('hopping');
action.isAddableAction = function(){ return true; };
action.isAddableTarget = function(){ return true; };
action.isValidTarget = function(target){
    return ( target != null &&
        target.hits != null &&
        target.hits < target.hitsMax &&
        target.my );
};
var flagHop = FlagDir.filter(FLAG_COLOR.invade.hopper);
var flagHopHome = FlagDir.filter(FLAG_COLOR.invade.hopperHome);
console.log(flagHop[0]);
action.newTarget = function(creep){
    //if(creep.room.casualties.length > 0){
        //return creep.room.casualties[0];
    //}
    if(flagHop.length > 0){
        return flagHop[0];
    }
    /*
    if(creep.hits === creep.hitMax && creep.pos != flagHop.pos){
        //creep.moveTo(flagHop.pos);
        return flag = flagHop;
    }
    if(creep.hits < (creep.hitsMax-10) && creep.pos === flagHop.pos) {
        //creep.moveTo(flagHopHome.pos);
        return flag = flagHopHome;
    }
    */
    return null;
};
action.work = function(creep){
    
    if(creep.hits === creep.hitMax && creep.pos != flagHop.pos){
        creep.moveTo(flagHop.pos);
    }
    if(creep.hits < (creep.hitsMax-10) && creep.pos === flagHop.pos) {
        creep.moveTo(flagHopHome.pos);
    }
    /*
    if( creep.target.hits < creep.target.hitsMax ){
        if( creep.pos.isNearTo(creep.target) ){
            return creep.heal(creep.target);
        }
        if(creep.pos.inRangeTo(creep.target, 3)) {
            return creep.rangedHeal(creep.target);
        }
        return OK;
    }
    */
};
action.onAssignment = function(creep, target) {
    if( SAY_ASSIGNMENT ) creep.say(String.fromCharCode(9960), SAY_PUBLIC);
};
module.exports = action;