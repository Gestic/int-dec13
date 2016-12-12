module.exports = {
    name: 'hopper',
    run: function(creep) {
        // Assign next Action
        let oldTargetId = creep.data.targetId;
        if( creep.action == null || ['hopping'].includes(creep.action.name)) {
            this.nextAction(creep);
        }
        if( creep.data.targetId != oldTargetId ) {
            delete creep.data.path;
        }
        // Do some work
        if( creep.action && creep.target ) {
            creep.action.step(creep);
        } else {
            //creep.action.work(creep);
            logError('Creep without action/activity!\nCreep: ' + creep.name + '\ndata: ' + JSON.stringify(creep.data));
        }
    },
    nextAction: function(creep){
       //var priority = [];
       /* let priority = [
            Creep.action.healing,
            Creep.action.hopping,
            //Creep.action.healing,
            Creep.action.idle
        ];*/
        
        let priority = [
            //Creep.action.travelling,
            Creep.action.hopping,
            Creep.action.healing,
            Creep.action.healing,
            Creep.action.idle
        ];
        
        /*
        if(creep.hits === creep.hitsMax){
            priority = [
                Creep.action.hopping
            ];
            console.log('b');
        }
        if(creep.hits < (creep.hitsMax-50)){
            priority = [

                Creep.action.healing
            ];
            console.log('a');
        }
        */
        
        console.log(creep.hits + ' / ' + creep.hitsMax);
        for(var iAction = 0; iAction < priority.length; iAction++) {
            var action = priority[iAction];
            if(action.isValidAction(creep) &&
                action.isAddableAction(creep) &&
                action.assign(creep)) {
                    return;
            }
        }
    }
}