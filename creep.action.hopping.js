var action = new Creep.Action('hopping');
action.newTarget = function(creep){
    if(creep.hits === creep.hitsMax){
        return creep.target = FlagDir.find(FLAG_COLOR.invade.hopper);
    }
    if(creep.hits < (creep.hitsMax-10)){
        return creep.target = FlagDir.find(FLAG_COLOR.invade.hopperHome);
    }
};
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
this.validateActionTarget = function(creep, target){
    if( this.isValidAction(creep) ){ // validate target or new
        if( !this.isValidTarget(target)){
            if( this.renewTarget ){ // invalid. try to find a new one...
                delete creep.data.path;
                return this.newTarget(creep);
            }
        } else return target;
    }
    return null;
};
this.assign = function(creep, target){
    if( target === undefined ) target = this.newTarget(creep);
    if( target != null ) {
        if( creep.action == null || creep.action.name != this.name || creep.target == null || creep.target.id != target.id ) {
            Population.registerAction(creep, this, target);
            this.onAssignment(creep, target);
        }
        return true;
    }
    return false;
};
module.exports = action;