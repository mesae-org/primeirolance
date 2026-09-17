import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { supabase } from './lib/supabase'
import './App.css'

type View = 'landing' | 'login' | 'onboarding' | 'dashboard'

type Opportunity = {
  id: string
  objeto: string
  orgao_nome: string | null
  municipio: string | null
  uf: string | null
  modalidade: string | null
  valor_estimado: number | null
  data_abertura: string | null
  data_encerramento: string | null
}

const fallbackOpportunities: Opportunity[] = [
  { id: 'demo-1', objeto: 'Equipamentos de proteção individual', orgao_nome: 'Prefeitura de Maringá', municipio: 'Maringá', uf: 'PR', modalidade: 'Pregão eletrônico', valor_estimado: 18400, data_abertura: null, data_encerramento: null },
  { id: 'demo-2', objeto: 'Óculos de proteção e acessórios', orgao_nome: 'Hospital Municipal de Sarandi', municipio: 'Sarandi', uf: 'PR', modalidade: 'Dispensa eletrônica', valor_estimado: 9800, data_abertura: null, data_encerramento: null },
  { id: 'demo-3', objeto: 'Calçados de segurança', orgao_nome: 'Prefeitura de Campo Mourão', municipio: 'Campo Mourão', uf: 'PR', modalidade: 'Pregão eletrônico', valor_estimado: 32000, data_abertura: null, data_encerramento: null },
]


