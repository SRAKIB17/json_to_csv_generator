"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        var csvFile = (0, fs_1.openSync)(path_1, 'w+');
        (0, fs_1.write)(csvFile, csvData, function (err, result) {
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
exports.default = json_to_csv;
