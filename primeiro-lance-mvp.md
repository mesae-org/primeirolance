# PRIMEIRO LANCE — Documento de Produto e MVP

> **Status:** definição inicial do MVP  
> **Data:** 17/09/2026  
> **Nome de trabalho:** Primeiro Lance  
> **Nicho inicial:** pequenos fornecedores de EPI que ainda não têm experiência com licitações públicas  
> **Stack:** React + Vite + TypeScript + Tailwind CSS + shadcn/ui + Supabase

---

## 1. Visão do produto

### Ideia central

O produto não é um "dashboard de licitações".

É um **assistente para o pequeno fornecedor conseguir chegar ao primeiro contrato com o governo**.

A hipótese central é:

> Pequenos fornecedores que já sabem vender seus produtos no mercado privado podem ter interesse em vender para o governo, mas não participam porque não sabem encontrar uma oportunidade adequada, não entendem o edital e têm medo de errar.

O produto reduz essa incerteza em quatro passos:

1. entender o que a empresa vende;
2. encontrar oportunidades compatíveis;
3. explicar a oportunidade em linguagem simples;
4. transformar os requisitos em um caminho/checklist para participação.

### Posicionamento

> **Encontre uma licitação que combina com o que você já vende e entenda exatamente o que precisa fazer para participar.**

### Frase curta

> **Sua primeira oportunidade de vender para o governo.**

---

# 2. Público-alvo inicial

## Persona principal

Pequeno fornecedor de EPI:

- MEI/ME/EPP ou pequena empresa;
- já vende produtos no mercado privado;
- conhece seus produtos;
- não possui setor profissional de licitações;
- nunca participou ou participou poucas vezes;
- não quer aprender centenas de filtros;
- tem dificuldade para interpretar editais;
- quer começar com oportunidades pequenas e próximas.

## O que NÃO é o público inicial

- grandes empresas com departamento de licitações;
- consultorias;
- profissionais que participam de dezenas de pregões por mês;
- empresas que precisam de robô de lances;
- empresas que precisam de gestão completa de contratos.

---

# 3. Recorte inicial: EPI

O primeiro vertical será EPI.

Categorias iniciais:

- luvas;
- óculos de proteção;
- capacetes;
- protetores auriculares;
- calçados de segurança;
- respiradores;
- máscaras;
- vestimentas;
- cinturões e equipamentos para trabalho em altura;
- outros equipamentos de proteção.

O motivo do recorte:

1. permite conhecer profundamente o domínio;
2. facilita criar sinônimos e categorias;
3. facilita interpretar especificações técnicas;
4. reduz o problema de busca;
5. permite validar a proposta com um público específico antes de expandir.

---

# 4. O que o MVP precisa provar

A única hipótese que realmente importa no MVP é:

> **Um pequeno fornecedor consegue encontrar uma oportunidade que realmente faz sentido para ele e entender os próximos passos sem precisar dominar licitações.**

Métrica principal:

### Opportunity-to-action rate

Percentual de usuários que:

1. encontram uma oportunidade;
2. abrem a análise;
3. consideram a oportunidade compatível;
4. salvam/iniciam o checklist.

Métricas secundárias:

- oportunidades relevantes por usuário;
- taxa de abertura das oportunidades;
- taxa de oportunidades salvas;
- taxa de análise de edital;
- taxa de conclusão do checklist;
- quantidade de usuários que retornam;
- quantidade de usuários que clicam para o edital oficial.

Não usar "vitórias em licitação" como métrica principal do MVP porque o ciclo de venda pública pode ser longo e depende de fatores fora do produto.

---

# 5. Escopo funcional do MVP

## 5.1 Cadastro

O usuário cria uma conta e informa:

- nome;
- e-mail;
- CNPJ;
- cidade/UF;
- raio de entrega;
- porte;
- produtos vendidos;
- faixa de valor que consegue atender.

## 5.2 Perfil de produtos

O usuário seleciona categorias de EPI.

Também poderá cadastrar produtos específicos:

```text
Produto:
Luva nitrílica

Categoria:
Luvas

Descrição:
Luva nitrílica descartável sem pó

Palavras relacionadas:
luva nitrila
luva nitrílica
luva descartável
luva proteção química
```

O sistema usará essas informações para o matching.

## 5.3 Feed de oportunidades

Tela principal:

> **Encontramos 8 oportunidades para sua empresa**

Cada card mostra:

- objeto;
- órgão;
- cidade/UF;
- modalidade;
- valor estimado;
- prazo/data;
- categoria;
- nível de compatibilidade;
- principais motivos.

Exemplo:

```text
🟢 Alta compatibilidade

Aquisição de equipamentos de proteção individual

Prefeitura de X — PR

R$ 18.400 estimados

Produtos compatíveis:
• luva nitrílica
• óculos de proteção

Entrega:
35 km da sua empresa

[Ver oportunidade]
```

## 5.4 Página da oportunidade

Informações:

- órgão;
- objeto;
- modalidade;
- valor;
- datas;
- local;
- itens;
- quantidade;
- valor estimado dos itens;
- documentos disponíveis;
- link para fonte oficial.

Depois:

