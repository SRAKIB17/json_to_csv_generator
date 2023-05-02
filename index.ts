
import { close, mkdir, openSync, readFile, readFileSync, write, writeFile } from 'fs'

type JSONValue =
    | string
    | number
    | boolean
    | JSONObject
    | JSONArray;

interface JSONObject {
    [x: string]: JSONValue;
}

interface JSONArray extends Array<JSONValue> { }

function json_to_csv({ json, destination = '', file_name = 'test' }: { json: JSONArray, destination: string, file_name: string }) {
    try {
        let csvData = JSON.stringify(Object.keys(json?.[0]))?.slice(1, -1) + `
`
        for (const x of json) {
            csvData += JSON.stringify(Object.values(x))?.slice(1, -1) + `
`
        }

        const path = (Boolean(destination) ? (destination + '/') : "") + file_name + ".csv"
        const csvFile = openSync(path, 'w+')
        write(csvFile, csvData, function (err, result) {
            if (err) {
                return {
                    success: false, message: 'something is wrong'
                }
            }
            else {
                readFile(path, function (err, data) {
                    if (err) {
                        return {
                            success: false, message: 'something is wrong'
                        }
                    }
                    else {
                        console.log({
                            success: true, message: `successfully inserted into ${destination}/${file_name}.csv`,
                            data: data.toString()
                        })
                        close(csvFile, (err) => {
                            if (err)
                                console.error('Failed to close file', err);
                            else {
                                console.log("\n> File Closed successfully");
                            }
                        });
                        return {
                            success: true, message: `successfully inserted into ${destination}/${file_name}.csv`,
                            data: data.toString()
                        }
                    }
                });
            }
        })
    }
    catch (err) {
        if (err.errno == -4058) {
            return { success: false, message: 'no such file or directory' }
        }
        return {
            success: false, message: 'something is wrong'
        }
    }
}

function json_file_to_csv({ file_path = '', file_name, destination }: { file_path: string, file_name: string, destination: string }) {
    readFile(file_path, function (err, data) {
        if (err) {
            console.log(err)
            return {
                success: false, message: 'something is wrong'
            }
        }
        else {
            const json = JSON.parse(data?.toString())
            let csvData = JSON.stringify(Object.keys(json?.[0]))?.slice(1, -1) + `
`
            for (const x of json) {
                csvData += JSON.stringify(Object.values(x))?.slice(1, -1) + `
`
            }
            const path = `${destination}/${file_name}.csv`
            writeFile(path, csvData, { flag: 'w+' }, function (err) {
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
            }
            );

        }
    });
}

export { json_file_to_csv }
export default json_to_csv
