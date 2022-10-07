/** @param {import(".").NS } ns **/
export async function main(ns) {
    if (ns.args.length < 1){
        ns.tprint(" no Arguments given. Format: \nrun basic.js src dest");
        return;
    }
    let  home = "home";
    let files=["basicController.js","/lib/lib.js","/lib/grow.js","/lib/weaken.js","/lib/hack.js"];
    if (ns.args.length == 2){
       home = ns.args[0];
       ns.scp(files,ns.args[1], home);
       return;
    }
    ns.scp(files,ns.args[0], home);
}