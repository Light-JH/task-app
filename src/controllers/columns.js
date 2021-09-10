import axios from 'axios'

export async function LoadColumns() {
    const res = await axios.get('http://localhost:5000/api/columns')
    const columns = {}
    for (const column of res.data) {
        columns[column.id] = column
    }
    return columns
}

export async function UpdateColumn(column) {
    await axios.put('http://localhost:5000/api/columns', column)
}
