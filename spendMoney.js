/** @param {import(".").NS } ns **/
export async function main(ns) {
    
    let i = 1;
    for (i = 1; i <= 20; i++) {
        let cost = ns.getPurchasedServerCost(Math.pow(2, i));
        let player = ns.getPlayer();
        if (player.money < cost){
            i--;
            break;
        }
    }
    let name = ns.purchaseServer("foo-"+i, Math.pow(2, i));
    ns.tprint("name of new server: ", name);
}