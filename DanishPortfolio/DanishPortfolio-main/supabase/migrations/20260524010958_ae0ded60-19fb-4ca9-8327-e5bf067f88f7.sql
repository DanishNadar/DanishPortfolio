
-- Roles for admin access
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id=_user_id AND role=_role) $$;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins manage roles" ON public.user_roles FOR ALL USING (public.has_role(auth.uid(),'admin'));

-- Profile (single record)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  title TEXT,
  location TEXT,
  email TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  resume_url TEXT,
  bio_short TEXT,
  bio_long TEXT,
  hero_image_url TEXT,
  avatar_model_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Admins write profiles" ON public.profiles FOR ALL USING (public.has_role(auth.uid(),'admin'));

-- Projects
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  summary TEXT,
  long_description TEXT,
  role TEXT,
  domain TEXT,
  status TEXT DEFAULT 'published',
  featured BOOLEAN DEFAULT false,
  priority INT DEFAULT 0,
  github_url TEXT,
  live_demo_url TEXT,
  article_url TEXT,
  linkedin_post_url TEXT,
  cover_image_url TEXT,
  tech_stack TEXT[] DEFAULT '{}',
  outcomes TEXT[] DEFAULT '{}',
  metrics JSONB DEFAULT '{}',
  lessons TEXT[] DEFAULT '{}',
  period TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published projects" ON public.projects FOR SELECT USING (status = 'published');
CREATE POLICY "Admins write projects" ON public.projects FOR ALL USING (public.has_role(auth.uid(),'admin'));

-- Articles
CREATE TABLE public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  body_markdown TEXT,
  cover_image_url TEXT,
  tags TEXT[] DEFAULT '{}',
  related_project_ids UUID[] DEFAULT '{}',
  source_type TEXT DEFAULT 'article',
  source_url TEXT,
  status TEXT DEFAULT 'published',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published articles" ON public.articles FOR SELECT USING (status = 'published');
CREATE POLICY "Admins write articles" ON public.articles FOR ALL USING (public.has_role(auth.uid(),'admin'));

-- GitHub repos
CREATE TABLE public.github_repos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  github_id BIGINT UNIQUE,
  name TEXT NOT NULL,
  full_name TEXT,
  description TEXT,
  html_url TEXT,
  homepage TEXT,
  language TEXT,
  topics TEXT[] DEFAULT '{}',
  stars INT DEFAULT 0,
  forks INT DEFAULT 0,
  visibility TEXT DEFAULT 'public',
  pushed_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  readme_summary TEXT,
  linked_project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  synced_at TIMESTAMPTZ
);
ALTER TABLE public.github_repos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read repos" ON public.github_repos FOR SELECT USING (true);
CREATE POLICY "Admins write repos" ON public.github_repos FOR ALL USING (public.has_role(auth.uid(),'admin'));

-- LinkedIn posts
CREATE TABLE public.linkedin_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  linkedin_urn TEXT,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  text TEXT,
  post_url TEXT,
  published_at TIMESTAMPTZ,
  imported_at TIMESTAMPTZ DEFAULT now(),
  image_urls TEXT[] DEFAULT '{}',
  video_url TEXT,
  tags TEXT[] DEFAULT '{}',
  related_project_ids UUID[] DEFAULT '{}',
  generated_summary TEXT,
  featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'published',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.linkedin_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published posts" ON public.linkedin_posts FOR SELECT USING (status='published');
CREATE POLICY "Admins write posts" ON public.linkedin_posts FOR ALL USING (public.has_role(auth.uid(),'admin'));

-- Skills
CREATE TABLE public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT,
  description TEXT,
  level INT DEFAULT 3,
  related_project_ids UUID[] DEFAULT '{}',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Admins write skills" ON public.skills FOR ALL USING (public.has_role(auth.uid(),'admin'));

-- Contact messages
CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  source TEXT DEFAULT 'contact_form',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert messages" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins read messages" ON public.contact_messages FOR SELECT USING (public.has_role(auth.uid(),'admin'));

-- Avatar sessions + messages
CREATE TABLE public.avatar_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id TEXT,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_active_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  current_page TEXT,
  referrer TEXT
);
ALTER TABLE public.avatar_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert sessions" ON public.avatar_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins read sessions" ON public.avatar_sessions FOR SELECT USING (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.avatar_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES public.avatar_sessions(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  message TEXT NOT NULL,
  suggested_route TEXT,
  suggested_project_id UUID,
  audio_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.avatar_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert avatar msg" ON public.avatar_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins read avatar msg" ON public.avatar_messages FOR SELECT USING (public.has_role(auth.uid(),'admin'));

-- Trigger to auto-assign first admin
CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role='admin') THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
  ELSE
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user');
  END IF;
  RETURN NEW;
END; $$;

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Seed profile
INSERT INTO public.profiles (name, title, location, email, github_url, linkedin_url, bio_short, bio_long) VALUES (
  'Danish Nadar',
  'AI Engineer · Robotics · Autonomy',
  'Chicago · Illinois Tech',
  'danish.t.nadar@gmail.com',
  'https://github.com/DanishNadar',
  'https://www.linkedin.com/in/danish-nadar',
  'I build AI systems, robotics tools, and intelligent products that move from idea to working prototype.',
  'AI Engineer focused on accessibility robotics, autonomous systems, applied ML, and security automation. BS/MS Artificial Intelligence at Illinois Tech. EcoCAR sensor fusion lead, robotics treasurer, StarkHacks 2026 winner.'
);
