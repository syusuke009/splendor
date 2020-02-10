import { Player } from '../player';
import { Tips } from '../tips';
import { Card } from '../card';
import { Tile } from '../tile';

export class OperationLogList {
    
    logs: OperationLog[] = [];

    clear() {
        this.logs = [];
    }

    getActiveLog(): OperationLog {
        return this.logs[0];
    }
}

export class OperationLog {

    round: number;
    player: Player;
    actions: OperationLogAction[] = [];
    constructor(round: number, player: Player){
        this.round = round;
        this.player = player;
    }
}

export interface OperationLogAction {
    type: number;
}

enum ActionType {
    GET_THREE_KIND_TIP = 10,
    GET_SINGLE_KIND_TIP = 11,
    PURCHASE_CARD = 20,
    RESERVE_PUBLIC_CARD = 30,
    RESERVE_UNPUBLISHED_CARD = 31,
    VISIT_NOBLE = 110,
    RELEASE_TIP = 120
}

export namespace OperationLogAction {
    
    export class GetThreeKindTipAction implements OperationLogAction {

        type: number = ActionType.GET_THREE_KIND_TIP;
        
        constructor(private tips: Tips)  { }      
        
    }
    
    export class GetSingleKindTipAction implements OperationLogAction {

        type: number = ActionType.GET_SINGLE_KIND_TIP;
        
        constructor(private tips: Tips)  { }      
        
    }
    
    export class PurchaseCardAction implements OperationLogAction {

        type: number = ActionType.PURCHASE_CARD;
        
        constructor(private card: Card, private paid: Tips)  { }      
        
    }
    
    export class ReservePublicCardAction implements OperationLogAction {

        type: number = ActionType.RESERVE_PUBLIC_CARD;
        
        constructor(private card: Card, private isGotGold: boolean)  { }      
        
    }
    
    export class ReserveUnpublishedCardAction implements OperationLogAction {

        type: number = ActionType.RESERVE_UNPUBLISHED_CARD;
        
        constructor(private card: Card, private isGotGold: boolean)  { }      
        
    }
    
    export class VisitNobleAction implements OperationLogAction {

        type: number = ActionType.VISIT_NOBLE;
        
        constructor(private noble: Tile)  { }      
        
    }
    
    export class ReleaseTipAction implements OperationLogAction {

        type: number = ActionType.RELEASE_TIP;
        
        constructor(private tips: Tips)  { }      
        
    }
}