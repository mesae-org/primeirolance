// Sprint 1 ingestion job: sync-opportunities
//
// Fetches recent PNCP procurements (contratacoes/publicacao), filters locally
// for EPI-related objects (Sprint 0 found no reliable global keyword filter),
// and upserts matches into public.opportunities. Designed to run as a
// scheduled Supabase Edge Function using the service role key.
//
// NOTE: modality codes below were inferred from public PNCP documentation and
// must be reconfirmed against the official manual before relying on them in
// production (see Sprint 0 — Resultado inicial da validação do PNCP).

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.116.0'

const PNCP_BASE_URL = 'https://pncp.gov.br/api/consulta/v1'
const PAGE_SIZE = 50
const SYNC_WINDOW_DAYS = 7
const MAX_RETRIES = 3

// Pregão eletrônico and dispensa eletrônica; verify against the PNCP manual.
const MODALIDADES = [6, 8]

const EPI_KEYWORDS =
  /luva|nitr[ií]lica|[oó]culos|capacete|protetor auricular|cal[cç]ado|respirador|m[aá]scara|jaleco|vestimenta|cintur[aã]o|epi\b|prote[cç][aã]o individual/i

function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10).replace(/-/g, '')
}

async function fetchWithRetry(url: string): Promise<Response | null> {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(url)
      if (response.ok) return response
      if (response.status >= 500 && attempt < MAX_RETRIES) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 1000))
        continue
      }
      return response
    } catch {
      if (attempt === MAX_RETRIES) return null
      await new Promise((resolve) => setTimeout(resolve, attempt * 1000))
    }
  }
  return null
}

// deno-lint-ignore no-explicit-any
type PncpRecord = Record<string, any>

function mapRecordToOpportunity(record: PncpRecord) {
  return {
    pncp_id: record.numeroControlePNCP,
    orgao_cnpj: record.orgaoEntidade?.cnpj ?? record.cnpjOrgao ?? null,
    orgao_nome: record.orgaoEntidade?.razaoSocial ?? null,
    uf: record.unidadeOrgao?.ufSigla ?? null,
    municipio: record.unidadeOrgao?.municipioNome ?? null,
    modalidade: record.modalidadeNome ?? null,
    objeto: record.objetoCompra ?? '',
    valor_estimado: record.valorTotalEstimado ?? null,
    data_publicacao: record.dataPublicacaoPncp ?? null,
    data_abertura: record.dataAberturaProposta ?? null,
    data_encerramento: record.dataEncerramentoProposta ?? null,
    situacao: record.situacaoCompraNome ?? null,
    url_pncp: record.cnpjOrgao && record.anoCompra && record.sequencialCompra
      ? `${PNCP_BASE_URL}/orgaos/${record.cnpjOrgao}/compras/${record.anoCompra}/${record.sequencialCompra}`
      : null,
    raw_data: record,
  }
}

async function syncModalidade(
  supabase: ReturnType<typeof createClient>,
  modalidade: number,
  dataInicial: string,
  dataFinal: string,
) {
  let pagina = 1
  let totalPaginas = 1
  let scanned = 0
  let matched = 0
  const errors: string[] = []

  do {
    const params = new URLSearchParams({
      dataInicial,
      dataFinal,
      codigoModalidadeContratacao: String(modalidade),
      pagina: String(pagina),
      tamanhoPagina: String(PAGE_SIZE),
    })

    const response = await fetchWithRetry(`${PNCP_BASE_URL}/contratacoes/publicacao?${params}`)
    if (!response || !response.ok) {
      errors.push(`modalidade=${modalidade} pagina=${pagina} status=${response?.status ?? 'network-error'}`)
      break
    }

    const body = await response.json()
    const rows: PncpRecord[] = body.data ?? []
    totalPaginas = body.totalPaginas ?? 1
    scanned += rows.length

    const matches = rows.filter((row) => EPI_KEYWORDS.test(row.objetoCompra ?? ''))
    if (matches.length > 0) {
      const { error } = await supabase
        .from('opportunities')
        .upsert(matches.map(mapRecordToOpportunity), { onConflict: 'pncp_id' })

      if (error) errors.push(`upsert modalidade=${modalidade} pagina=${pagina}: ${error.message}`)
      else matched += matches.length
    }

    pagina += 1
  } while (pagina <= totalPaginas)

  return { modalidade, scanned, matched, errors }
}

Deno.serve(async () => {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

  if (!supabaseUrl || !serviceRoleKey) {
    return new Response(JSON.stringify({ error: 'Missing Supabase service credentials' }), { status: 500 })
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey)

  const today = new Date()
  const windowStart = new Date(today)
  windowStart.setDate(windowStart.getDate() - SYNC_WINDOW_DAYS)

  const dataInicial = formatDate(windowStart)
  const dataFinal = formatDate(today)

  const results = []
  for (const modalidade of MODALIDADES) {
    results.push(await syncModalidade(supabase, modalidade, dataInicial, dataFinal))
  }

  return new Response(JSON.stringify({ window: { dataInicial, dataFinal }, results }), {
    headers: { 'content-type': 'application/json' },
  })
})