### Por que essa oportunidade apareceu?

Exemplo:

- produto compatível;
- região compatível;
- valor dentro da faixa;
- prazo dentro do perfil;
- oportunidade aberta.

### Pontos de atenção

Exemplo:

- exige CA;
- prazo de entrega curto;
- documentação técnica;
- quantidade elevada.

## 5.5 Análise do edital

O usuário clica:

> **Entender esta licitação**

A IA produz:

### O que será comprado?

Resumo dos produtos.

### Quanto?

Valor estimado.

### Quando?

Data da disputa e prazo de entrega.

### O que você precisa apresentar?

Lista de documentos/requisitos.

### O que seus produtos precisam atender?

Requisitos técnicos relevantes.

### Pontos de atenção

Trechos/requisitos que podem impedir ou dificultar a participação.

### O que ainda precisa ser confirmado?

Itens em que o documento não fornece informação suficiente.

Sempre mostrar a fonte do requisito dentro do documento.

## 5.6 Checklist

Exemplo:

```text
Seu caminho

☑ Entender a oportunidade

☐ Conferir se seus produtos atendem
  Verifique o CA exigido.

☐ Separar documentação

☐ Preparar proposta

☐ Acessar o portal da disputa

☐ Participar da sessão
```

O MVP não envia a proposta e não participa automaticamente da licitação.

---

# 6. O que NÃO entra no MVP

Não construir inicialmente:

- robô de lances;
- automação de proposta;
- CRM;
- ERP;
- gestão financeira;
- gestão de estoque;
- emissão de NF;
- gestão completa de contratos;
- recursos administrativos;
- consultoria;
- integração com centenas de portais;
- marketplace;
- aplicativo mobile nativo;
- geração automática de documentos jurídicos;
- análise completa de todas as categorias de produtos.

O produto deve terminar no ponto:

> **"Agora eu entendo essa oportunidade e sei o que preciso fazer."**

---

# 7. Fonte de dados

## PNCP

O PNCP será a fonte primária de dados públicos.

O PNCP disponibiliza APIs de dados abertos sem necessidade de cadastro/login para consultas aos dados públicos de contratações.

Fontes:

- Portal Nacional de Contratações Públicas: https://www.gov.br/pncp/pt-br
- Dados abertos: https://www.gov.br/pncp/pt-br/acesso-a-informacao/copy_of_dados-abertos
- Manual de integração: https://pncp.gov.br/manual/pt-br/latest/

A API possui recursos para recuperar itens de uma contratação e outras informações relacionadas.

### Estratégia

Não consultar a API do PNCP diretamente a cada busca do usuário.

Criar uma camada própria:

```text
PNCP
  ↓
Ingestão
  ↓
Supabase/PostgreSQL
  ↓
Normalização
  ↓
Indexação
  ↓
Matching
  ↓
Frontend
```

Isso reduz dependência da disponibilidade da API e permite consultas rápidas.

---

# 8. Arquitetura

```text
                    PNCP
                     │
                     ▼
              ┌──────────────┐
              │ Data Ingestion│
              └──────┬───────┘
                     │
                     ▼
             ┌────────────────┐
             │   Supabase     │
             │                │
             │ PostgreSQL     │
             │ pgvector       │
             │ Auth           │
             │ Storage        │
             │ Edge Functions │
             └───────┬────────┘
                     │
          ┌──────────┴───────────┐
          │                      │
          ▼                      ▼
    Matching Engine        Document Pipeline
          │                      │
          │                      ▼
          │                   OpenAI
          │                      │
          └──────────┬───────────┘
                     ▼
              React + Vite
                     │
          Tailwind + shadcn/ui
```

---

# 9. Stack

## Frontend

- React
- Vite
- TypeScript
- Tailwind CSS
- shadcn/ui

## Backend / infraestrutura

- Supabase
- PostgreSQL
- Supabase Auth
- Supabase Storage
- Supabase Edge Functions
- pgvector
- Row Level Security

O plano gratuito do Supabase atualmente inclui 500 MB de banco, 5 GB de egress, 1 GB de storage e 50 mil MAUs; o plano Pro começa em US$ 25/mês. Para o desenvolvimento inicial, o Free é suficiente, mas produção deve ser planejada para o Pro quando backups, continuidade e maior capacidade forem necessários.

Fonte: https://supabase.com/pricing

---

# 10. Modelo de dados inicial

## companies

```sql
id
cnpj
razao_social
nome_fantasia
porte
cidade
uf
latitude
longitude
raio_entrega_km
ticket_min
ticket_max
created_at
updated_at
```

## profiles

```sql
id
company_id
user_id
role
created_at
```

## product_categories

```sql
id
name
slug
parent_id
```

## products

```sql
id
company_id
category_id
name
description
search_text
embedding
created_at
updated_at
```

## product_synonyms

```sql
id
category_id
term
normalized_term
```

## opportunities

```sql
id
pncp_id
orgao_cnpj
orgao_nome
uf
municipio
modalidade
objeto
valor_estimado
data_publicacao
data_abertura
data_encerramento
situacao
url_pncp
raw_data
created_at
updated_at
```

## opportunity_items

