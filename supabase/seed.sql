-- Rosna development seed.
-- Run after migrations with Supabase CLI: supabase db reset
-- The seed is idempotent: fixed UUIDs + on conflict upserts.

insert into storage.buckets (id, name, public)
values
  ('product-images', 'product-images', true),
  ('homepage-images', 'homepage-images', true)
on conflict (id) do update set public = excluded.public;

insert into public.categories (id, name, slug, description, sort_order, is_active)
values
  ('10000000-0000-4000-8000-000000000101', 'Legginsy', 'legginsy', 'Elastyczne formy z dopracowanym stanem i spokojna linia.', 10, true),
  ('10000000-0000-4000-8000-000000000102', 'Spodnie', 'spodnie', 'Spodnie z naturalnych tkanin, projektowane do codziennej elegancji.', 20, true),
  ('10000000-0000-4000-8000-000000000103', 'Koszule', 'koszule', 'Koszule z lnu, bawelny i mieszanek premium.', 30, true),
  ('10000000-0000-4000-8000-000000000104', 'Koszulki', 'koszulki', 'Codzienne topy i t-shirty z miekkich dzianin.', 40, true),
  ('10000000-0000-4000-8000-000000000105', 'Torby', 'torby', 'Torby o prostej konstrukcji i naturalnym chwycie.', 50, true),
  ('10000000-0000-4000-8000-000000000106', 'Gorsety', 'gorsety', 'Konstrukcyjne gorsety i dopasowane formy made to order.', 60, true),
  ('10000000-0000-4000-8000-000000000107', 'Spodnice', 'spodnice', 'Spodnice midi i mini o czystych proporcjach.', 70, true),
  ('10000000-0000-4000-8000-000000000108', 'Sukienki', 'sukienki', 'Sukienki codzienne, wieczorowe i szyte na zamowienie.', 80, true),
  ('10000000-0000-4000-8000-000000000109', 'Welna', 'welna', 'Swetry, kardigany i cieple warstwy premium.', 90, true)
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  sort_order = excluded.sort_order,
  is_active = excluded.is_active;

insert into public.collections (id, name, slug, description, sort_order, is_active)
values
  ('10000000-0000-4000-8000-000000000201', 'Atelier Essentials', 'atelier-essentials', 'Stala baza garderoby Rosna: koszule, spodnie i proste warstwy.', 10, true),
  ('10000000-0000-4000-8000-000000000202', 'Soft Structure', 'soft-structure', 'Kolekcja oparta na strukturze lnu, bawelny i neutralnych tonach.', 20, true),
  ('10000000-0000-4000-8000-000000000203', 'Evening Forms', 'evening-forms', 'Sukienki, gorsety i sylwetki szyte wolniej, blizej ciala.', 30, true),
  ('10000000-0000-4000-8000-000000000204', 'Wool Edit', 'wool-edit', 'Miekkie warstwy z welny i dzianin o stabilnej formie.', 40, true)
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  sort_order = excluded.sort_order,
  is_active = excluded.is_active;

insert into public.materials (id, name, slug, description, care_notes, sort_order, is_active)
values
  ('10000000-0000-4000-8000-000000000301', 'Len premium', 'len', 'Oddychajace wlokno o naturalnej, lekko nieregularnej fakturze.', 'Prac delikatnie w 30 stopniach, suszyc na plasko lub na wieszaku.', 10, true),
  ('10000000-0000-4000-8000-000000000302', 'Bawelna organiczna', 'bawelna', 'Stabilna, miekka baza do koszul, topow i gorsetow.', 'Prac z podobnymi kolorami, prasowac po lewej stronie.', 20, true),
  ('10000000-0000-4000-8000-000000000303', 'Wiskoza EcoVero', 'wiskoza', 'Plynna tkanina o subtelnym polysku i miekkim chwycie.', 'Prac recznie lub chemicznie, nie suszyc bebnowo.', 30, true),
  ('10000000-0000-4000-8000-000000000304', 'Welna merino', 'welna', 'Ciepla, sprezysta przedza o gladkim dotyku.', 'Wietrzyc, prac recznie w zimnej wodzie, suszyc na plasko.', 40, true),
  ('10000000-0000-4000-8000-000000000305', 'Bambus', 'bambus', 'Lekka dzianina o chlodnym dotyku, dobra do pierwszej warstwy.', 'Prac delikatnie, unikac wysokiej temperatury.', 50, true)
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  care_notes = excluded.care_notes,
  sort_order = excluded.sort_order,
  is_active = excluded.is_active;

