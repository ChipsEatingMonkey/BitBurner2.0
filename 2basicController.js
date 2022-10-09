
/** @param {import(".").NS } ns **/
export async function main(ns) {
    if (ns.args.length < 3) {
        ns.tprint(" no Arguments given. Format: \nrun basic.js hostName targetName");
        return;
    }
    let host = ns.args[0];
    let target = ns.args[1];
    let freeThreads = ns.args[2];
    while (true) { 
    let moneyThresh = ns.getServerMaxMoney(target) * 0.75;
    let securityThresh = ns.getServerMinSecurityLevel(target) + 5;
    while(true) {
        if (ns.getServerSecurityLevel(target) > securityThresh) {
            ns.exec("/lib/weaken.js",ns.getHostname(),freeThreads,target);
            await ns.sleep(1000+Math.ceil(ns.getWeakenTime(target)));
        } else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
            ns.exec("/lib/grow.js",ns.getHostname(),freeThreads,target);
            await ns.sleep(1000+Math.ceil(ns.getGrowTime(target)));
        } else {
            ns.exec("/lib/hack.js",ns.getHostname(),Math.min(freeThreads,50),target);
            await ns.sleep(1000+Math.ceil(ns.getHackTime(target)));
            }
        }
    }
}