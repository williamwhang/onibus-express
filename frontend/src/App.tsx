import { Container } from './components/Container'
import { Header } from './components/Header'
import { SearchCard } from './components/SearchCard'

function App() {
  return (
    <div className="app-shell">
      <Header />
      <main>
        <section className="hero-section">
          <Container className="hero-content">
            <h1>Reserve sua passagem de ônibus</h1>
            <p>Compare horários e preços das melhores empresas do Brasil</p>
          </Container>
        </section>

        <section className="search-section">
          <Container>
            <div className="search-card-wrapper">
              <SearchCard />
            </div>
            <div className="results-area" aria-label="Área de resultados" />
          </Container>
        </section>
      </main>
    </div>
  )
}

export default App
