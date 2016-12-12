var action = new Creep.Action('hopping');
/*
action.newTarget = function(creep){
    if(creep.hits === creep.hitsMax){
        return creep.target = FlagDir.find(FLAG_COLOR.invade.hopper);
    }
    if(creep.hits < (creep.hitsMax-10)){
        return creep.target = FlagDir.find(FLAG_COLOR.invade.hopperHome) && Creep.action.healing;
    }
};
*/
/*
if(this.hits === this.hitsMax){
    action.newTarget = function(creep){
        return creep.target = FlagDir.find(FLAG_COLOR.invade.hopper);
    };
    console.log('off to war');
}
*/
action.work = function(creep){
    let ret;
    if(creep.hits < creep.hitsMax){
        action.newTarget = function(creep){
            //return creep.target = FlagDir.find(FLAG_COLOR.invade.hopperHome);
            ret = (creep.target = FlagDir.find(FLAG_COLOR.invade.hopperHome));
        };
        console.log('run beaches');
        //Creep.action.healing;
    }
    else{
        action.newTarget = function(creep){
            //return creep.target = FlagDir.find(FLAG_COLOR.invade.hopper);
            ret = (creep.target = FlagDir.find(FLAG_COLOR.invade.hopper));
        };
        console.log('off to war');
    }
    console.log(ret);
    return ret;
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
    if( creep.target ){
        creep.drive( creep.target.pos, this.reachedRange, this.targetRange, range );
    }
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