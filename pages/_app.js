import Home from '.'
import '../styles/globals.css'

function MyApp({ pageProps }) {
  return (
    <div>
      <Home {...pageProps} />
    </div>
  )
}

export default MyApp
