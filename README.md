# Version: 1.1.2

```
npm i json_to_csv_generate
```

## Configure

| parameter   | Description                                                              |
| ----------- | ------------------------------------------------------------------------ |
| json        | pass json array                                                          |
| destination | Default `root folder`. You can pass destination like `csv/test` or `csv` |
| file_name   | file name of csv file. Default file name `test`                          |

## Return data

Note:  It is work with node filesystem. Work with backend site

| success | Description                                                                                                                      |
| ------- | -------------------------------------------------------------------------------------------------------------------------------- |
| false   | `{success: false, message: 'no such file or directory'}`                                                                         |
| false   | `{success: false, message: 'Something is wrong'}` . Its mean something is wrong in your project                                  |
| success | `{success: true, message: 'successfully inserted into destination}/file_name.csv, data: data.....}` . Here data is csv file data |  |

<b> data:</b>

```csv
"name","age","phone","test"
"Y",534534,1835434,true
"X",534534,5435355,true

```

``` javascript

const json = [
    {
        name: 'Y',
        age: 534534,
        phone: 1835434,
        test: true,
    },
    {
        name: 'X',
        age: 534534,
        phone: 5435355,
        test: true,
    }
]
const test = json_to_csv({ json: json, destination: 'test', file_name: 'test' })

```