function OpportunityDetail({ opportunity, isSaved, onToggleSaved, onBack }: { opportunity: Opportunity; isSaved: boolean; onToggleSaved: () => void; onBack: () => void }) {
  const [checkedItems, setCheckedItems] = useState<string[]>(['understand'])
  const checklist = [['understand', 'Entender a oportunidade', 'Resumo e requisitos conferidos'], ['products', 'Conferir se seus produtos atendem', 'Verifique CA, quantidade e especificações técnicas'], ['documents', 'Separar documentação', 'Documentos exigidos pelo edital'], ['proposal', 'Preparar proposta', 'Valores e condições de entrega'], ['session', 'Acessar o portal da disputa', 'Data e horário da sessão']]

  function toggleItem(id: string) {
    setCheckedItems((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  return <main className="detail-page"><nav className="dashboard-nav"><button className="brand brand-button" onClick={onBack}><span className="brand-mark" aria-hidden="true">+</span><span>primeiro lance</span></button><span className="detail-nav-label">Detalhe da oportunidade</span></nav><div className="detail-shell"><button className="back-link" onClick={onBack}>← Voltar para oportunidades</button><header className="detail-hero"><div><p className="eyebrow">Alta compatibilidade</p><h1>{opportunity.objeto}</h1><p className="detail-location">{opportunity.orgao_nome || 'Órgão não informado'} <span>·</span> {opportunity.municipio || 'Município não informado'}, {opportunity.uf || '--'}</p></div><div className="detail-value"><strong>{opportunity.valor_estimado?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }) || 'Não informado'}</strong><span>valor estimado</span><button className={`save-button ${isSaved ? 'save-button-active' : ''}`} onClick={onToggleSaved}>{isSaved ? '★ Salva' : '☆ Salvar oportunidade'}</button></div></header><div className="detail-grid"><div className="detail-main"><section className="detail-section"><p className="eyebrow">Por que apareceu para você</p><h2>Esta oportunidade combina com o seu começo.</h2><div className="reason-list"><div><span>✓</span><p><strong>Produto compatível</strong><br />Encontramos itens relacionados às categorias do seu perfil.</p></div><div><span>✓</span><p><strong>Região dentro do alcance</strong><br />A entrega acontece em uma área que você informou atender.</p></div><div><span>!</span><p><strong>Confirme os requisitos técnicos</strong><br />A compatibilidade é uma indicação, não uma garantia de habilitação.</p></div></div></section><section className="detail-section"><p className="eyebrow">Informações da oportunidade</p><div className="detail-facts"><div><span>Modalidade</span><strong>{opportunity.modalidade || 'Não informada'}</strong></div><div><span>Local</span><strong>{opportunity.municipio || 'Não informado'} / {opportunity.uf || '--'}</strong></div><div><span>Data da disputa</span><strong>{opportunity.data_abertura ? new Date(opportunity.data_abertura).toLocaleDateString('pt-BR') : 'A confirmar'}</strong></div><div><span>Entrega</span><strong>Verificar no edital</strong></div></div></section><section className="detail-section attention-section"><p className="eyebrow">Pontos de atenção</p><div className="attention-row"><span>!</span><div><strong>Requisitos técnicos precisam ser conferidos</strong><p>Verifique CA, quantidade, prazo de entrega e documentação antes de preparar uma proposta.</p></div></div></section></div><aside className="checklist-panel"><p className="eyebrow">Seu caminho</p><h2>Próximos passos</h2>{checklist.map(([id, title, description]) => <button className={`checklist-row ${checkedItems.includes(id) ? 'checklist-row-done' : ''}`} key={id} onClick={() => toggleItem(id)}><span className="check-box">{checkedItems.includes(id) ? '✓' : ''}</span><span><strong>{title}</strong><small>{description}</small></span></button>)}<a className="source-link" href={opportunity.id.startsWith('demo-') ? '#fonte-oficial' : '#fonte-oficial'}>Abrir fonte oficial <span aria-hidden="true">↗</span></a></aside></div></div></main>
}
const productCategories = ['Luvas', 'Óculos de proteção', 'Capacetes', 'Protetores auriculares', 'Calçados de segurança', 'Respiradores', 'Máscaras', 'Vestimentas']

function Onboarding({ onComplete, onSignOut }: { onComplete: () => void; onSignOut: () => void }) {
  const [companyName, setCompanyName] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [city, setCity] = useState('')
  const [uf, setUf] = useState('PR')
  const [radius, setRadius] = useState('100')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [error, setError] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  function toggleCategory(category: string) {
    setSelectedCategories((current) => current.includes(category) ? current.filter((item) => item !== category) : [...current, category])
  }

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    if (selectedCategories.length === 0) {
      setError('Selecione pelo menos um produto para encontrar oportunidades relevantes.')
      return
    }
    if (!supabase) { onComplete(); return }

    setIsSaving(true)
    const { data: userData } = await supabase.auth.getUser()
    const user = userData.user
    if (!user) { setError('Sua sessão expirou. Entre novamente.'); setIsSaving(false); return }

    const { data: company, error: companyError } = await supabase.from('companies').insert({ owner_user_id: user.id, cnpj, nome_fantasia: companyName, cidade: city, uf, raio_entrega_km: Number(radius) }).select('id').single()
    if (companyError || !company) { setError(companyError?.message || 'Não foi possível salvar sua empresa.'); setIsSaving(false); return }

    const { data: categories } = await supabase.from('product_categories').select('id,name').in('name', selectedCategories)
    const products = (categories || []).map((category) => ({ company_id: company.id, category_id: category.id, name: category.name, description: category.name }))
    if (products.length > 0) await supabase.from('products').insert(products)
    setIsSaving(false)
    onComplete()
  }

  return <main className="onboarding-page"><nav className="dashboard-nav"><span className="brand"><span className="brand-mark" aria-hidden="true">+</span><span>primeiro lance</span></span><button className="text-button" onClick={onSignOut}>Sair</button></nav><div className="onboarding-shell"><p className="eyebrow">Vamos começar pelo essencial</p><h1>Conte o que sua empresa já sabe vender.</h1><p className="onboarding-lead">Com essas respostas, vamos encontrar oportunidades mais próximas da sua realidade.</p><form className="onboarding-form" onSubmit={handleSave}><div className="form-grid"><label>Nome da empresa<input value={companyName} onChange={(event) => setCompanyName(event.target.value)} placeholder="Como seus clientes conhecem você?" required /></label><label>CNPJ<input value={cnpj} onChange={(event) => setCnpj(event.target.value)} placeholder="00.000.000/0001-00" required /></label><label>Cidade<input value={city} onChange={(event) => setCity(event.target.value)} placeholder="Ex.: Maringá" required /></label><label>UF<select value={uf} onChange={(event) => setUf(event.target.value)}><option>PR</option><option>SP</option><option>SC</option><option>RS</option><option>MS</option></select></label><label>Raio de entrega<input type="number" min="0" value={radius} onChange={(event) => setRadius(event.target.value)} /><small>quilômetros a partir da sua empresa</small></label></div><fieldset><legend>O que você vende?</legend><div className="category-grid">{productCategories.map((category) => <button type="button" className={`category-option ${selectedCategories.includes(category) ? 'category-option-selected' : ''}`} key={category} onClick={() => toggleCategory(category)}><span>{selectedCategories.includes(category) ? '✓' : '+'}</span>{category}</button>)}</div></fieldset>{error && <p className="form-error" role="alert">{error}</p>}<button className="button button-primary onboarding-submit" type="submit" disabled={isSaving}>{isSaving ? 'Salvando...' : 'Ver minhas oportunidades'} <span aria-hidden="true">↗</span></button></form></div></main>
}

