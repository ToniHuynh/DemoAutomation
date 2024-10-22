import * as fs from 'fs';
import * as path from 'path';


export default class JSONWriter {
    static writeJSON(category: string, productname: string, message: string): void {
        const absolutePath = path.resolve(__dirname, '../data/log.json')

        // Example: Log data (this could be any log you want to capture)
        const logData = {
            timestamp: new Date().toISOString(),
            category: category,
            product: productname,
            message: message,
        }

    // Read existing log data
    fs.readFile(absolutePath, 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            console.error(err)
            return
        }

        let logs = []
        if (data) {
            try {
                logs = JSON.parse(data)
            } catch (parseErr) {
                console.error('Error parsing JSON:', parseErr)
                return
            }
        }

        // Append new log data
        logs.push(logData)

        // Convert log data to JSON format
        const jsonData = JSON.stringify(logs, null, 2)
        fs.writeFile(absolutePath, jsonData, (writeErr) => {
            if (writeErr) {
                console.error(writeErr)
                return
            }
            console.log('Data written to log.json')
        })
    })
    }
}
