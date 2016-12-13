var action = new Creep.Action('hopping');
action.newTarget = function(creep){
    return creep.target = FlagDir.find(FLAG_COLOR.invade.hopperHome);
};
action.work = function(creep){
    if(creep.hits != creep.hitsMax || creep.hits < creep.hitsMax){
        action.newTarget = function(creep){
            return creep.target = FlagDir.find(FLAG_COLOR.invade.hopperHome);
        };
        let injured = creep.pos.findInRange(creep.room.casualties, 3);
        if( injured.length > 0 ){
            if(creep.pos.isNearTo(injured[0])) {
                creep.heal(injured[0]);
            }
            else {
                creep.rangedHeal(injured[0]);
            }
        }
        return workResult = OK;
    }
    if (creep.hits === creep.hitsMax){
        action.newTarget = function(creep){
            return creep.target = FlagDir.find(FLAG_COLOR.invade.hopper);
        };
        return workResult = OK;
    }
}
action.step = function(creep){
    if(CHATTY) creep.say(this.name, SAY_PUBLIC);
    let range = creep.pos.getRangeTo(creep.target);
    if( range <= this.targetRange ) {
        var workResult = this.work(creep);
        if( workResult != OK ) {
            if( DEBUG ) logErrorCode(creep, workResult);
            delete creep.data.actionName;
            delete creep.data.targetId;
            creep.action = null;
            creep.target = null;
            return;
        }
    }
if( creep.target )
    creep.drive( creep.target.pos, this.reachedRange, this.targetRange, range );
};
module.exports = action;