```sql
id
opportunity_id
numero_item
descricao
unidade
quantidade
valor_unitario_estimado
valor_total_estimado
material_ou_servico
search_text
embedding
```

## opportunity_documents

```sql
id
opportunity_id
tipo
titulo
url
storage_path
mime_type
text_content
processed
document_version
content_hash
page_count
processed_at
created_at
```

## opportunity_matches

```sql
id
company_id
opportunity_id
score
score_product
score_location
score_value
score_deadline
score_company
score_semantic
reasons
warnings
created_at
```

## opportunity_analysis

```sql
id
opportunity_id
model
prompt_version
document_version
status
summary
requirements
technical_requirements
documents_required
warnings
unknowns
sources
created_by_job_id
created_at
updated_at
```

## checklists

```sql
id
company_id
opportunity_id
title
status
created_at
updated_at
```

## checklist_items

```sql
id
checklist_id
title
description
status
source
source_reference
position
```

---

# 11. Algoritmo de busca

## Decisão importante

**Não usar uma IA generativa como mecanismo principal de busca.**

O matching precisa ser:

- previsível;
- barato;
- rápido;
- explicável;
- auditável.

A IA será uma camada de interpretação, não o único cérebro do sistema.

---

# 12. Pipeline do algoritmo

## Etapa 1 — filtros obrigatórios

Antes de qualquer IA:

### Status

Excluir oportunidades encerradas.

### Região

Filtrar por:

- UF;
- município;
- raio;
- possibilidade de entrega nacional, se informado.

### Data

Dar prioridade a oportunidades ainda abertas.

### Tipo

Inicialmente priorizar:

- pregão eletrônico;
- dispensa eletrônica;
- outras modalidades de compra de bens que façam sentido para EPI.

### Categoria

Excluir oportunidades obviamente fora do nicho.

---

# 13. Etapa 2 — busca lexical

Usar PostgreSQL:

- Full Text Search;
- `pg_trgm`;
- normalização de texto.

Exemplo:

```text
luva nitrílica
```

deve encontrar:

```text
luva nitrila
luva nitrílica descartável
luvas de proteção nitrílica
luva para procedimento nitrílica
```

Criar dicionário de termos e sinônimos.

---

# 14. Etapa 3 — busca semântica

Usar embeddings.

Modelo inicial:

**OpenAI text-embedding-3-small**

O modelo é destinado a tarefas como busca, recomendações e classificação e atualmente custa US$ 0,02 por 1 milhão de tokens de entrada.

Fonte:
https://developers.openai.com/api/docs/models/text-embedding-3-small

Armazenar os embeddings no PostgreSQL usando `pgvector`.

Gerar embeddings para:

- produto do fornecedor;
- categoria;
- descrição da oportunidade;
- descrição dos itens.

---

# 15. Etapa 4 — ranking híbrido

A ordem de ranking será:

```text
Filtros obrigatórios
        ↓
Busca lexical
        ↓
Busca vetorial
        ↓
Score de compatibilidade
        ↓
Ranking final
```

Sugestão inicial:

```text
score final =
    35% produto/categoria
  + 20% similaridade semântica
  + 15% localização
  + 10% valor
  + 10% prazo
  + 10% perfil da empresa
```

Esses pesos são **iniciais e deverão ser calibrados com dados reais**.

---

# 16. Exemplo de score

Fornecedor:

```text
vende luvas nitrílicas
Maringá/PR
raio 100 km
ticket até R$ 30.000
```

Oportunidade:

```text
luvas nitrílicas
Maringá/PR
R$ 18.000
entrega em 20 dias
```

Resultado:

```text
Produto:       100
Semântica:      94
Localização:   100
Valor:         100
Prazo:          90
Perfil:         100
--------------------
Score final:    96
```

Mostrar ao usuário:

> 🟢 Alta compatibilidade

E não:

> "96% de chance de vencer."

O score representa **aderência ao perfil**, não probabilidade de vitória.

---

# 17. Fatores que NÃO devem virar score

Algumas condições devem ser tratadas como:

### Hard warning

Exemplo:

```text
CA obrigatório
```

Se o sistema não sabe se o fornecedor possui CA:

```text
🟡 Verificar
```

Nunca assumir:

```text
🟢 Compatível
```

Outro exemplo:

```text
prazo de entrega = 5 dias
```

e o fornecedor informa:

```text
prazo mínimo = 10 dias
```

Isso deve gerar:

```text
🔴 Prazo potencialmente incompatível
```

Não simplesmente reduzir 10 pontos.

---

# 18. IA utilizada

## Matching

A IA de matching será híbrida:

### Sem LLM para o score principal

- regras;
- PostgreSQL;
- busca textual;
- embeddings.

### Embedding

**text-embedding-3-small**

Objetivo:

- encontrar equivalência semântica;
- entender variações de descrição;
- reduzir dependência de palavras exatas.

---

# 19. IA para análise de edital

Usar:

### GPT-5.4 mini

Motivo:

- custo baixo;
- alta velocidade;
- adequado para processamento em volume;
- suporte a structured outputs;
- bom para tarefas de classificação, extração e transformação.

