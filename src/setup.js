const path = require("path"),
  FS = require("fs");

const base = path.resolve("./").replaceAll("\\", "/").toLowerCase();
const dist = `${base}/dist`;

if (!FS.existsSync(`${dist}`)) {
  FS.mkdirSync(`${dist}`);
}
if (!FS.existsSync(`${dist}/patterns`)) {
  FS.mkdirSync(`${dist}/patterns`, { recursive: true });
}
if (!FS.existsSync(`${dist}/annotations`)) {
  FS.mkdirSync(`${dist}/annotations`, { recursive: true });
}
