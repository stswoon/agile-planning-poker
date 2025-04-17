import fs from "node:fs";
import minimist from "minimist";


const argv = minimist(process.argv.slice(2));
if (argv["updatePatchVersion"]) {
    updatePatchVersion();
} else if (argv["copyStatics"]) {
    copyStatics();
}


function updatePatchVersion() {
    let packageJson = fs.readFileSync("package.json", "utf8");
    packageJson = JSON.parse(packageJson);
    let newVersion = packageJson.version.split(".");
    newVersion[2] = parseInt(newVersion[2], 10) + 1;
    newVersion = newVersion.join(".");
    packageJson.version = newVersion;
    packageJson = JSON.stringify(packageJson, null, 4) + "\n";
    fs.writeFileSync("package.json", packageJson, "utf8");

    let packageLockJson = fs.readFileSync("package-lock.json", "utf8");
    packageLockJson = JSON.parse(packageLockJson);
    packageLockJson.version = newVersion;
    packageLockJson.packages[""].version = newVersion;
    packageLockJson = JSON.stringify(packageLockJson, null, 4) + "\n";
    fs.writeFileSync("package-lock.json", packageLockJson, "utf8");
}

function copyStatics() {
    fs.cpSync("frontend/dist", "backend/dist/public", {recursive: true});
    // fs.cpSync("frontend/dist", "backend/public", {recursive: true});
}

