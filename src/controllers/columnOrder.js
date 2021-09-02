import axios from 'axios'

export async function LoadColumnOrder() {
    const res = await axios.get('http://localhost:5000/api/columnsorder')
    return res.data.order
}