O preço deve ser confirmado na documentação oficial no momento da
implementação. A integração deve usar Structured Outputs para validar o JSON
da análise e permitir o vínculo de cada requisito com sua fonte.

Fonte:
https://developers.openai.com/api/docs/models

Se a qualidade da análise não for suficiente, testar um modelo superior
oficialmente disponível somente nas etapas de maior complexidade.

---

# 20. Regra importante da IA

A IA nunca deve inventar requisitos.

O pipeline deve ser:

```text
EDITAL
   ↓
extração
   ↓
trechos relevantes
   ↓
LLM
   ↓
JSON estruturado
   ↓
interface
```

O resultado deve carregar a fonte:

```json
{
  "requirement": "Produto deve possuir CA válido",
  "source": {
    "document": "Termo de Referência",
    "page": 12
  }
}
```

A interface deve permitir:

> **Ver no documento**

---

# 21. Structured output da análise

A resposta da IA deverá seguir algo semelhante a:

```json
{
  "summary": "...",
  "what_is_being_bought": [],
  "delivery": {
    "deadline": "",
    "location": ""
  },
  "technical_requirements": [],
  "documents_required": [],
  "warnings": [],
  "unknowns": [],
  "sources": []
}
```

Não permitir que o frontend dependa de texto livre para construir o checklist.

---

# 22. Proteção contra alucinação

Regras:

1. toda exigência deve possuir fonte;
2. toda data deve vir do documento ou dado estruturado;
3. toda conclusão deve ser marcada como inferência quando aplicável;
4. se não houver informação suficiente, responder "não identificado";
5. nunca afirmar que o fornecedor está juridicamente habilitado;
6. nunca afirmar que ele vai ganhar;
7. sempre manter link para a fonte oficial.

---

# 23. Modelo de cobrança

## Decisão para o MVP

Usar **freemium + assinatura mensal**.

Não cobrar percentual do contrato.

Não cobrar por vitória.

Não cobrar por licitação individual.

Motivo:

O produto é um SaaS de acompanhamento contínuo, e o usuário precisa criar hábito de consultar oportunidades.

---

# 24. Plano gratuito

### Gratuito — R$ 0

Objetivo: provar valor.

Inclui:

- criação de perfil;
- oportunidades compatíveis;
- consulta às oportunidades compatíveis, sem cobrança por visualização;
- informações básicas;
- acesso ao edital original;
- 1 análise completa de edital por mês;
- salvar oportunidades.

Limitação:

> "Entenda esta oportunidade" fica limitado no plano gratuito.

Visualizar o card, abrir os dados básicos, salvar uma oportunidade e acessar o
edital original não consome uma análise de IA. O limite deve ser aplicado
somente quando o usuário solicitar a análise estruturada do edital.

---

# 25. Plano pago

### Primeiro Lance Pro — R$ 49,90/mês

Inclui:

- oportunidades personalizadas;
- ranking de compatibilidade;
- análises completas de edital;
- checklist;
- alertas;
- histórico;
- quantidade maior de análises;
- comparação de oportunidades.

Limite inicial sugerido:

- até 10 análises completas/mês.

Esse limite deve ser validado com usuários reais antes de aumentar. No MVP,
uma oportunidade analisada deve reutilizar o resultado salvo para todos os
usuários, desde que o documento e a versão da análise não tenham mudado.

## 25.1 Controle de custo da análise

O custo variável não deve ser associado à quantidade de oportunidades exibidas.
Ele está concentrado no processamento do edital e na chamada ao modelo. Por
isso:

- não chamar IA para montar cards, ranking básico ou explicações de matching;
- processar cada documento uma vez e salvar o texto extraído e o JSON da análise;
- reutilizar a análise existente quando outro usuário abrir a mesma oportunidade;
- limitar tamanho de arquivo, páginas processadas e tokens por análise;
- registrar custo estimado por análise, modelo e versão do prompt;
- configurar um orçamento mensal e interromper novas análises pagas quando o
  limite operacional for atingido;
- mostrar ao usuário quando uma análise estiver pendente, sem disparar uma
  segunda chamada automaticamente.

### Regra de contagem

Uma análise só deve ser consumida quando a análise estruturada for concluída.
Falhas técnicas, documentos indisponíveis e análises já existentes não devem
consumir o limite do usuário.

## 25.2 Separação entre análise e personalização

O MVP deve separar dois resultados diferentes:

### Análise pública da oportunidade

Pode ser reutilizada entre usuários e contém:

- resumo do que será comprado;
- datas e local identificados no edital;
- requisitos técnicos;
- documentos exigidos;
- alertas gerais;
- fontes e trechos do documento.

### Orientação personalizada

É específica da empresa e contém:

- comparação com os produtos cadastrados;
- avisos sobre prazo, região e faixa de valor;
- itens do checklist do fornecedor;
- pendências e próximos passos.

A orientação personalizada deve usar regras e dados do perfil sempre que
possível. Ela não deve gerar uma nova chamada ao LLM para cada usuário.

## 25.3 Política de reanálise

Uma oportunidade pode ser analisada novamente somente quando ocorrer uma das
condições abaixo:

