-- Seed data for EPI product categories and synonyms (Sprint 1).
-- Idempotent: safe to run multiple times via `supabase db reset`.

insert into public.product_categories (name, slug) values
  ('Luvas', 'luvas'),
  ('Óculos de proteção', 'oculos-de-protecao'),
  ('Capacetes', 'capacetes'),
  ('Protetores auriculares', 'protetores-auriculares'),
  ('Calçados de segurança', 'calcados-de-seguranca'),
  ('Respiradores', 'respiradores'),
  ('Máscaras', 'mascaras'),
  ('Vestimentas', 'vestimentas'),
  ('Cinturões e equipamentos para trabalho em altura', 'cinturoes-trabalho-altura'),
  ('Outros equipamentos de proteção', 'outros-epi')
on conflict (slug) do nothing;

insert into public.product_synonyms (category_id, term, normalized_term)
select c.id, t.term, t.normalized_term
from public.product_categories c
join (values
  ('luvas', 'luva nitrila', 'luva nitrila'),
  ('luvas', 'luva nitrílica', 'luva nitrilica'),
  ('luvas', 'luva descartável', 'luva descartavel'),
  ('luvas', 'luva proteção química', 'luva protecao quimica'),
  ('oculos-de-protecao', 'óculos de segurança', 'oculos de seguranca'),
  ('capacetes', 'capacete de segurança', 'capacete de seguranca'),
  ('protetores-auriculares', 'protetor auricular', 'protetor auricular'),
  ('calcados-de-seguranca', 'bota de segurança', 'bota de seguranca'),
  ('respiradores', 'máscara respiratória', 'mascara respiratoria'),
  ('mascaras', 'máscara descartável', 'mascara descartavel'),
  ('vestimentas', 'jaleco de proteção', 'jaleco de protecao'),
  ('cinturoes-trabalho-altura', 'cinto de segurança', 'cinto de seguranca')
) as t(slug, term, normalized_term) on t.slug = c.slug
on conflict (category_id, normalized_term) do nothing;
