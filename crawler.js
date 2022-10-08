export async function main(ns) {
    let queue = ns.scan();
    let visited = new Set();
    let counter = queue.length;
    while (queue.length > 0){
        let host = queue.pop();

        if (!visited.has(host)){
            counter +=1;
            visited.add(host);
            let children = ns.scan(host);
            ns.tprint("Server: ", host, " has connections to: ", children);
            for (let child of children){
                queue.push(child);
                queue.unshift();
            }
        }
    }
    ns.tprint(counter, " server found");
}