insert into public.tags (id, name, slug)
values
  ('10000000-0000-4000-8000-000000000401', 'Nowosc', 'nowosc'),
  ('10000000-0000-4000-8000-000000000402', 'Bestseller', 'bestseller'),
  ('10000000-0000-4000-8000-000000000403', 'Featured', 'featured'),
  ('10000000-0000-4000-8000-000000000404', 'Made to order', 'made-to-order'),
  ('10000000-0000-4000-8000-000000000405', 'Natural fabric', 'natural-fabric')
on conflict (slug) do update set name = excluded.name;

insert into public.products (
  id,
  name,
  slug,
  short_description,
  description,
  price,
  compare_at_price,
  currency,
  category_id,
  collection_id,
  production_type,
  lead_time_days,
  status,
  is_new,
  is_bestseller,
  is_featured,
  sort_order
)
values
  (
    '10000000-0000-4000-8000-000000000501',
    'Koszula Alba Linen',
    'koszula-alba-linen',
    'Lniana koszula o miekkiej, lekko oversizeowej linii.',
    'Koszula Alba Linen powstaje z certyfikowanego lnu o naturalnej fakturze. Ma spokojna linie ramion, miekki kolnierzyk i proporcje dopracowane do noszenia warstwowo.',
    349,
    null,
    'PLN',
    '10000000-0000-4000-8000-000000000103',
    '10000000-0000-4000-8000-000000000202',
    'in_stock',
    null,
    'published',
    true,
    true,
    true,
    10
  ),
  (
    '10000000-0000-4000-8000-000000000502',
    'Spodnie Nara Wide',
    'spodnie-nara-wide',
    'Szerokie spodnie z wysokim stanem i naturalnym ukladem tkaniny.',
    'Spodnie Nara Wide lacza wysoki stan, dluga nogawke i plynna forme. Model ma elegancki rytm, ale pozostaje wygodny w codziennym noszeniu.',
    429,
    479,
    'PLN',
    '10000000-0000-4000-8000-000000000102',
    '10000000-0000-4000-8000-000000000201',
    'in_stock',
    null,
    'published',
    false,
    true,
    true,
    20
  ),
  (
    '10000000-0000-4000-8000-000000000503',
    'Top Luma Bamboo',
    'top-luma-bamboo',
    'Minimalistyczny top z bambusowej dzianiny.',
    'Top Luma Bamboo jest pierwsza warstwa do spokojnych stylizacji. Dzianina jest gladka, miekka i chlodna przy skorze.',
    189,
    null,
    'PLN',
    '10000000-0000-4000-8000-000000000104',
    '10000000-0000-4000-8000-000000000201',
    'in_stock',
    null,
    'published',
    true,
    false,
    false,
    30
  ),
  (
    '10000000-0000-4000-8000-000000000504',
    'Legginsy Sora Rib',
    'legginsy-sora-rib',
    'Ribowane legginsy z podwyzszonym stanem.',
    'Legginsy Sora Rib maja stabilny pas, lekko kompresyjna dzianine i neutralne wykonczenie bez sportowego przerysowania.',
    259,
    null,
    'PLN',
    '10000000-0000-4000-8000-000000000101',
    '10000000-0000-4000-8000-000000000201',
    'in_stock',
    null,
    'draft',
    false,
    false,
    false,
    40
  ),
  (
    '10000000-0000-4000-8000-000000000505',
    'Gorset Elin Cotton',
    'gorset-elin-cotton',
    'Konstrukcyjny gorset z bawelny organicznej.',
    'Gorset Elin Cotton jest szyty z naciskiem na linie talii, stabilne szwy i czyste wykonczenie. Moze byc noszony samodzielnie albo jako warstwa.',
    489,
    null,
    'PLN',
    '10000000-0000-4000-8000-000000000106',
    '10000000-0000-4000-8000-000000000203',
    'made_to_order',
    21,
    'published',
    false,
    false,
    true,
    50
  ),
  (
    '10000000-0000-4000-8000-000000000506',
    'Sukienka Mira Slip',
    'sukienka-mira-slip',
    'Sukienka slip dress z plynnej wiskozy.',
    'Sukienka Mira Slip ma delikatny spadek, regulowane ramiaczka i dlugosc dopasowywana podczas konsultacji. Model jest szyty na zamowienie.',
    629,
    null,
    'PLN',
    '10000000-0000-4000-8000-000000000108',
    '10000000-0000-4000-8000-000000000203',
    'made_to_order',
    28,
    'published',
    true,
    false,
    true,
    60
  ),
  (
    '10000000-0000-4000-8000-000000000507',
    'Spodnica Rhea Midi',
    'spodnica-rhea-midi',
    'Spodnica midi o prostej linii i naturalnym chwycie.',
    'Spodnica Rhea Midi ma czysta linie, delikatnie usztywniony pas i proporcje, ktore dobrze pracuja z koszula albo dzianina.',
    379,
    null,
    'PLN',
    '10000000-0000-4000-8000-000000000107',
    '10000000-0000-4000-8000-000000000202',
    'in_stock',
    null,
    'published',
    false,
    false,
    false,
    70
  ),
  (
    '10000000-0000-4000-8000-000000000508',
    'Torba Vela Canvas',
    'torba-vela-canvas',
    'Torba z grubej bawelny o minimalistycznej formie.',
    'Torba Vela Canvas ma sztywna konstrukcje, szerokie uchwyty i spokojne proporcje. To dodatek zaprojektowany do codziennego rytmu.',
    299,
    null,
    'PLN',
    '10000000-0000-4000-8000-000000000105',
    '10000000-0000-4000-8000-000000000201',
    'in_stock',
    null,
    'published',
    false,
    true,
    false,
    80
  ),
  (
    '10000000-0000-4000-8000-000000000509',
    'Kardigan Noa Merino',
    'kardigan-noa-merino',
    'Kardigan z welny merino o stabilnej, miekkiej formie.',
    'Kardigan Noa Merino ma obniżona linie ramion, lekki splot i dlugosc dobra do warstwowych stylizacji przez kilka sezonow.',
    549,
    null,
    'PLN',
    '10000000-0000-4000-8000-000000000109',
    '10000000-0000-4000-8000-000000000204',
    'in_stock',
    null,
    'draft',
    false,
    false,
    false,
    90
  ),
  (
    '10000000-0000-4000-8000-000000000510',
    'Sukienka Aria Atelier',
    'sukienka-aria-atelier',
    'Wieczorowa sukienka szyta po konsultacji sylwetki.',
    'Sukienka Aria Atelier powstaje w procesie made to order. Konstrukcja jest czysta, a detal podporzadkowany proporcjom i ruchowi tkaniny.',
    890,
    null,
    'PLN',
    '10000000-0000-4000-8000-000000000108',
    '10000000-0000-4000-8000-000000000203',
    'made_to_order',
    35,
    'draft',
    false,
    false,
    false,
    100
  )
