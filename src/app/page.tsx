// import styles from './page.module.css'
import About from './components/About'
import Search from './components/Search'

export default function Home() {
  return (
    <main>
      <About />
      <Search />
      <a href='https://github.com/SkylerA/streaming-countries' target="_blank" className='github'></a>
    </main>
  )
}
