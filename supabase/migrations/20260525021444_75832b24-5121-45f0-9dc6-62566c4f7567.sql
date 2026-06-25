
-- POSTS (manual publishing pipeline)
CREATE TABLE IF NOT EXISTS public.posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  subtitle text,
  post_type text NOT NULL DEFAULT 'general_article',
  source_type text DEFAULT 'manual',
  source_url text,
  body_markdown text,
  original_text text,
  generated_summary text,
  why_this_matters text,
  skills_shown text[] DEFAULT '{}',
  tags text[] DEFAULT '{}',
  related_project_ids uuid[] DEFAULT '{}',
  related_skill_ids uuid[] DEFAULT '{}',
  cover_image_url text,
  image_urls text[] DEFAULT '{}',
  featured boolean DEFAULT false,
  status text DEFAULT 'draft',
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published posts v2" ON public.posts FOR SELECT USING (status = 'published');
CREATE POLICY "Admins write posts v2" ON public.posts FOR ALL USING (has_role(auth.uid(), 'admin'));

-- PROJECT/POST MEDIA
CREATE TABLE IF NOT EXISTS public.project_media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES public.projects(id) ON DELETE CASCADE,
  type text DEFAULT 'image',
  url text NOT NULL,
  caption text,
  alt_text text,
  sort_order int DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.project_media ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read project media" ON public.project_media FOR SELECT USING (true);
CREATE POLICY "Admins write project media" ON public.project_media FOR ALL USING (has_role(auth.uid(), 'admin'));

CREATE TABLE IF NOT EXISTS public.post_media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES public.posts(id) ON DELETE CASCADE,
  type text DEFAULT 'image',
  url text NOT NULL,
  caption text,
  alt_text text,
  sort_order int DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.post_media ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read post media" ON public.post_media FOR SELECT USING (true);
CREATE POLICY "Admins write post media" ON public.post_media FOR ALL USING (has_role(auth.uid(), 'admin'));

-- EXTENDED PROJECT/PROFILE/CONTACT FIELDS
ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS problem text,
  ADD COLUMN IF NOT EXISTS what_i_built text,
  ADD COLUMN IF NOT EXISTS architecture text,
  ADD COLUMN IF NOT EXISTS challenges text,
  ADD COLUMN IF NOT EXISTS recruiter_takeaway text;

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS primary_photo_url text,
  ADD COLUMN IF NOT EXISTS avatar_fallback_image_url text;

ALTER TABLE public.contact_messages
  ADD COLUMN IF NOT EXISTS subject text,
  ADD COLUMN IF NOT EXISTS status text DEFAULT 'new';

-- INTEGRATIONS
CREATE TABLE IF NOT EXISTS public.external_integrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider text NOT NULL UNIQUE,
  display_name text,
  status text DEFAULT 'inactive',
  purpose text,
  auth_type text,
  secret_names text[] DEFAULT '{}',
  enabled boolean DEFAULT false,
  last_checked_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.external_integrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage integrations" ON public.external_integrations FOR ALL USING (has_role(auth.uid(), 'admin'));

CREATE TABLE IF NOT EXISTS public.integration_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider text NOT NULL,
  action text,
  status text,
  message text,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.integration_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read integration logs" ON public.integration_logs FOR SELECT USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins write integration logs" ON public.integration_logs FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'));

-- AVATAR
CREATE TABLE IF NOT EXISTS public.avatar_knowledge_sources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  source_type text DEFAULT 'note',
  content text,
  file_url text,
  tags text[] DEFAULT '{}',
  priority int DEFAULT 0,
  status text DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.avatar_knowledge_sources ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage knowledge" ON public.avatar_knowledge_sources FOR ALL USING (has_role(auth.uid(), 'admin'));

CREATE TABLE IF NOT EXISTS public.avatar_personality_rules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text,
  rule text NOT NULL,
  example text,
  priority int DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.avatar_personality_rules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage personality" ON public.avatar_personality_rules FOR ALL USING (has_role(auth.uid(), 'admin'));

CREATE TABLE IF NOT EXISTS public.avatar_voice_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  style text DEFAULT 'calm',
  description text,
  sample_audio_url text,
  active boolean DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.avatar_voice_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage voice profiles" ON public.avatar_voice_profiles FOR ALL USING (has_role(auth.uid(), 'admin'));

-- ANALYTICS
CREATE TABLE IF NOT EXISTS public.analytics_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  page_path text,
  project_id uuid,
  post_id uuid,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert analytics" ON public.analytics_events FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins read analytics" ON public.analytics_events FOR SELECT USING (has_role(auth.uid(), 'admin'));

-- STORAGE BUCKETS
INSERT INTO storage.buckets (id, name, public) VALUES
  ('public-media', 'public-media', true),
  ('project-media', 'project-media', true),
  ('post-media', 'post-media', true),
  ('avatar-models', 'avatar-models', true),
  ('avatar-reference-photos', 'avatar-reference-photos', true),
  ('private-voice-samples', 'private-voice-samples', false),
  ('generated-avatar-audio', 'generated-avatar-audio', false)
ON CONFLICT (id) DO NOTHING;

-- Public read for public buckets
CREATE POLICY "Public read public buckets"
  ON storage.objects FOR SELECT
  USING (bucket_id IN ('public-media','project-media','post-media','avatar-models','avatar-reference-photos'));

-- Admin write for all buckets
CREATE POLICY "Admins write all buckets"
  ON storage.objects FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update all buckets"
  ON storage.objects FOR UPDATE
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete all buckets"
  ON storage.objects FOR DELETE
  USING (has_role(auth.uid(), 'admin'));

-- Admin read for private buckets
CREATE POLICY "Admins read private buckets"
  ON storage.objects FOR SELECT
  USING (bucket_id IN ('private-voice-samples','generated-avatar-audio') AND has_role(auth.uid(), 'admin'));

-- Updated_at trigger for posts
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER posts_touch BEFORE UPDATE ON public.posts FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
