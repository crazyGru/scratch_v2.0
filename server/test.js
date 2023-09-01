const AdmZip = require("adm-zip");
const zip = new AdmZip("./test.zip");
zip.extractAllTo("dist");