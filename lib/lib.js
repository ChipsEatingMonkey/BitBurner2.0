/** @param {import("..").NS } ns **/
export function getServerInfo(ns, name, tprint) {
    let target = new Object();
    target.name = name;
   // ns.disableLog("ALL");
    //target.growth = ns.getServerGrowth(target.name);
    target.money = ns.getServerMoneyAvailable(target.name);
    target.maxMoney = ns.getServerMaxMoney(target.name);
    target.maxRam = ns.getServerMaxRam(target.name);
    target.secLevel = ns.getServerSecurityLevel(target.name);
    target.minSecLevel = ns.getServerMinSecurityLevel(target.name);
   // target.reqHackLevel = ns.getServerRequiredHackingLevel(target.name);
    if (tprint === true){
        ns.tprint(target)
    }
    return target;
}
