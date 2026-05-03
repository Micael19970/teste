-- Create users table
create table public.users (
  id uuid references auth.users not null primary key,
  name text,
  email text not null,
  plan text default 'free',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Function to handle new user
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, name, email, plan)
  values (new.id, new.raw_user_meta_data->>'name', new.email, 'free');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to handle new user
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create courses table
create table public.courses (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create lessons table
create table public.lessons (
  id uuid default gen_random_uuid() primary key,
  course_id uuid references public.courses(id) on delete cascade not null,
  title text not null,
  video_url text,
  pdf_url text,
  order_number int not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create progress table
create table public.progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  lesson_id uuid references public.lessons(id) on delete cascade not null,
  completed boolean default false,
  completed_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, lesson_id)
);

-- Enable RLS
alter table public.users enable row level security;
alter table public.courses enable row level security;
alter table public.lessons enable row level security;
alter table public.progress enable row level security;

-- Policies
create policy "Users can view their own profile." on public.users for select using (auth.uid() = id);
create policy "Users can update their own profile." on public.users for update using (auth.uid() = id);

create policy "Anyone can view courses." on public.courses for select using (true);
create policy "Anyone can view lessons." on public.lessons for select using (true);

create policy "Users can view their own progress." on public.progress for select using (auth.uid() = user_id);
create policy "Users can insert their own progress." on public.progress for insert with check (auth.uid() = user_id);
create policy "Users can update their own progress." on public.progress for update using (auth.uid() = user_id);

-- Insert dummy data
insert into public.courses (id, title) values ('213ea6bc-4933-4f93-ac1e-72d82915cdab', 'Método Antigravity - Adestramento de Cães');

insert into public.lessons (course_id, title, video_url, pdf_url, order_number) values 
('213ea6bc-4933-4f93-ac1e-72d82915cdab', 'Aula 1: A Base do Respeito', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', 1),
('213ea6bc-4933-4f93-ac1e-72d82915cdab', 'Aula 2: Controle de Latidos', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', 2),
('213ea6bc-4933-4f93-ac1e-72d82915cdab', 'Aula 3: Acabando com a Destruição', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', 3),
('213ea6bc-4933-4f93-ac1e-72d82915cdab', 'Aula 4: O Passeio Perfeito', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', 4),
('213ea6bc-4933-4f93-ac1e-72d82915cdab', 'Aula 5: Ansiedade de Separação', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', 5);