- o PNCP indicar uma nova versão do documento;
- houver alteração relevante de datas, situação ou itens;
- o prompt ou o schema da análise mudar;
- uma revisão manual identificar erro material.

A versão da análise deve registrar, no mínimo:

```text
opportunity_id
document_version
prompt_version
model
created_at
```

Uma reanálise não deve apagar a versão anterior. O sistema deve preservar o
histórico para auditoria e exibir a data da última atualização ao usuário.

## 25.4 Proteções contra abuso

Os limites devem ser aplicados por usuário e por empresa. O MVP deve exigir:

- e-mail verificado;
- CNPJ único por empresa;
- limite de tentativas de cadastro e solicitações por período;
- tamanho máximo de documento e quantidade máxima de páginas processadas;
- bloqueio de chamadas repetidas enquanto uma análise estiver pendente.

O limite de análise não deve ser contornado criando múltiplos perfis para o
mesmo CNPJ.

## 25.5 Métricas de ativação

Além do `opportunity-to-action rate`, acompanhar o funil:

```text
cadastro
  -> perfil completo
  -> primeira oportunidade salva
  -> primeira análise concluída
  -> checklist iniciado
```

O evento principal de ativação do MVP será definido como:

> usuário com perfil completo que salva uma oportunidade e inicia seu checklist.

Isso evita tratar apenas a abertura de uma tela como prova de valor.

## 25.6 Confiabilidade operacional

### Atualização dos dados

Toda oportunidade deve exibir:

- data e hora da última sincronização;
- situação atual conhecida;
- data da próxima atualização prevista;
- aviso quando os dados estiverem desatualizados.

Uma oportunidade alterada ou encerrada no PNCP não deve continuar sendo
apresentada como aberta apenas porque foi armazenada anteriormente.

### Documentos incompletos

O pipeline deve tratar explicitamente:

- PDF escaneado ou sem camada de texto;
- documento ilegível ou corrompido;
- edital sem anexos disponíveis;
- múltiplos anexos;
- arquivo acima do limite de tamanho ou páginas.

Quando a análise não for confiável, o sistema deve informar "análise incompleta" e explicar o motivo. Não deve preencher lacunas com suposições.

### Transparência para o usuário

Em toda análise, exibir:

- link para o documento oficial;
- data da análise;
- modelo e versão do prompt;
- trechos ou páginas usados como fonte;
- aviso de que a análise não substitui a leitura do edital nem orientação
  jurídica.

### Armazenamento

O MVP deve definir uma política de retenção para PDFs e anexos. Sempre que
possível, armazenar o texto extraído e os metadados da fonte, mantendo o PDF
somente quando ele for necessário para visualização, auditoria ou acesso
oficial. O sistema deve registrar o tamanho do arquivo e o prazo de retenção.

### Observabilidade

Cada job de documento ou IA deve registrar:

- status e motivo de falha;
- duração;
- tokens e custo estimado;
- modelo e versão do prompt;
- quantidade de páginas processadas;
- identificador da oportunidade e do documento.

Sem esses dados, não será possível controlar custo, qualidade ou tempo de
resposta.

### Estados de assinatura

O controle de acesso deve prever, no mínimo:

- gratuito ativo;
- Pro ativo;
- pagamento pendente;
- assinatura cancelada, mas ainda válida até o fim do ciclo;
- limite mensal atingido.

Uma análise iniciada deve manter seu estado até concluir ou falhar, mesmo que o plano do usuário mude durante o processamento.

---

# 26. Por que R$ 49,90?

Pesquisas de mercado atuais mostram plataformas generalistas com preços acima disso. Por exemplo, o Licitou apresenta plano inicial de R$ 79,90/mês e a Effecti estrutura planos para diferentes níveis de operação.

A proposta aqui é diferente:

> **menos funcionalidades, muito mais simplicidade para quem está começando.**

R$ 49,90 posiciona o produto abaixo das ferramentas profissionais sem transformar o produto em algo gratuito/de baixo valor.

Referências:

- https://licitou.com.br/
- https://effecti.com.br/plataforma/

---

# 27. Possível evolução da monetização

Depois de validar o MVP:

### Starter
R$ 29,90

Poucas análises.

### Pro
R$ 59,90

Mais análises + alertas + histórico.

### Business
R$ 99,90+

Mais usuários, mais CNPJs e recursos avançados.

Mas **não implementar esses três planos no MVP**.

Começar com:

```text
FREE
   ↓
PRO R$49,90
```

---

# 28. Custo de IA

O custo de embedding é muito baixo.

O principal custo variável será a análise de documentos.

Por isso:

- pré-processar documentos;
- armazenar texto extraído;
- não mandar o PDF inteiro para o modelo em toda pergunta;
- gerar uma análise estruturada uma vez;
- reutilizar o resultado;
- usar IA novamente apenas quando necessário.

Exemplo:

```text
Edital
 ↓
extração
 ↓
análise inicial
 ↓
JSON salvo
 ↓
usuários reutilizam
```

Não:

```text
cada usuário abre edital
 ↓
nova chamada cara para IA
```

---

# 29. Estratégia de ingestão

Criar jobs:

### `sync-opportunities`

Busca novas contratações no PNCP.

### `sync-items`

Busca itens das contratações relevantes.

