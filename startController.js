/** @param {import(".").NS } ns **/
export async function main(ns) {
    if (ns.args.length < 2) {
        ns.tprint(" no Arguments given. Format: \nrun basic.js hostName targetName");
        return;
    }
    let host = ns.args[0];
    let target = ns.args[1];
    let freeThreads = Math.floor(((ns.getServerMaxRam(host) - ns.getServerUsedRam(host))) / 2.4); // 2.5 is memcost of basicController.js
    ns.exec("basicController.js", host, freeThreads, host, target, freeThreads);
}