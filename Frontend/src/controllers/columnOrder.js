import axios from 'axios'

const BACKEND_COLUMNS_ORDER_URL = process.env.REACT_APP_BACKEND_URL + "/api/columnsorder"

export async function LoadColumnOrder() {
    const res = await axios.get(BACKEND_COLUMNS_ORDER_URL)
    return res.data.order
}