function Dashboard({ onSignOut }: { onSignOut: () => void }) {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(fallbackOpportunities)
  const [isLoading, setIsLoading] = useState(Boolean(supabase))
  const [isUsingDemoData, setIsUsingDemoData] = useState(true)
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null)
  const [savedOpportunityIds, setSavedOpportunityIds] = useState<string[]>(() => JSON.parse(localStorage.getItem('primeiro-lance:saved-opportunities') || '[]'))

  useEffect(() => {
    if (!supabase) return

    let isMounted = true
    supabase
      .from('opportunities')
      .select('id,objeto,orgao_nome,municipio,uf,modalidade,valor_estimado,data_abertura,data_encerramento')
      .order('data_publicacao', { ascending: false })
      .limit(10)
      .then(({ data, error }) => {
        if (!isMounted) return
        if (!error && data && data.length > 0) {
          setOpportunities(data as Opportunity[])
          setIsUsingDemoData(false)
        }
        setIsLoading(false)
      })

    return () => { isMounted = false }
  }, [])

  const formatValue = (value: number | null) => value === null ? 'Valor não informado' : value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })

  function toggleSaved(opportunityId: string) {
    setSavedOpportunityIds((current) => {
      const next = current.includes(opportunityId) ? current.filter((id) => id !== opportunityId) : [...current, opportunityId]
      localStorage.setItem('primeiro-lance:saved-opportunities', JSON.stringify(next))
      return next
    })
  }

  if (selectedOpportunity) return <OpportunityDetail opportunity={selectedOpportunity} isSaved={savedOpportunityIds.includes(selectedOpportunity.id)} onToggleSaved={() => toggleSaved(selectedOpportunity.id)} onBack={() => setSelectedOpportunity(null)} />

  return (
    <main className="dashboard-page">
      <nav className="dashboard-nav" aria-label="Navegação do painel">
        <span className="brand"><span className="brand-mark" aria-hidden="true">+</span><span>primeiro lance</span></span>
        <div className="dashboard-nav-actions"><span className="user-chip">Sua empresa</span><button className="text-button" onClick={onSignOut}>Sair</button></div>
      </nav>
      <div className="dashboard-shell">
        <header className="dashboard-header">
          <div><p className="eyebrow">Seu ponto de partida</p><h1>Bom dia, fornecedor.</h1><p>{isLoading ? 'Buscando oportunidades para o seu perfil.' : 'Encontramos oportunidades que combinam com o que você já vende.'}</p></div>
          <button className="button button-primary">Atualizar oportunidades <span aria-hidden="true">↗</span></button>
        </header>
        <section className="dashboard-stats" aria-label="Resumo das oportunidades">
          <div><strong>{isLoading ? '...' : opportunities.length}</strong><span>novas oportunidades</span></div><div><strong>{savedOpportunityIds.length}</strong><span>salvas por você</span></div><div><strong>1</strong><span>ponto de atenção</span></div>
        </section>
        <section className="opportunity-list" aria-labelledby="opportunities-title">
          <div className="section-heading"><div><p className="eyebrow">Para você</p><h2 id="opportunities-title">Oportunidades compatíveis</h2></div><button className="filter-button">Mais recentes <span aria-hidden="true">⌄</span></button></div>
          {isUsingDemoData && <p className="data-note">Mostrando oportunidades de demonstração enquanto o PNCP ainda não tem dados sincronizados.</p>}
          {opportunities.map((opportunity, index) => <article className={`dashboard-opportunity ${index === 0 ? 'dashboard-opportunity-featured' : ''}`} key={opportunity.id}><div className={`opportunity-status ${index === 2 ? 'opportunity-status-alert' : index === 1 ? 'opportunity-status-warm' : ''}`}><span className="status-dot"></span>{index === 2 ? 'Verificar antes' : index === 1 ? 'Boa compatibilidade' : 'Alta compatibilidade'}</div><div className="opportunity-content"><div><h3>{opportunity.objeto}</h3><p>{opportunity.orgao_nome || 'Órgão não informado'} <span>·</span> {opportunity.municipio || 'Município não informado'}, {opportunity.uf || '--'}</p></div><strong className="opportunity-value">{formatValue(opportunity.valor_estimado)}</strong></div><div className="opportunity-meta"><span>{opportunity.modalidade || 'Modalidade não informada'}</span><span>{opportunity.data_abertura ? `Abertura: ${new Date(opportunity.data_abertura).toLocaleDateString('pt-BR')}` : 'Data a confirmar'}</span><button className="list-action" onClick={() => setSelectedOpportunity(opportunity)}>Ver oportunidade <span aria-hidden="true">↗</span></button></div></article>)}
        </section>
      </div>
    </main>
  )
}

