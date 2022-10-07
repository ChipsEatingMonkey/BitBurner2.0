import { getServerInfo } from "./lib/lib";

/** @param {import(".").NS } ns **/
export async function main(ns) {
    let argLength = ns.args.length;
    if (argLength < 1){
        ns.tprint(" no Arguments given. Format: \nrun basic.js targetName");
        return;
    }
    let target = getServerInfo(ns, ns.args[0], true);
    ns.tprint(target.name, " has maxMoney of: ",target.maxMoney);
}