### `sync-documents`

Busca documentos das oportunidades relevantes.

### `process-document`

Extrai texto.

### `generate-embeddings`

Gera embeddings.

### `analyze-opportunity`

Executa análise de IA.

---

# 30. Não processar tudo

Esse ponto é fundamental.

Não devemos:

```text
baixar todos os editais do Brasil
→ extrair todos
→ mandar tudo para IA
```

Isso seria caro e desnecessário.

Pipeline:

```text
PNCP
 ↓
filtro estrutural
 ↓
EPI
 ↓
região
 ↓
oportunidades abertas
 ↓
documentos relevantes
 ↓
extração
 ↓
embedding
 ↓
matching
```

A IA só entra depois que uma oportunidade passou pelos filtros.

---

# 31. Supabase

Usar:

### Auth

Login por:

- e-mail;
- Google.

### Database

PostgreSQL.

### pgvector

Embeddings.

### Storage

PDFs/documentos quando necessário.

### Edge Functions

- sincronização;
- processamento;
- chamadas para OpenAI;
- jobs auxiliares.

### RLS

Cada empresa só acessa:

- seu perfil;
- seus produtos;
- seus matches;
- seus checklists;
- seus dados privados.

Os dados públicos do PNCP podem ser compartilhados entre usuários.

---

# 32. Frontend

Estrutura inicial:

```text
src/
├── components/
│   ├── ui/
│   ├── opportunity/
│   ├── onboarding/
│   └── checklist/
│
├── pages/
│   ├── Dashboard/
│   ├── Opportunities/
│   ├── OpportunityDetails/
│   ├── Profile/
│   └── Billing/
│
├── hooks/
├── lib/
│   ├── supabase.ts
│   └── utils.ts
│
├── services/
│   ├── opportunities.ts
│   ├── matching.ts
│   └── analysis.ts
│
├── types/
└── App.tsx
```

---

# 33. Principais telas

## 1. Landing page

Mensagem:

> **Você já sabe vender. Agora descubra o que o governo está procurando.**

CTA:

> Encontrar minhas oportunidades

---

## 2. Onboarding

Perguntas rápidas.

---

## 3. Dashboard

```text
Bom dia, João.

Encontramos 7 oportunidades para você.

┌──────────┐ ┌──────────┐ ┌──────────┐
│ 7 novas  │ │ 3 salvas │ │ 1 atenção│
└──────────┘ └──────────┘ └──────────┘

Oportunidades
──────────────────────────

🟢 Luvas nitrílicas
Prefeitura X
R$ 18.400

🟢 Óculos de proteção
Prefeitura Y
R$ 9.800

🟡 Calçados
Prefeitura Z
R$ 32.000
```

---

# 34. Página da oportunidade

Hierarquia:

1. resumo;
2. compatibilidade;
3. itens;
4. pontos de atenção;
5. análise do edital;
6. checklist;
7. fonte oficial.

Evitar dashboard cheio de gráficos.

---

# 35. UX principal

A interface deve parecer:

> **um guia**

e não:

> **um sistema corporativo de licitações.**

Regra de design:

- poucas decisões por tela;
- linguagem simples;
- explicar termos técnicos;
- mostrar "por que apareceu";
- destacar próximos passos;
- evitar excesso de filtros;
- não mostrar dezenas de métricas.

---

# 36. Nome

## Nome de trabalho escolhido

# Primeiro Lance

Motivo:

- conecta diretamente com o primeiro contato do fornecedor com uma disputa;
- é fácil de entender;
- transmite começo;
- combina com o conceito de "primeira oportunidade";
- permite uma comunicação simples.

### Tagline

> **Sua primeira oportunidade de vender para o governo.**

### Alternativas que foram consideradas

- Primeiro Pregão
- Lance Inicial
- LicitaStart
- GovStart
- Licitaí
- Licitou

Algumas alternativas já apresentam uso comercial ou concorrencial evidente. "Licitou", por exemplo, já é uma plataforma ativa de licitações com IA e planos pagos, portanto não deve ser usado.

**Importante:** "Primeiro Lance" é apenas o nome de trabalho. Antes de domínio, marca e lançamento, fazer busca formal de domínio e disponibilidade no INPI.

---

# 37. Identidade conceitual

A marca não deve parecer:

- jurídica;
- burocrática;
- governamental;
- corporativa.

Deve parecer:

- simples;
- acessível;
- confiável;
- moderna;
- orientadora.

Conceito visual:

```text
GOVERNO
   ↓
OPORTUNIDADE
   ↓
PRIMEIRO LANCE
   ↓
PRIMEIRO CONTRATO
```

---

# 38. Diferencial competitivo

Concorrentes profissionais normalmente trabalham com:

- volume;
- filtros;
- automação;
- múltiplos portais;
- gestão de operação;
- robôs;
- dashboards.

O Primeiro Lance trabalha com:

> **redução da barreira de entrada.**

Comparação conceitual:

