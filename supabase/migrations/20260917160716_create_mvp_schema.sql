create extension if not exists pgcrypto with schema extensions;
create extension if not exists vector with schema extensions;

create table public.companies (
	id uuid primary key default gen_random_uuid(),
	owner_user_id uuid not null references auth.users(id) on delete cascade,
	cnpj text not null unique,
	razao_social text,
	nome_fantasia text,
	porte text,
	cidade text,
	uf text,
	latitude double precision,
	longitude double precision,
	raio_entrega_km integer check (raio_entrega_km >= 0),
	ticket_min numeric(14, 2) check (ticket_min >= 0),
	ticket_max numeric(14, 2) check (ticket_max >= 0),
	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now(),
	constraint companies_ticket_range check (ticket_max is null or ticket_min is null or ticket_max >= ticket_min)
);

create table public.profiles (
	id uuid primary key default gen_random_uuid(),
	company_id uuid not null references public.companies(id) on delete cascade,
	user_id uuid not null unique references auth.users(id) on delete cascade,
	role text not null default 'owner',
	created_at timestamptz not null default now()
);

create table public.product_categories (
	id uuid primary key default gen_random_uuid(),
	name text not null,
	slug text not null unique,
	parent_id uuid references public.product_categories(id) on delete set null
);

create table public.product_synonyms (
	id uuid primary key default gen_random_uuid(),
	category_id uuid not null references public.product_categories(id) on delete cascade,
	term text not null,
	normalized_term text not null,
	unique (category_id, normalized_term)
);

create table public.products (
	id uuid primary key default gen_random_uuid(),
	company_id uuid not null references public.companies(id) on delete cascade,
	category_id uuid references public.product_categories(id) on delete set null,
	name text not null,
	description text,
	search_text text generated always as (lower(coalesce(name, '') || ' ' || coalesce(description, ''))) stored,
	embedding extensions.vector(1536),
	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now()
);

create table public.opportunities (
	id uuid primary key default gen_random_uuid(),
	pncp_id text not null unique,
	orgao_cnpj text,
	orgao_nome text,
	uf text,
	municipio text,
	modalidade text,
	objeto text not null,
	valor_estimado numeric(14, 2),
	data_publicacao timestamptz,
	data_abertura timestamptz,
	data_encerramento timestamptz,
	situacao text,
	url_pncp text,
	raw_data jsonb not null default '{}'::jsonb,
	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now()
);

create table public.opportunity_items (
	id uuid primary key default gen_random_uuid(),
	opportunity_id uuid not null references public.opportunities(id) on delete cascade,
	numero_item text,
	descricao text not null,
	unidade text,
	quantidade numeric(14, 3),
	valor_unitario_estimado numeric(14, 2),
	valor_total_estimado numeric(14, 2),
	material_ou_servico text,
	search_text text generated always as (lower(coalesce(descricao, '') || ' ' || coalesce(material_ou_servico, ''))) stored,
	embedding extensions.vector(1536),
	created_at timestamptz not null default now(),
	unique (opportunity_id, numero_item)
);

create table public.opportunity_documents (
	id uuid primary key default gen_random_uuid(),
	opportunity_id uuid not null references public.opportunities(id) on delete cascade,
	tipo text,
	titulo text,
	url text,
	storage_path text,
	mime_type text,
	text_content text,
	processed boolean not null default false,
	document_version text,
	content_hash text,
	page_count integer,
	processed_at timestamptz,
	created_at timestamptz not null default now()
);

create table public.opportunity_matches (
	id uuid primary key default gen_random_uuid(),
	company_id uuid not null references public.companies(id) on delete cascade,
	opportunity_id uuid not null references public.opportunities(id) on delete cascade,
	score numeric(5, 2) check (score >= 0 and score <= 100),
	score_product numeric(5, 2),
	score_location numeric(5, 2),
	score_value numeric(5, 2),
	score_deadline numeric(5, 2),
	score_company numeric(5, 2),
	score_semantic numeric(5, 2),
	reasons jsonb not null default '[]'::jsonb,
	warnings jsonb not null default '[]'::jsonb,
	created_at timestamptz not null default now(),
	unique (company_id, opportunity_id)
);

create table public.opportunity_analysis (
	id uuid primary key default gen_random_uuid(),
	opportunity_id uuid not null references public.opportunities(id) on delete cascade,
	model text not null,
	prompt_version text not null,
	document_version text,
	status text not null default 'pending' check (status in ('pending', 'processing', 'completed', 'incomplete', 'failed')),
	summary text,
	requirements jsonb not null default '[]'::jsonb,
	technical_requirements jsonb not null default '[]'::jsonb,
	documents_required jsonb not null default '[]'::jsonb,
	warnings jsonb not null default '[]'::jsonb,
	unknowns jsonb not null default '[]'::jsonb,
	sources jsonb not null default '[]'::jsonb,
	created_by_job_id uuid,
	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now()
);

