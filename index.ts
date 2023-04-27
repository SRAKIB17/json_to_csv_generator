
import { mkdir, openSync, readFile, readFileSync, write } from 'fs'

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
export default json_to_csv
