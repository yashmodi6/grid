const { execSync } = require("child_process");

const platform = process.platform;
const arch = process.arch;

console.log(`[postinstall] platform=${platform}, arch=${arch}`);

try {
    // Android (Termux)
    if (platform === "android" && arch === "arm64") {
        console.log("[postinstall] Installing lightningcss.android-arm64.node");
        execSync("npm install lightningcss.android-arm64.node", {
            stdio: "inherit",
        });
    }
} catch (err) {
    console.warn("[postinstall] Optional dependency failed, continuing...");
}
