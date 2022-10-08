import { getServerInfo} from "./lib/lib";

/** @param {import(".").NS } ns **/
export async function main(ns) {
    if (ns.args.length < 2){
        ns.tprint(" no Arguments given. Format: \nrun basic.js hostName targetName");
        return;
    }
    let host = ns.args[0];
    let target = getServerInfo(ns, ns.args[1], false);
    freeThreads = Math.floor((ns.getServerMaxRam(host) - ns.getServerUsedRam(host)) / 1.75);
    ns.tprint("start growThreadFinder with ", + freeThreads + " Threads");
    while (target.minSecLevel != target.secLevel){
        let weakenPID = ns.exec("lib/weaken.js", host, freeThreads, target.name);
        while (ns.isRunning(weakenPID)){
            ns.sleep(1000); // untested
        }
    }
    let freeThreads = 0;
}