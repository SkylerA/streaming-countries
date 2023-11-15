import Image from 'next/image'
import styles from './page.module.css'
import Search from './components/Search'

export default function Home() {
  return (
    <main className={styles.main}>
      <Search></Search>
    </main>
  )
}
