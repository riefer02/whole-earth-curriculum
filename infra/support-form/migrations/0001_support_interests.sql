create table if not exists support_interests (
  id text primary key,
  created_at text not null,
  name text not null check (length(name) between 1 and 160),
  email text not null check (length(email) between 3 and 320),
  role text not null check (
    role in ('educator', 'expert', 'translator', 'funder', 'contributor', 'other')
  ),
  organization text check (organization is null or length(organization) <= 240),
  region text not null check (length(region) between 1 and 160),
  support_type text not null check (
    support_type in ('pilot', 'review', 'localize', 'fund', 'other')
  ),
  focus text check (focus is null or length(focus) <= 500),
  capacity text check (
    capacity is null or capacity in ('conversation', 'lessons', 'unit', 'ongoing')
  ),
  funding_range text check (
    funding_range is null or funding_range in (
      'in-kind', 'under-5000', '5000-25000', '25000-100000', '100000-plus'
    )
  ),
  message text check (message is null or length(message) <= 5000),
  contact_consent integer not null check (contact_consent = 1),
  source_path text not null default '/support/' check (length(source_path) <= 500),
  status text not null default 'new' check (
    status in ('new', 'contacted', 'active', 'closed', 'declined')
  ),
  internal_notes text
);

create index if not exists support_interests_created_at_idx
  on support_interests (created_at desc);

create index if not exists support_interests_type_status_idx
  on support_interests (support_type, status);
