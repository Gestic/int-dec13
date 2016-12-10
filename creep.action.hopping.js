var action = new Creep.Action('hopping');
action.isAddableAction = function(){ return true; };
action.isAddableTarget = function(){ return true; };
action.newTarget = function(creep){

    var flagHop = FlagDir.find(FLAG_COLOR.hopper);
    var flagHopHome = FlagDir.find(FLAG_COLOR.hopperHome);

    if(creep.hits < (creep.hitsMax-10) && creep.pos === flagHop.pos) {
        creep.moveTo(flagHopHome.pos);
    }
    if(creep.hits < (creep.hitsMax-10) && creep.pos === flagHopHome.pos) {
        Creep.action.healing;
    }
    if(creep.hits === creep.hitsMax && creep.pos === flagHopHome.pos) {
        creep.moveTo(flagHop.pos);
    }
};
action.work = function(creep){
    if( creep.data.flagName )
        return OK;
    else return ERR_INVALID_ARGS;
};
action.onAssignment = function(creep, target) {
    if( SAY_ASSIGNMENT ) creep.say(String.fromCharCode(9929), SAY_PUBLIC);
};
module.exports = action;