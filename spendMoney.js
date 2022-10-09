/** @param {import(".").NS } ns **/
export async function main(ns) {
    
    let i = 1;
    let cost = 0;
    for (i = 1; i <= 20; i++) {
        cost = ns.getPurchasedServerCost(Math.pow(2, i));
        let player = ns.getPlayer();
        if (player.money < cost){
            i--;
            cost = ns.getPurchasedServerCost(Math.pow(2, i));
            break;
        }
    }
    let j = 0;
    while (ns.serverExists("pserv-"+j)){
        j++;
    }
    if (j == 26){
        ns.tprint("cant buy more servers");
        return;
    }
    let name = ns.purchaseServer("pserv-"+j, Math.pow(2, i));
    ns.tprint(cost/1000000, " mio bought for ",name," with GB: ", Math.pow(2, i));
}