| Plataforma tradicional | Primeiro Lance |
|---|---|
| "Encontre licitações" | "Encontre uma oportunidade para você" |
| Muitos filtros | Poucas perguntas |
| Dashboard | Guia |
| Usuário interpreta edital | Sistema explica |
| Profissional de licitação | Pequeno fornecedor |
| Escalar operação | Começar |
| Muitos portais | Começar pelo PNCP |
| Robô de lances | Checklist para o primeiro pregão |

---

# 39. Roadmap

## MVP 1

- cadastro;
- perfil;
- EPI;
- ingestão PNCP;
- filtros;
- matching;
- embeddings;
- análise de edital;
- checklist;
- plano Free/Pro.

## MVP 1.1

- alertas;
- histórico;
- feedback de relevância;
- melhorar ranking.

## MVP 2

- mais categorias;
- mais estados;
- análise de preços históricos;
- inteligência de mercado;
- acompanhamento de resultados.

## MVP 3

- documentos;
- preparação de proposta;
- integração com portais;
- automações.

## Futuro

Possível evolução para:

> **Sistema operacional do pequeno fornecedor no mercado público.**

---

# 40. Feedback para melhorar o algoritmo

O usuário deverá poder marcar:

### "Essa oportunidade faz sentido?"

- 👍 Sim
- 👎 Não

Se não:

> Por quê?

- produto diferente;
- região;
- valor;
- prazo;
- documentação;
- quantidade;
- outro.

Esse feedback é extremamente importante.

Ele alimentará o ranking futuro.

---

# 41. Aprendizado do ranking

Inicialmente:

```text
pesos definidos manualmente
```

Depois:

```text
perfil
+
oportunidade
+
comportamento
+
feedback
↓
modelo de ranking
```

Não treinar um modelo de machine learning no primeiro dia.

Primeiro coletar dados.

---

# 42. Segurança e confiança

O produto lida com decisões comerciais e documentos de contratação.

Portanto:

- preservar fonte oficial;
- manter data/hora de atualização;
- indicar quando uma informação foi extraída do edital;
- registrar versão da análise;
- registrar modelo usado;
- não esconder incerteza;
- não prometer vitória;
- não substituir orientação jurídica;
- permitir acesso direto ao documento original.

---

# 43. Princípio de produto

O produto deve sempre responder:

### "Por que isso apareceu para mim?"

e:

### "O que eu preciso fazer agora?"

Se uma tela não responde a nenhuma dessas perguntas, provavelmente não é essencial para o MVP.

---

# 44. Arquitetura resumida

```text
                    ┌─────────────┐
                    │    PNCP     │
                    └──────┬──────┘
                           │
                           ▼
                 ┌─────────────────┐
                 │ Ingestion Jobs  │
                 └────────┬────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │   PostgreSQL    │
                 │   + pgvector    │
                 └────────┬────────┘
                          │
                 ┌────────┴────────┐
                 ▼                 ▼
          ┌──────────────┐  ┌──────────────┐
          │ Search/Match │  │ Documents   │
          └──────┬───────┘  └──────┬───────┘
                 │                 │
                 │                 ▼
                 │             OpenAI
                 │                 │
                 └────────┬────────┘
                          ▼
                    Supabase API
                          │
                          ▼
                 React + TypeScript
                          │
                          ▼
                 Usuário / Fornecedor
```

---

# 45. Decisões fechadas

| Decisão | Escolha |
|---|---|
| Nicho inicial | EPI |
| Público | Pequeno fornecedor iniciante |
| Fonte principal | PNCP |
| Banco | Supabase/PostgreSQL |
| Vetores | pgvector |
| Frontend | React + Vite + TS |
| UI | Tailwind + shadcn/ui |
| Busca | híbrida |
| Matching | regras + lexical + embeddings |
| Embedding | text-embedding-3-small |
| IA de edital | GPT-5.4 mini, sujeito a validação |
| Monetização | Freemium |
| Plano pago MVP | R$ 49,90/mês |
| Concierge MVP | NÃO |
| Robô de lances | NÃO |
| Automação de proposta | NÃO |
| Nome de trabalho | Primeiro Lance |

---

# 46. Próxima etapa de desenvolvimento

A ordem recomendada de implementação é:

## Sprint 0 — Validação técnica e piloto

Antes de construir o produto completo, executar os seguintes itens:

1. validar os endpoints necessários do PNCP, seus parâmetros, paginação,
  disponibilidade de itens e documentos, limites de requisição e frequência
  de atualização;
2. confirmar o modelo de IA efetivamente disponível, seu preço, limite de
  contexto, suporte a structured outputs e capacidade de indicar fontes;
3. preparar o roteiro de teste com 5 a 10 editais reais, incluindo PDFs
  pesquisáveis, documentos escaneados, múltiplos anexos e requisitos como CA
  e prazo de entrega. A execução fica para uma etapa posterior;
4. calcular o custo real por análise, incluindo extração, tokens, embeddings,
  armazenamento e processamento de falhas;
6. executar um piloto controlado com poucos fornecedores e uma região limitada,
  medindo relevância, análise concluída, checklist iniciado e custo por
  usuário ativo.

O item de LGPD e política de retenção será tratado em uma etapa posterior,
antes de qualquer lançamento público ou cobrança. Até essa etapa, não usar
dados reais de fornecedores fora de um ambiente controlado.