function App() {
  const [view, setView] = useState<View>('landing')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [authError, setAuthError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!supabase) return

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setView('onboarding')
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setView(session ? 'onboarding' : 'landing')
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  function openLogin() {
    setSubmitted(false)
    setAuthError('')
    setView('login')
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(false)
    setAuthError('')

    if (!supabase) {
      setAuthError('Configure o Supabase para ativar o login.')
      return
    }

    setIsLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setIsLoading(false)

    if (error) {
      setAuthError(error.message)
      return
    }

    setSubmitted(true)
    setView('onboarding')
  }

  async function handleGoogleLogin() {
    setSubmitted(false)
    setAuthError('')

    if (!supabase) {
      setAuthError('Configure o Supabase para ativar o login com Google.')
      return
    }

    setIsLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    })

    if (error) {
      setIsLoading(false)
      setAuthError(error.message)
    }
  }

  async function handleSignOut() {
    if (supabase) await supabase.auth.signOut()
    setView('landing')
  }

  if (view === 'dashboard') return <Dashboard onSignOut={handleSignOut} />
  if (view === 'onboarding') return <Onboarding onComplete={() => setView('dashboard')} onSignOut={handleSignOut} />

  if (view === 'login') {
    return (
      <main className="login-page">
        <div className="login-frame">
          <button className="brand brand-button" onClick={() => setView('landing')}>
            <span className="brand-mark" aria-hidden="true">+</span>
            <span>primeiro lance</span>
          </button>

          <section className="login-card" aria-labelledby="login-title">
            <div className="login-intro">
              <p className="eyebrow">Bem-vindo de volta</p>
              <h1 id="login-title">Continue de onde parou.</h1>
              <p>Entre para ver oportunidades que combinam com o que sua empresa já vende.</p>
            </div>

            <button className="button google-button" type="button" onClick={handleGoogleLogin} disabled={isLoading}>
              <span className="google-mark" aria-hidden="true">G</span>
              Continuar com Google
            </button>
            <div className="form-divider"><span>ou entre com e-mail</span></div>

            <form className="login-form" onSubmit={handleSubmit}>
              <label htmlFor="email">E-mail</label>
              <input id="email" type="email" autoComplete="email" placeholder="voce@empresa.com.br" value={email} onChange={(event) => setEmail(event.target.value)} required />
              <div className="label-row">
                <label htmlFor="password">Senha</label>
                <button type="button" className="text-button">Esqueci minha senha</button>
              </div>
              <input id="password" type="password" autoComplete="current-password" placeholder="Sua senha" value={password} onChange={(event) => setPassword(event.target.value)} required />
              <button className="button button-primary login-submit" type="submit" disabled={isLoading}>{isLoading ? 'Entrando...' : 'Entrar'} <span aria-hidden="true">↗</span></button>
              {submitted && <p className="form-feedback" role="status">Login realizado. O dashboard entra na próxima etapa.</p>}
              {authError && <p className="form-error" role="alert">{authError}</p>}
            </form>

            <p className="login-footer">Ainda não tem uma conta? <button className="text-button" onClick={() => setView('landing')}>Conheça o Primeiro Lance</button></p>
          </section>
        </div>
        <aside className="login-aside">
          <div className="aside-note">Mercado público, sem o labirinto.</div>
          <div className="aside-stamp">01<span>/</span>começo</div>
          <p>Uma leitura mais simples da oportunidade certa para dar o próximo passo.</p>
        </aside>
      </main>
    )
  }

  return (
    <main className="landing-page">
      <nav className="site-nav" aria-label="Navegação principal">
        <button className="brand brand-button" onClick={() => setView('landing')}>
          <span className="brand-mark" aria-hidden="true">+</span>
          <span>primeiro lance</span>
        </button>
        <div className="nav-actions">
          <a href="#como-funciona">Como funciona</a>
          <button className="button button-outline" onClick={openLogin}>Entrar</button>
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Para quem está começando</p>
          <h1>O governo já compra. <em>Você só precisa encontrar o seu primeiro lance.</em></h1>
          <p className="hero-description">O Primeiro Lance encontra oportunidades de EPI que combinam com os seus produtos e traduz o edital para uma linguagem que dá para usar.</p>
          <div className="hero-actions">
            <button className="button button-primary" onClick={openLogin}>Encontrar minhas oportunidades <span aria-hidden="true">↗</span></button>
            <a className="quiet-link" href="#como-funciona">Ver como funciona <span aria-hidden="true">↓</span></a>
          </div>
          <div className="hero-proof"><span className="proof-line" aria-hidden="true"></span><span>Comece com o que você já vende.</span></div>
        </div>

        <div className="hero-visual" aria-label="Exemplo de uma oportunidade compatível">
          <div className="visual-label visual-label-top">Seu próximo passo</div>
          <div className="opportunity-paper">
            <div className="paper-topline"><span>OPORTUNIDADE 001</span><span className="paper-dot"></span></div>
            <div className="paper-rule"></div>
            <p className="paper-kicker">Alta compatibilidade</p>
            <h2>Equipamentos de proteção individual</h2>
            <p className="paper-place">Prefeitura de Maringá <span>·</span> PR</p>
            <div className="paper-details"><div><strong>R$ 18.400</strong><span>valor estimado</span></div><div><strong>35 km</strong><span>distância</span></div></div>
            <div className="paper-tags"><span>Luva nitrílica</span><span>Óculos</span></div>
            <div className="paper-bottom"><span className="match-icon">✓</span><span>Combina com o seu perfil</span><span className="paper-arrow">↗</span></div>
          </div>
          <div className="visual-label visual-label-bottom">produto + região + próximo passo</div>
          <div className="visual-grid" aria-hidden="true"></div>
        </div>
      </section>

      <section className="signal-strip" id="como-funciona">
        <div className="strip-intro"><span className="strip-number">01</span><strong>Menos dúvida.<br />Mais direção.</strong></div>
        <div className="strip-item"><span className="strip-icon">⌕</span><span><strong>Você conta</strong><br />o que vende.</span></div>
        <div className="strip-item"><span className="strip-icon">↝</span><span><strong>A gente encontra</strong><br />o que combina.</span></div>
        <div className="strip-item"><span className="strip-icon">✓</span><span><strong>Você entende</strong><br />o que fazer agora.</span></div>
      </section>

      <section className="closing-section"><p className="eyebrow">O começo não precisa ser complicado</p><h2>Você já sabe vender.<br /><span>Agora descubra para quem.</span></h2><button className="button button-primary" onClick={openLogin}>Começar agora <span aria-hidden="true">↗</span></button></section>
      <footer className="site-footer"><span>primeiro lance</span><span>O primeiro contrato começa com uma boa oportunidade.</span></footer>
    </main>
  )
}

export default App
