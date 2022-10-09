import { getServerInfo } from "./lib/lib";
/** @param {import(".").NS } ns **/
export async function main(ns) {

    if (ns.args.length < 1){
        ns.tprint(" no Arguments given. Format: \nrun viewer.js hostName targetName pid");
        return;
    }
    let host = ns.args[1];
    let target = ns.args[0];
    let pid = ns.args[2];
    ns.disableLog("ALL");
    ns.resizeTail(600,300);
    while (true){
        ns.clearLog();
        let logsize = 20;
        let server = getServerInfo(ns,target, false);
        let serverMoney= ((server.money/1000000).toFixed(2)+" mio").padEnd(logsize);
        let moneyOfMax = (((server.money/server.maxMoney)*100).toFixed(2) + " %").padEnd(logsize);
        let secOverMin = (server.secLevel - server.minSecLevel).toFixed(2).padEnd(logsize);
        let secOverMinPercent = (((server.secLevel - server.minSecLevel)/server.minSecLevel)*100).toFixed(2).padEnd(logsize);
        ns.print("=".padEnd(logsize +20,'-')+"=");
        ns.print("|"+" Server Name".padEnd(15)+"|   "+server.name.padEnd(logsize)+"|");
        ns.print("|"+" Money".padEnd(15)+"|   "+serverMoney+"|");
        ns.print("|"+" Sec over Min".padEnd(15)+"|   "+secOverMin+"|");
        ns.print("|"+" Sec over Min %".padEnd(15)+"|   "+secOverMinPercent+"|");
        ns.print("|"+" Money of Max".padEnd(15)+"|   "+moneyOfMax+"|");
        ns.print("|"+" WeakenTime ".padEnd(15)+"|   "+(ns.getWeakenTime(target)/1000).toFixed(2).padEnd(logsize)+"|");
        ns.print("|"+" GrowTime ".padEnd(15)+"|   "+(ns.getGrowTime(target)/1000).toFixed(2).padEnd(logsize)+"|");
        ns.print("|"+" HackTime ".padEnd(15)+"|   "+(ns.getHackTime(target)/1000).toFixed(2).padEnd(logsize)+"|");
        ns.print("=".padEnd(logsize +20,'-')+"=");
        await ns.sleep(1000);
    }
}