### Resultado inicial da validação do PNCP

Foram confirmados os seguintes recursos:

- busca de contratações por período de publicação e modalidade;
- paginação na resposta da busca;
- recuperação de itens por órgão, ano e número sequencial da contratação;
- recuperação de metadados e arquivos da contratação;
- download de documentos em PDF quando disponibilizados pelo PNCP.

O endpoint de busca exige modalidade e trabalha com páginas de tamanho mínimo
de 10 registros. A resposta inclui total de registros, total de páginas,
objeto, órgão, datas, modalidade, situação e valor estimado.

Não foi identificado um filtro global confiável por palavra-chave de EPI. A
primeira versão deverá, portanto:

1. buscar contratações por período e modalidades relevantes;
2. filtrar localmente o objeto da compra;
3. buscar os itens das contratações candidatas;
4. classificar EPI pelo texto dos itens e pelos sinônimos;
5. buscar documentos somente depois dessa filtragem.

Itens e documentos devem ser tratados como recursos opcionais, pois sua
disponibilidade varia por contratação. Limites de requisição, frequência de
atualização e comportamento de PDFs escaneados ainda precisam ser medidos em
testes controlados.

### Teste com editais reais adiado

O teste com uma amostra de editais reais foi adiado. Ele deverá medir a
disponibilidade de itens, anexos e PDFs pesquisáveis quando for retomado.

Quando for executado, a falha de disponibilidade deve gerar retry com backoff e
registro de erro no job, sem interromper a ingestão de outras páginas ou marcar
oportunidades como vazias.

### Resultado inicial da validação do modelo de IA

Os nomes inicialmente propostos não foram confirmados na documentação oficial.
A hipótese inicial foi substituída por `GPT-5.4 mini`,
que deverá ser testado para extração e classificação com Structured Outputs.
Preço, limite de contexto e qualidade final devem ser confirmados antes da
implementação da função de análise. O sistema deve permitir trocar o modelo
sem alterar o schema JSON da análise.

### Medição inicial de custo por análise

O custo deverá ser medido por execução, separando:

```text
custo total da análise
  = extração/OCR
  + tokens de entrada
  + tokens de saída
  + embeddings
  + armazenamento
  + processamento de falhas e retries
```

Cada teste deve registrar:

- identificador do edital e do documento;
- quantidade de páginas e tamanho do arquivo;
- tokens de entrada e saída;
- modelo e preço vigente na data do teste;
- quantidade de chamadas e retries;
- tempo total;
- custo estimado em reais e dólares;
- resultado concluído, incompleto ou com falha.

Não definir o limite definitivo do plano Pro antes de obter a mediana e o
 pior caso de custo em pelo menos 5 análises reais.

## Sprint 1 — Dados

1. criar projeto Supabase;
2. criar schema;
3. estudar endpoints do PNCP necessários;
4. implementar ingestão;
5. salvar contratações;
6. salvar itens;
7. criar normalização;
8. criar busca inicial.

## Sprint 2 — Perfil

1. Auth;
2. cadastro;
3. empresa;
4. categorias;
5. produtos;
6. localização;
7. faixa de valor.

## Sprint 3 — Matching

1. filtros;
2. Full Text Search;
3. `pg_trgm`;
4. embeddings;
5. score;
6. ranking;
7. explicação dos motivos.

## Sprint 4 — IA

1. download/processamento de documento;
2. extração de texto;
3. análise;
4. structured output;
5. requisitos;
6. pontos de atenção;
7. fontes.

## Sprint 5 — UX

1. dashboard;
2. cards;
3. detalhe;
4. análise;
5. checklist.

## Sprint 6 — Monetização

1. Free;
2. Pro;
3. controle de limites;
4. billing;
5. paywall.

---

# 47. Critério de sucesso do MVP

O MVP não precisa:

> "ser a maior plataforma de licitações do Brasil."

Ele precisa fazer uma coisa excepcionalmente bem:

> **Pegar alguém que nunca participou de uma licitação e fazê-lo entender uma oportunidade concreta que combina com o que ele já vende.**

Se isso funcionar para EPI, o produto pode ser expandido para:

```text
EPI
 ↓
Material de escritório
 ↓
Uniformes
 ↓
Limpeza
 ↓
Informática
 ↓
Móveis
 ↓
Outros pequenos fornecedores
```

O produto então deixa de ser:

> "buscador de licitações"

e passa a ser:

> **"porta de entrada do pequeno fornecedor no mercado público."**

---

## Fontes consultadas

- PNCP — Portal Nacional de Contratações Públicas: https://www.gov.br/pncp/pt-br
- PNCP — Dados Abertos: https://www.gov.br/pncp/pt-br/acesso-a-informacao/copy_of_dados-abertos
- PNCP — Manual de Integração: https://pncp.gov.br/manual/pt-br/latest/
- Supabase — Pricing: https://supabase.com/pricing
- OpenAI — Modelos e preços: https://developers.openai.com/api/docs/models
- OpenAI — text-embedding-3-small: https://developers.openai.com/api/docs/models/text-embedding-3-small
- Effecti: https://effecti.com.br/plataforma/
- Licitou: https://licitou.com.br/
