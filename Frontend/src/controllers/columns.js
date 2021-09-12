import axios from 'axios'

const BACKEND_COLUMNS_URL = process.env.REACT_APP_BACKEND_URL + "/api/columns"

export async function LoadColumns() {
    const res = await axios.get(BACKEND_COLUMNS_URL)
    const columns = {}
    for (const column of res.data) {
        columns[column.id] = column
    }
    return columns
}

export async function UpdateColumn(column) {
    await axios.put(BACKEND_COLUMNS_URL, column)
}
