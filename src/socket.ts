import io from 'socket.io-client'

const api_url = process.env.REACT_APP_API_URL || `http://${window.location.hostname}:4949`

export default io(api_url)
