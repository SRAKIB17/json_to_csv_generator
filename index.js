"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.json_file_to_csv = void 0;
var fs_1 = require("fs");
function json_to_csv(_a) {
    var _b, _c;
    var json = _a.json, _d = _a.destination, destination = _d === void 0 ? '' : _d, _e = _a.file_name, file_name = _e === void 0 ? 'test' : _e;
    try {
        var csvData = ((_b = JSON.stringify(Object.keys(json === null || json === void 0 ? void 0 : json[0]))) === null || _b === void 0 ? void 0 : _b.slice(1, -1)) + "\n";
        for (var _i = 0, json_1 = json; _i < json_1.length; _i++) {
            var x = json_1[_i];
            csvData += ((_c = JSON.stringify(Object.values(x))) === null || _c === void 0 ? void 0 : _c.slice(1, -1)) + "\n";
        }
        var path_1 = (Boolean(destination) ? (destination + '/') : "") + file_name + ".csv";
        var csvFile_1 = (0, fs_1.openSync)(path_1, 'w+');
        (0, fs_1.write)(csvFile_1, csvData, function (err, result) {
            if (err) {
                return {
                    success: false, message: 'something is wrong'
                };
            }
            else {
                (0, fs_1.readFile)(path_1, function (err, data) {
                    if (err) {
                        return {
                            success: false, message: 'something is wrong'
                        };
                    }
                    else {
                        console.log({
                            success: true, message: "successfully inserted into ".concat(destination, "/").concat(file_name, ".csv"),
                            data: data.toString()
                        });
                        (0, fs_1.close)(csvFile_1, function (err) {
                            if (err)
                                console.error('Failed to close file', err);
                            else {
                                console.log("\n> File Closed successfully");
                            }
                        });
                        return {
                            success: true, message: "successfully inserted into ".concat(destination, "/").concat(file_name, ".csv"),
                            data: data.toString()
                        };
                    }
                });
            }
        });
    }
    catch (err) {
        if (err.errno == -4058) {
            return { success: false, message: 'no such file or directory' };
        }
        return {
            success: false, message: 'something is wrong'
        };
    }
}
function json_file_to_csv(_a) {
    var _b = _a.file_path, file_path = _b === void 0 ? '' : _b, file_name = _a.file_name, destination = _a.destination;
    (0, fs_1.readFile)(file_path, function (err, data) {
        var _a, _b;
        if (err) {
            console.log(err);
            return {
                success: false, message: 'something is wrong'
            };
        }
        else {
            var json = JSON.parse(data === null || data === void 0 ? void 0 : data.toString());
            var csvData = ((_a = JSON.stringify(Object.keys(json === null || json === void 0 ? void 0 : json[0]))) === null || _a === void 0 ? void 0 : _a.slice(1, -1)) + "\n";
            for (var _i = 0, json_2 = json; _i < json_2.length; _i++) {
                var x = json_2[_i];
                csvData += ((_b = JSON.stringify(Object.values(x))) === null || _b === void 0 ? void 0 : _b.slice(1, -1)) + "\n";
            }
            var path = "".concat(destination, "/").concat(file_name, ".csv");
            (0, fs_1.writeFile)(path, csvData, { flag: 'w+' }, function (err) {
                if (err)
                    console.error("Failed to close file", err);
                else {
                    console.log("File Closed successfully");
                    try {
                    }
                    catch (err) {
                        console.error("Cannot find stats of file", err);
                    }
                }
            });
        }
    });
}
exports.json_file_to_csv = json_file_to_csv;
exports.default = json_to_csv;