create table public.checklists (
	id uuid primary key default gen_random_uuid(),
	company_id uuid not null references public.companies(id) on delete cascade,
	opportunity_id uuid not null references public.opportunities(id) on delete cascade,
	title text not null,
	status text not null default 'not_started',
	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now(),
	unique (company_id, opportunity_id)
);

create table public.checklist_items (
	id uuid primary key default gen_random_uuid(),
	checklist_id uuid not null references public.checklists(id) on delete cascade,
	title text not null,
	description text,
	status text not null default 'pending',
	source text,
	source_reference text,
	position integer not null default 0
);

create index products_company_id_idx on public.products(company_id);
create index products_search_text_idx on public.products using gin (to_tsvector('simple', search_text));
create index opportunities_open_idx on public.opportunities(data_encerramento, uf, municipio);
create index opportunity_items_opportunity_id_idx on public.opportunity_items(opportunity_id);
create index opportunity_items_search_text_idx on public.opportunity_items using gin (to_tsvector('simple', search_text));
create index opportunity_matches_company_score_idx on public.opportunity_matches(company_id, score desc);
create index checklists_company_id_idx on public.checklists(company_id);
create index checklist_items_checklist_position_idx on public.checklist_items(checklist_id, position);

alter table public.companies enable row level security;
alter table public.profiles enable row level security;
alter table public.product_categories enable row level security;
alter table public.product_synonyms enable row level security;
alter table public.products enable row level security;
alter table public.opportunities enable row level security;
alter table public.opportunity_items enable row level security;
alter table public.opportunity_documents enable row level security;
alter table public.opportunity_matches enable row level security;
alter table public.opportunity_analysis enable row level security;
alter table public.checklists enable row level security;
alter table public.checklist_items enable row level security;

create policy "Users can view their company" on public.companies for select to authenticated
	using (owner_user_id = (select auth.uid()));
create policy "Users can create their company" on public.companies for insert to authenticated
	with check (owner_user_id = (select auth.uid()));
create policy "Users can update their company" on public.companies for update to authenticated
	using (owner_user_id = (select auth.uid()))
	with check (owner_user_id = (select auth.uid()));

create policy "Users can view their profile" on public.profiles for select to authenticated
	using (user_id = (select auth.uid()));
create policy "Users can create their profile" on public.profiles for insert to authenticated
	with check (
		user_id = (select auth.uid())
		and exists (select 1 from public.companies c where c.id = company_id and c.owner_user_id = (select auth.uid()))
	);

create policy "Authenticated users can view categories" on public.product_categories for select to authenticated
	using (true);
create policy "Authenticated users can view product synonyms" on public.product_synonyms for select to authenticated
	using (true);

create policy "Users can manage their products" on public.products for all to authenticated
	using (exists (select 1 from public.companies c where c.id = company_id and c.owner_user_id = (select auth.uid())))
	with check (exists (select 1 from public.companies c where c.id = company_id and c.owner_user_id = (select auth.uid())));

create policy "Authenticated users can view opportunities" on public.opportunities for select to authenticated
	using (true);
create policy "Authenticated users can view opportunity items" on public.opportunity_items for select to authenticated
	using (true);
create policy "Authenticated users can view opportunity documents" on public.opportunity_documents for select to authenticated
	using (true);
create policy "Authenticated users can view opportunity analyses" on public.opportunity_analysis for select to authenticated
	using (true);

create policy "Users can manage their matches" on public.opportunity_matches for all to authenticated
	using (exists (select 1 from public.companies c where c.id = company_id and c.owner_user_id = (select auth.uid())))
	with check (exists (select 1 from public.companies c where c.id = company_id and c.owner_user_id = (select auth.uid())));

create policy "Users can manage their checklists" on public.checklists for all to authenticated
	using (exists (select 1 from public.companies c where c.id = company_id and c.owner_user_id = (select auth.uid())))
	with check (exists (select 1 from public.companies c where c.id = company_id and c.owner_user_id = (select auth.uid())));

create policy "Users can manage their checklist items" on public.checklist_items for all to authenticated
	using (exists (select 1 from public.checklists cl join public.companies c on c.id = cl.company_id where cl.id = checklist_id and c.owner_user_id = (select auth.uid())))
	with check (exists (select 1 from public.checklists cl join public.companies c on c.id = cl.company_id where cl.id = checklist_id and c.owner_user_id = (select auth.uid())));