on conflict (slug) do update set
  name = excluded.name,
  short_description = excluded.short_description,
  description = excluded.description,
  price = excluded.price,
  compare_at_price = excluded.compare_at_price,
  currency = excluded.currency,
  category_id = excluded.category_id,
  collection_id = excluded.collection_id,
  production_type = excluded.production_type,
  lead_time_days = excluded.lead_time_days,
  status = excluded.status,
  is_new = excluded.is_new,
  is_bestseller = excluded.is_bestseller,
  is_featured = excluded.is_featured,
  sort_order = excluded.sort_order;

insert into public.product_images (product_id, url, path, alt_text, image_type, sort_order, is_primary)
values
  ('10000000-0000-4000-8000-000000000501', 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=85', 'seed/products/koszula-alba-linen/packshot.jpg', 'Koszula Alba Linen packshot', 'packshot', 0, true),
  ('10000000-0000-4000-8000-000000000501', 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85', 'seed/products/koszula-alba-linen/lifestyle.jpg', 'Koszula Alba Linen w stylizacji', 'lifestyle', 10, false),
  ('10000000-0000-4000-8000-000000000501', 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85', 'seed/products/koszula-alba-linen/detail.jpg', 'Detal lnu koszuli Alba', 'detail', 20, false),
  ('10000000-0000-4000-8000-000000000502', 'https://images.unsplash.com/photo-1495121605193-b116b5b9c5d6?auto=format&fit=crop&w=1200&q=85', 'seed/products/spodnie-nara-wide/packshot.jpg', 'Spodnie Nara Wide packshot', 'packshot', 0, true),
  ('10000000-0000-4000-8000-000000000502', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85', 'seed/products/spodnie-nara-wide/lifestyle.jpg', 'Spodnie Nara Wide lifestyle', 'lifestyle', 10, false),
  ('10000000-0000-4000-8000-000000000503', 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=85', 'seed/products/top-luma-bamboo/packshot.jpg', 'Top Luma Bamboo packshot', 'packshot', 0, true),
  ('10000000-0000-4000-8000-000000000505', 'https://images.unsplash.com/photo-1520962918057-4bf0ab08f3aa?auto=format&fit=crop&w=1200&q=85', 'seed/products/gorset-elin-cotton/packshot.jpg', 'Gorset Elin Cotton packshot', 'packshot', 0, true),
  ('10000000-0000-4000-8000-000000000506', 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1200&q=85', 'seed/products/sukienka-mira-slip/packshot.jpg', 'Sukienka Mira Slip packshot', 'packshot', 0, true),
  ('10000000-0000-4000-8000-000000000507', 'https://images.unsplash.com/photo-1520975682031-a7a7ea9865dc?auto=format&fit=crop&w=1200&q=85', 'seed/products/spodnica-rhea-midi/packshot.jpg', 'Spodnica Rhea Midi packshot', 'packshot', 0, true),
  ('10000000-0000-4000-8000-000000000508', 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=85', 'seed/products/torba-vela-canvas/packshot.jpg', 'Torba Vela Canvas packshot', 'packshot', 0, true)
on conflict (product_id, sort_order) do update set
  url = excluded.url,
  path = excluded.path,
  alt_text = excluded.alt_text,
  image_type = excluded.image_type,
  is_primary = excluded.is_primary;

insert into public.product_sizes (product_id, size_value, size_label, sort_order, is_available)
values
  ('10000000-0000-4000-8000-000000000501', 'XS', 'XS', 10, true),
  ('10000000-0000-4000-8000-000000000501', 'S', 'S', 20, true),
  ('10000000-0000-4000-8000-000000000501', 'M', 'M', 30, true),
  ('10000000-0000-4000-8000-000000000501', 'L', 'L', 40, true),
  ('10000000-0000-4000-8000-000000000502', 'XS', 'XS', 10, true),
  ('10000000-0000-4000-8000-000000000502', 'S', 'S', 20, true),
  ('10000000-0000-4000-8000-000000000502', 'M', 'M', 30, true),
  ('10000000-0000-4000-8000-000000000502', 'L', 'L', 40, true),
  ('10000000-0000-4000-8000-000000000503', 'XS-S', 'XS-S', 10, true),
  ('10000000-0000-4000-8000-000000000503', 'M-L', 'M-L', 20, true),
  ('10000000-0000-4000-8000-000000000504', 'XS-S', 'XS-S', 10, true),
  ('10000000-0000-4000-8000-000000000504', 'M-L', 'M-L', 20, true),
  ('10000000-0000-4000-8000-000000000505', 'made-to-measure', 'Made to measure', 10, true),
  ('10000000-0000-4000-8000-000000000506', 'made-to-measure', 'Made to measure', 10, true),
  ('10000000-0000-4000-8000-000000000507', 'XS', 'XS', 10, true),
  ('10000000-0000-4000-8000-000000000507', 'S', 'S', 20, true),
  ('10000000-0000-4000-8000-000000000507', 'M', 'M', 30, true),
  ('10000000-0000-4000-8000-000000000508', 'one-size', 'One size', 10, true),
  ('10000000-0000-4000-8000-000000000509', 'S-M', 'S-M', 10, true),
  ('10000000-0000-4000-8000-000000000509', 'L-XL', 'L-XL', 20, true),
  ('10000000-0000-4000-8000-000000000510', 'made-to-measure', 'Made to measure', 10, true)
on conflict (product_id, size_value) do update set
  size_label = excluded.size_label,
  sort_order = excluded.sort_order,
  is_available = excluded.is_available;

insert into public.product_materials (product_id, material_id, sort_order)
values
  ('10000000-0000-4000-8000-000000000501', '10000000-0000-4000-8000-000000000301', 10),
  ('10000000-0000-4000-8000-000000000502', '10000000-0000-4000-8000-000000000301', 10),
  ('10000000-0000-4000-8000-000000000503', '10000000-0000-4000-8000-000000000305', 10),
  ('10000000-0000-4000-8000-000000000504', '10000000-0000-4000-8000-000000000305', 10),
  ('10000000-0000-4000-8000-000000000505', '10000000-0000-4000-8000-000000000302', 10),
  ('10000000-0000-4000-8000-000000000506', '10000000-0000-4000-8000-000000000303', 10),
  ('10000000-0000-4000-8000-000000000507', '10000000-0000-4000-8000-000000000301', 10),
  ('10000000-0000-4000-8000-000000000508', '10000000-0000-4000-8000-000000000302', 10),
  ('10000000-0000-4000-8000-000000000509', '10000000-0000-4000-8000-000000000304', 10),
  ('10000000-0000-4000-8000-000000000510', '10000000-0000-4000-8000-000000000303', 10)
on conflict (product_id, material_id) do update set sort_order = excluded.sort_order;

insert into public.product_variants (
  product_id,
  sku,
  color_name,
  pattern_name,
  color_hex,
  material_id,
  size_value,
  price,
  stock_quantity,
  sort_order,
  is_active
)
values
  ('10000000-0000-4000-8000-000000000501', 'ROS-ALBA-WHITE-XS', 'Bialy', 'Solid', '#f8f7f2', '10000000-0000-4000-8000-000000000301', 'XS', 349, 6, 10, true),
  ('10000000-0000-4000-8000-000000000501', 'ROS-ALBA-SAND-M', 'Piaskowy', 'Solid', '#d8c7b2', '10000000-0000-4000-8000-000000000301', 'M', 349, 8, 20, true),
  ('10000000-0000-4000-8000-000000000502', 'ROS-NARA-BLACK-S', 'Czarny', 'Solid', '#161616', '10000000-0000-4000-8000-000000000301', 'S', 429, 5, 10, true),
  ('10000000-0000-4000-8000-000000000502', 'ROS-NARA-OLIVE-M', 'Oliwkowy', 'Solid', '#6f765d', '10000000-0000-4000-8000-000000000301', 'M', 429, 4, 20, true),
  ('10000000-0000-4000-8000-000000000503', 'ROS-LUMA-CREAM-XS', 'Kremowy', 'Rib', '#eee8dc', '10000000-0000-4000-8000-000000000305', 'XS-S', 189, 10, 10, true),
  ('10000000-0000-4000-8000-000000000505', 'ROS-ELIN-IVORY-MTO', 'Ivory', 'Solid', '#f2eee6', '10000000-0000-4000-8000-000000000302', 'made-to-measure', 489, 0, 10, true),
  ('10000000-0000-4000-8000-000000000506', 'ROS-MIRA-NAVY-MTO', 'Granatowy', 'Solid', '#1f2c3d', '10000000-0000-4000-8000-000000000303', 'made-to-measure', 629, 0, 10, true),
  ('10000000-0000-4000-8000-000000000507', 'ROS-RHEA-SAND-S', 'Piaskowy', 'Solid', '#d8c7b2', '10000000-0000-4000-8000-000000000301', 'S', 379, 5, 10, true),
  ('10000000-0000-4000-8000-000000000508', 'ROS-VELA-NATURAL-OS', 'Naturalny', 'Canvas', '#ded3c1', '10000000-0000-4000-8000-000000000302', 'one-size', 299, 7, 10, true)
on conflict (sku) do update set
  color_name = excluded.color_name,
  pattern_name = excluded.pattern_name,
  color_hex = excluded.color_hex,
  material_id = excluded.material_id,
  size_value = excluded.size_value,
  price = excluded.price,
  stock_quantity = excluded.stock_quantity,
  sort_order = excluded.sort_order,
  is_active = excluded.is_active;

insert into public.product_tags (product_id, tag_id)
values
  ('10000000-0000-4000-8000-000000000501', '10000000-0000-4000-8000-000000000401'),
  ('10000000-0000-4000-8000-000000000501', '10000000-0000-4000-8000-000000000402'),
  ('10000000-0000-4000-8000-000000000501', '10000000-0000-4000-8000-000000000403'),
  ('10000000-0000-4000-8000-000000000502', '10000000-0000-4000-8000-000000000402'),
  ('10000000-0000-4000-8000-000000000502', '10000000-0000-4000-8000-000000000403'),
  ('10000000-0000-4000-8000-000000000503', '10000000-0000-4000-8000-000000000401'),
  ('10000000-0000-4000-8000-000000000505', '10000000-0000-4000-8000-000000000404'),
  ('10000000-0000-4000-8000-000000000506', '10000000-0000-4000-8000-000000000401'),
  ('10000000-0000-4000-8000-000000000506', '10000000-0000-4000-8000-000000000404'),
  ('10000000-0000-4000-8000-000000000508', '10000000-0000-4000-8000-000000000402')
on conflict (product_id, tag_id) do nothing;

insert into public.homepage_sections (
  id,
  section_key,
  visibility,
  title,
  subtitle,
  body,
  cta_label,
  cta_href,
  image_url,
  linked_collection_id,
  sort_order,
  status
)
values
  ('10000000-0000-4000-8000-000000000600', 'announcement_bar', 'public', 'Darmowa dostawa od 500 zl i probki tkanin do zamowien made to order.', 'Announcement', 'Krotkie serie, naturalne tkaniny i spokojny rytm pracy.', null, null, null, null, 5, 'published'),
  ('10000000-0000-4000-8000-000000000601', 'hero', 'public', 'Naturalne tkaniny, czysta forma, ubrania na dluzej.', 'Rosna premium', 'Projektujemy garderobe, ktora porzadkuje codziennosc: spokojna w kolorze, precyzyjna w proporcji i przyjemna w dotyku.', 'Zobacz kolekcje', '/sklep', 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1600&q=85', '10000000-0000-4000-8000-000000000202', 10, 'published'),
  ('10000000-0000-4000-8000-000000000602', 'new_collection', 'public', 'Nowa kolekcja Soft Structure', 'Nowa kolekcja', 'Lniane koszule, szerokie spodnie i miekkie topy w palecie naturalnych tonow.', 'Przegladaj nowosci', '/sklep?sort=newest', null, '10000000-0000-4000-8000-000000000202', 20, 'published'),
  ('10000000-0000-4000-8000-000000000603', 'materials', 'public', 'Filozofia zaczyna sie od tkaniny', 'Materialy / filozofia', 'Wybieramy len, welne, wiskoze i bawelne o dobrym chwycie. Kazda tkanina musi pracowac z cialem, nie przeciwko niemu.', null, null, null, null, 30, 'published'),
  ('10000000-0000-4000-8000-000000000604', 'bestsellers', 'public', 'Najczesciej wybierane formy', 'Bestsellery', 'Modele, ktore najlepiej oddaja rytm marki: naturalne tkaniny, stabilna konstrukcja i spokojna elegancja.', 'Zobacz bestsellery', '/sklep', null, null, 40, 'published'),
  ('10000000-0000-4000-8000-000000000605', 'made_to_order', 'public', 'Szycie wolniej, blizej sylwetki', 'Made to order', 'Wybrane modele powstaja po konsultacji wymiarow, proporcji i preferencji noszenia. To proces dla osob, ktore chca spokojnego dopasowania.', 'Poznaj made to order', '/made-to-order', null, '10000000-0000-4000-8000-000000000203', 50, 'published'),
  ('10000000-0000-4000-8000-000000000606', 'story', 'public', 'Rosna porzadkuje garderobe zamiast ja zageszczac', 'Historia marki', 'Pracujemy w krotkich seriach i wracamy do sprawdzonych form. Detal ma znaczenie, ale nie musi dominowac nad ubraniem.', null, null, null, null, 60, 'published'),
  ('10000000-0000-4000-8000-000000000607', 'lookbook', 'public', 'Sylwetki w naturalnym swietle', 'Lookbook', 'Editorialowy rytm obrazow pokazuje, jak ubrania pracuja w ruchu, warstwie i codziennym rytmie.', null, null, null, null, 70, 'published'),
  ('10000000-0000-4000-8000-000000000608', 'newsletter', 'public', 'Pierwszy dostep do tkanin i premier', 'Newsletter', 'Zapisz sie, aby otrzymywac zapowiedzi krotkich serii, informacje o probkach tkanin i terminach made to order.', 'Zapisz sie', '#newsletter', null, null, 80, 'published')
on conflict (section_key) do update set
  visibility = excluded.visibility,
  title = excluded.title,
  subtitle = excluded.subtitle,
  body = excluded.body,
  cta_label = excluded.cta_label,
  cta_href = excluded.cta_href,
  image_url = excluded.image_url,
  linked_collection_id = excluded.linked_collection_id,
  sort_order = excluded.sort_order,
  status = excluded.status;

insert into public.homepage_section_items (
  id,
  section_id,
  title,
  subtitle,
  body,
  cta_label,
  cta_href,
  image_url,
  linked_product_id,
  linked_category_id,
  linked_collection_id,
  sort_order,
  status
)
values
  ('10000000-0000-4000-8000-000000000701', '10000000-0000-4000-8000-000000000602', 'Koszula Alba Linen', 'Koszule', 'Lniana struktura, swobodna linia i lekki kołnierzyk.', 'Zobacz', '/produkt/koszula-alba-linen', 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=85', '10000000-0000-4000-8000-000000000501', '10000000-0000-4000-8000-000000000103', '10000000-0000-4000-8000-000000000202', 10, 'published'),
  ('10000000-0000-4000-8000-000000000702', '10000000-0000-4000-8000-000000000602', 'Spodnie Nara Wide', 'Spodnie', 'Wysoki stan i dluga, spokojna nogawka.', 'Zobacz', '/produkt/spodnie-nara-wide', 'https://images.unsplash.com/photo-1495121605193-b116b5b9c5d6?auto=format&fit=crop&w=900&q=85', '10000000-0000-4000-8000-000000000502', '10000000-0000-4000-8000-000000000102', '10000000-0000-4000-8000-000000000202', 20, 'published'),
  ('10000000-0000-4000-8000-000000000703', '10000000-0000-4000-8000-000000000603', 'Len', null, 'Oddychajacy, lekko nieregularny i piekny w prostych formach.', null, null, null, null, null, null, 10, 'published'),
  ('10000000-0000-4000-8000-000000000704', '10000000-0000-4000-8000-000000000603', 'Welna merino', null, 'Ciepla, sprezysta i trwala warstwa na wiele sezonow.', null, null, null, null, null, null, 20, 'published'),
  ('10000000-0000-4000-8000-000000000705', '10000000-0000-4000-8000-000000000603', 'Wiskoza EcoVero', null, 'Plynny chwyt, miekkosc przy skorze i subtelny polysk.', null, null, null, null, null, null, 30, 'published'),
  ('10000000-0000-4000-8000-000000000706', '10000000-0000-4000-8000-000000000607', 'Poranek w miescie', null, null, null, null, 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=85', null, null, null, 10, 'published'),
  ('10000000-0000-4000-8000-000000000707', '10000000-0000-4000-8000-000000000607', 'Naturalna warstwa', null, null, null, null, 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=85', null, null, null, 20, 'published'),
  ('10000000-0000-4000-8000-000000000708', '10000000-0000-4000-8000-000000000607', 'Wieczorna prostota', null, null, null, null, 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85', null, null, null, 30, 'published')
on conflict (id) do update set
  title = excluded.title,
  subtitle = excluded.subtitle,
  body = excluded.body,
  cta_label = excluded.cta_label,
  cta_href = excluded.cta_href,
  image_url = excluded.image_url,
  linked_product_id = excluded.linked_product_id,
  linked_category_id = excluded.linked_category_id,
  linked_collection_id = excluded.linked_collection_id,
  sort_order = excluded.sort_order,
  status = excluded.status;
