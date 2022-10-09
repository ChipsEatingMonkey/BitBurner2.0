/** @param {import(".").NS } ns **/
export async function main(ns) {
    let queue = ns.scan();
    let visited = new Set();
    let rootedServers = new Set();
    let counter = queue.length;
    let scriptname = "2basicController.js";
    let target = ""; 
    if (ns.args.length > 0){
         target = ns.args[0];}
    while (queue.length > 0){
        let host = queue.pop();

        if (!visited.has(host)){
            counter +=1;
            visited.add(host);
            if (!ns.hasRootAccess(host)){
                try{
                    ns.brutessh(host);
                    ns.ftpcrack(host);
                    ns.httpworm(host);
                    ns.relaysmtp(host);
                    ns.sqlinject(host);
                }
                catch(e){}
                try{
                    ns.nuke(host);
                }
                catch(e){}
                
            }
            let files=["2basicController.js","startController.js","/lib/lib.js","/lib/grow.js","/lib/weaken.js","/lib/hack.js"]; 
            ns.scp(files, host);
            let children = ns.scan(host);
            ns.print("Server: ", host, " has connections to: ", children);
            ns.print("Server: ", host, " has hackAnalyze *100: ", ns.hackAnalyze(host)*100);
            for (let child of children){
                queue.push(child);
                queue.unshift();
            }
        }
    }
    if (ns.args.length > 0){
        let costPerS = 1.75;//ns.getScriptRam(scriptname);
        let totalThreads= 0;
        let totalRam = 0;
        visited.forEach( host =>
            {
                if (host != "home"){
                    ns.killall(host);
                }
                totalRam += ns.getServerMaxRam(host);
                let usableRam = ns.getServerMaxRam(host) - ns.getScriptRam(scriptname);
                let threads = Math.floor(usableRam/costPerS);
               
                if (threads > 0){
                    if (ns.hasRootAccess(host)){
                        totalThreads+= threads;
                        ns.print(host, " with ", threads, " threads");
                        rootedServers.add([host,threads]);
                        
                    }
                   
                }
            }
        );
        ns.tprint(rootedServers.size, " servers have root with total threads of: ", totalThreads, " and RAM GB: ",totalRam );
        let timing = Math.floor(ns.getWeakenTime(target)/rootedServers.size);
        ns.tprint((timing/1000).toFixed(2), " secs is the time deplay between servers");
            for (let pair of rootedServers){
            ns.exec(scriptname, pair[0], 1, pair[0], target, pair[1]); //ns.exec(scriptname, host, threads, host, target, threads);
            await ns.sleep(timing);
            }
       
        
    }
    ns.tprint(counter, " server found");
}
