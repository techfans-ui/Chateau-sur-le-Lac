import { useState } from 'react'
import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  Menu,
  Minus,
  Plus,
  Users,
  X,
} from 'lucide-react'
import './hotel.css'

const suites = [
  {
    name: 'Suite du Lac',
    detail: '2 hôtes · 42 m²',
    price: 'À partir de 480 €',
    image: '/suite-du-lac.jpg',
    amenities: 'Vue sur le lac · Lit king-size · Salle de bains privative',
  },
  {
    name: 'Suite des Cèdres',
    detail: '2 hôtes · 55 m²',
    price: 'À partir de 620 €',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=85',
    amenities: 'Vue sur les jardins · Lit king-size · Salon privé',
  },
]

const getToday = () => {
  const today = new Date()
  const offset = today.getTimezoneOffset()
  return new Date(today.getTime() - offset * 60000).toISOString().slice(0, 10)
}

const nightsBetween = (arrival: string, departure: string) => {
  const start = new Date(`${arrival}T00:00:00`)
  const end = new Date(`${departure}T00:00:00`)
  return Math.round((end.getTime() - start.getTime()) / 86400000)
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [guests, setGuests] = useState(2)
  const [confirmation, setConfirmation] = useState(false)
  const [arrival, setArrival] = useState(getToday())
  const [departure, setDeparture] = useState('')
  const [room, setRoom] = useState('Suite du Lac')
  const [currency, setCurrency] = useState<'EUR' | 'FCFA'>('EUR')
  const [guestName, setGuestName] = useState('')
  const [guestPhone, setGuestPhone] = useState('')
  const [guestEmail, setGuestEmail] = useState('')
  const [language, setLanguage] = useState<'fr' | 'en'>('fr')
  const [submitted, setSubmitted] = useState(false)
  const [consent, setConsent] = useState(false)
  const [dateError, setDateError] = useState('')

  const nights = nightsBetween(arrival, departure)

  const copy = language === 'fr'
    ? { arrival: 'Arrivée', departure: 'Départ', guests: 'Voyageurs', availability: 'Voir les disponibilités', reserve: 'Réserver', details: 'Préparer ma réservation', room: 'Chambre ou suite', name: 'Nom complet', phone: 'Téléphone', email: 'Email', payment: 'Paiement: Orange Money Burkina Faso', paymentCopy: 'Après votre demande, nous vous confirmerons la disponibilité et les instructions de paiement.', send: 'Envoyer la demande sur WhatsApp', sent: 'Votre demande est prête. Notre équipe vous répondra sur WhatsApp.', dateError: 'Choisissez une date de départ après la date d’arrivée.', consent: 'J’accepte d’être contacté pour confirmer la disponibilité et les modalités de paiement.', night: 'nuit', nights: 'nuits' }
    : { arrival: 'Check-in', departure: 'Check-out', guests: 'Guests', availability: 'Check availability', reserve: 'Book now', details: 'Prepare my reservation', room: 'Room or suite', name: 'Full name', phone: 'Phone', email: 'Email', payment: 'Payment: Orange Money Burkina Faso', paymentCopy: 'We will confirm availability and send payment instructions after your request.', send: 'Send request on WhatsApp', sent: 'Your request is ready. Our team will reply on WhatsApp.', dateError: 'Choose a check-out date after your check-in date.', consent: 'I agree to be contacted to confirm availability and payment details.', night: 'night', nights: 'nights' }

  const scrollToBooking = () => {
    document.querySelector('#reservation')?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const sendBooking = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!arrival || !departure || nightsBetween(arrival, departure) < 1) {
      setDateError(copy.dateError)
      return
    }
    setDateError('')
    setSubmitted(true)
    const message = `${copy.reserve} - Château sur le Lac\n${copy.name}: ${guestName}\n${copy.phone}: ${guestPhone}\n${copy.email}: ${guestEmail}\n${copy.room}: ${room}\nTarif: ${currency === 'FCFA' ? '25 000 FCFA / nuit' : 'Tarif en euros à confirmer'}\n${copy.arrival}: ${arrival}\n${copy.departure}: ${departure}\n${copy.guests}: ${guests}\nNuits: ${nights}`
    window.open(`https://wa.me/12542160899?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }

  const showAvailability = () => {
    if (!arrival || !departure || nightsBetween(arrival, departure) < 1) {
      setDateError(copy.dateError)
      setConfirmation(false)
      return
    }
    setDateError('')
    setConfirmation(true)
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#accueil" aria-label="Retour à l’accueil">
          <span className="brand-mark">CSL</span>
          <span className="brand-name">Château sur le Lac<small>Par Mille Océans · Banfora</small></span>
        </a>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Navigation principale">
          <a href="#chateau" onClick={() => setMenuOpen(false)}>Le Château</a>
          <a href="#suites" onClick={() => setMenuOpen(false)}>Suites</a>
          <a href="#experiences" onClick={() => setMenuOpen(false)}>Expériences</a>
          <a href="#table" onClick={() => setMenuOpen(false)}>La Table</a>
          <button className="nav-book" onClick={scrollToBooking}>{copy.reserve}</button>
        </nav>
        <button className="language-toggle" onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')} aria-label="Changer de langue">{language.toUpperCase()}</button>
        <button
          className={menuOpen ? 'menu-button open' : 'menu-button'}
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <section className="hero" id="accueil">
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow">Refuge confidentiel · Cascades de Banfora</p>
          <h1>L’élégance au bord <span>de l’infini</span></h1>
          <p className="hero-copy">
            Une demeure suspendue dans le temps où l’architecture minérale rencontre
            les eaux paisibles du lac et la douceur d’un art de vivre préservé.
          </p>
          <div className="hero-actions">
            <button className="hero-book" onClick={scrollToBooking}>{copy.reserve} · Planifier votre séjour</button>
            <a className="hero-discover" href="#chateau">Découvrir le domaine <ArrowRight size={16} /></a>
          </div>
        </div>
        <a className="scroll-cue" href="#reservation" aria-label="Descendre vers la réservation">
          <span>Explorer</span><ChevronDown size={18} />
        </a>
      </section>

      <section className="booking-wrap" id="reservation">
        <div className="booking-bar">
          <label>
            <span>{copy.arrival}</span>
            <span className="field-value"><CalendarDays size={18} /><input aria-label={copy.arrival} min={getToday()} type="date" value={arrival} onChange={(event) => { setArrival(event.target.value); setDateError('') }} /></span>
          </label>
          <label>
            <span>{copy.departure}</span>
            <span className="field-value"><CalendarDays size={18} /><input aria-label={copy.departure} min={arrival || getToday()} type="date" value={departure} onChange={(event) => { setDeparture(event.target.value); setDateError('') }} /></span>
          </label>
          <div className="guest-field">
            <span>{copy.guests}</span>
            <div className="guest-control">
              <Users size={18} />
              <button aria-label="Retirer un voyageur" onClick={() => setGuests(Math.max(1, guests - 1))}><Minus size={14} /></button>
              <strong>{guests}</strong>
              <button aria-label="Ajouter un voyageur" onClick={() => setGuests(Math.min(8, guests + 1))}><Plus size={14} /></button>
            </div>
          </div>
          <button className="availability" onClick={showAvailability}>{copy.availability}</button>
        </div>
        {dateError && <p className="date-error" role="alert">{dateError}</p>}
        {confirmation && (
          <div className="confirmation" role="status">
            <span>{copy.details}: {guests} {copy.guests.toLowerCase()}.</span>
            <button onClick={() => setConfirmation(false)} aria-label="Fermer"><X size={18} /></button>
          </div>
        )}
        {confirmation && (
          <form className="reservation-form" onSubmit={sendBooking}>
            <div className="form-heading"><div><p className="eyebrow dark">Château sur le Lac</p><h3>{copy.details}</h3></div><span className="payment-badge">Orange Money</span></div>
            <div className="form-grid">
              <label><span>{copy.name}</span><input required value={guestName} onChange={(event) => setGuestName(event.target.value)} /></label>
              <label><span>{copy.phone}</span><input required type="tel" value={guestPhone} onChange={(event) => setGuestPhone(event.target.value)} /></label>
              <label><span>{copy.email}</span><input required type="email" value={guestEmail} onChange={(event) => setGuestEmail(event.target.value)} /></label>
              <label><span>{copy.room}</span><select value={room} onChange={(event) => setRoom(event.target.value)}>{suites.map((suite) => <option key={suite.name}>{suite.name}</option>)}</select></label>
              <label><span>Tarif préféré</span><select value={currency} onChange={(event) => setCurrency(event.target.value as 'EUR' | 'FCFA')}><option value="EUR">Tarif en euros</option><option value="FCFA">25 000 FCFA / nuit</option></select></label>
            </div>
            <div className="booking-summary"><span>{room}</span><strong>{currency === 'FCFA' ? '25 000 FCFA / nuit' : `${nights} ${nights === 1 ? copy.night : copy.nights}`}</strong><span>{guests} {copy.guests.toLowerCase()}</span></div>
            <p className="payment-note"><strong>{copy.payment}</strong><br />{copy.paymentCopy}</p>
            <label className="consent"><input required type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} /><span>{copy.consent}</span></label>
            <button className="availability" type="submit" disabled={!consent}>{copy.send} <ArrowRight size={16} /></button>
            {submitted && <p className="form-success" role="status">{copy.sent}</p>}
          </form>
        )}
      </section>

      <section className="welcome">
        <p className="eyebrow dark">Par Mille Océans · Banfora</p>
        <h2>L’élégance au bord de l’infini</h2>
        <p className="welcome-copy">
          Une demeure confidentielle où le temps s’arrête, entre eaux calmes,
          jardins sauvages et art de vivre français.
        </p>
        <button className="text-link" onClick={scrollToBooking}>
          Découvrir le domaine <ArrowRight size={18} />
        </button>
      </section>

      <section className="manifesto" aria-label="Positionnement du Château">
        <p className="eyebrow dark">L’hospitalité</p>
        <h2>L’espace autrement.</h2>
        <p className="manifesto-specs">32,5 m² de confort <span>•</span> Vue sur le lac <span>•</span> Design contemporain</p>
        <p className="manifesto-copy">Une nouvelle génération d’hospitalité à Banfora.</p>
      </section>

      <section className="intro section" id="chateau">
        <div className="intro-title">
          <p className="eyebrow dark">Une adresse hors du temps</p>
          <h2>Un château.<br />Mille horizons.</h2>
        </div>
        <div className="intro-copy">
          <p>
            Posé sur la rive comme un secret bien gardé, le Château sur le Lac
            réunit l’intimité d’une maison de famille et l’excellence d’un hôtel d’exception.
          </p>
          <p>
            Ici, chaque fenêtre ouvre sur l’eau. Chaque saison dessine une nouvelle
            lumière. Et chaque séjour se compose selon vos envies.
          </p>
          <a className="text-link" href="#histoire">L’histoire du Château <ArrowRight size={18} /></a>
        </div>
      </section>

      <section className="history" id="histoire">
        <div className="history-image">
          <img src="/origine.jpg" alt="Les terres d’origine du domaine à Banfora, face au lac" />
          <img src="/construction.jpg" alt="Le domaine du Château sur le Lac en construction, au bord du lac" />
        </div>
        <div className="history-copy">
          <p className="eyebrow dark">L’histoire du domaine</p>
          <h2>Né au bord de l’eau</h2>
          <p>
            Sur les rives de Banfora, le domaine a pris forme pierre après pierre,
            face au lac et à sa fontaine. Palmiers, jardins et bâtisses de terre
            dessinent aujourd’hui un lieu où la nature et l’architecture se répondent.
          </p>
          <p>
            De ce chantier patient est né un refuge d’exception, pensé pour
            durer et pour épouser le paysage.
          </p>
        </div>
      </section>

      <section className="section suites-section" id="suites">
        <div className="section-heading">
          <div><p className="eyebrow dark">Dormir au Château</p><h2>Chambres & Suites</h2></div>
          <p>Des refuges baignés de lumière, imaginés pour contempler le lac dans un calme absolu.</p>
        </div>
        <div className="suite-grid">
          {suites.map((suite, index) => (
            <article className="suite-card" key={suite.name} style={{ animationDelay: `${index * 120}ms` }}>
              <div className="suite-image">{suite.image ? <img src={suite.image} alt={suite.name} /> : <span className="suite-placeholder">{suite.name}</span>}</div>
              <div className="suite-meta"><span>{suite.detail}</span><span>{suite.price}<br />25 000 FCFA / nuit</span></div>
              <h3>{suite.name}</h3>
              <details className="suite-details"><summary>Voir les équipements</summary><p>{suite.amenities}</p></details>
              <a href="#reservation" className="text-link">Découvrir <ArrowRight size={16} /></a>
            </article>
          ))}
        </div>
      </section>

      <section className="experience" id="experiences">
        <div className="experience-content">
          <p className="eyebrow">L’esprit des lieux</p>
          <h2>Vivre au rythme de l’eau</h2>
          <p>
            Lever du jour en barque, déjeuner dans les vignes, soin botanique ou
            baignade à la tombée du soleil. Nos concierges imaginent des instants rares,
            toujours ancrés dans la nature.
          </p>
          <a className="text-link light" href="#reservation">Composer mon séjour <ArrowRight size={18} /></a>
        </div>
      </section>

      <section className="section dining" id="table">
        <div className="dining-copy">
          <p className="eyebrow dark">La Table des Reflets</p>
          <h2>Le terroir,<br />en pleine lumière</h2>
          <p>
            Le chef célèbre les producteurs du rivage dans une cuisine précise et
            instinctive. Le menu évolue au fil des récoltes, des pêches et du jardin.
          </p>
          <a href="#reservation" className="text-link">Réserver une table <ArrowRight size={18} /></a>
          <p className="dining-note">Restaurant gastronomique · Ouvert du mardi au dimanche</p>
        </div>
        <div className="dining-image">
          <img
            src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=85"
            alt="Une table dressée dans une salle de restaurant lumineuse"
          />
        </div>
      </section>

      <section className="quote-section">
        <blockquote>« Un lieu qui ne cherche pas à impressionner, mais qui reste longtemps en mémoire. »</blockquote>
        <p>Émilie & Laurent · Paris</p>
      </section>

      <section className="section faq-section" id="faq">
        <div className="section-heading">
          <div><p className="eyebrow dark">Avant votre arrivée</p><h2>Questions fréquentes</h2></div>
          <p>Les informations essentielles pour préparer un séjour simple et serein.</p>
        </div>
        <div className="faq-list">
          <details><summary>Quand puis-je arriver et partir&nbsp;?</summary><p>Les horaires d’arrivée et de départ sont confirmés par notre équipe au moment de votre réservation.</p></details>
          <details><summary>Comment fonctionne la réservation&nbsp;?</summary><p>Envoyez votre demande via WhatsApp. Nous vérifions la disponibilité, puis vous transmettons les modalités de paiement et de confirmation.</p></details>
          <details><summary>Le restaurant est-il ouvert aux visiteurs extérieurs&nbsp;?</summary><p>La Table des Reflets accueille les visiteurs sur réservation, du mardi au dimanche, selon les disponibilités.</p></details>
          <details><summary>Comment venir au domaine&nbsp;?</summary><p>Le Château se trouve à Banfora, dans la région des Cascades. Utilisez le lien d’itinéraire dans la rubrique Nous trouver pour préparer votre arrivée.</p></details>
        </div>
      </section>

      <footer>
        <div className="footer-brand"><span className="brand-mark">CSL</span><h2>Château sur le Lac</h2><p>Par Mille Océans · Banfora</p></div>
        <div><h3>Nous trouver</h3><p>Banfora / Cascades</p><a href="https://maps.google.com/?q=Banfora%2C%20Cascades%2C%20Burkina%20Faso" target="_blank" rel="noreferrer">Voir l’itinéraire</a><a href="mailto:bonjour@chateausurlelac.fr">bonjour@chateausurlelac.fr</a><a href="https://wa.me/12542160899" target="_blank" rel="noreferrer">WhatsApp&nbsp;: +1 254 216 0899</a></div>
        <div><h3>Le Château</h3><a href="#suites">Chambres & Suites</a><a href="#experiences">Expériences</a><a href="#table">La Table</a><a href="#faq">FAQ</a></div>
        <div><h3>Suivez-nous</h3><a href="#instagram">Instagram</a><a href="#facebook">Facebook</a><a href="#newsletter">La Lettre du Lac</a></div>
        <div className="footer-bottom"><span>© 2026 Château sur le Lac</span><span>Mentions légales · Confidentialité</span></div>
      </footer>
    </main>
  )
}

export default App
