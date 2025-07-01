
-- Remove RLS policies from cms_solutions_cards table
DROP POLICY IF EXISTS "Allow read access to active solutions cards" ON cms_solutions_cards;
DROP POLICY IF EXISTS "Allow all access for authenticated users" ON cms_solutions_cards;
DROP POLICY IF EXISTS "Allow public read access to solutions cards" ON cms_solutions_cards;

-- Disable RLS on cms_solutions_cards table
ALTER TABLE cms_solutions_cards DISABLE ROW LEVEL SECURITY;

-- Remove RLS from other CMS tables if they have it enabled
ALTER TABLE cms_pages DISABLE ROW LEVEL SECURITY;
ALTER TABLE cms_page_content DISABLE ROW LEVEL SECURITY;
ALTER TABLE cms_results_cards DISABLE ROW LEVEL SECURITY;
ALTER TABLE cms_success_stories_cards DISABLE ROW LEVEL SECURITY;
ALTER TABLE cms_testimonials DISABLE ROW LEVEL SECURITY;
ALTER TABLE cms_faq_cards DISABLE ROW LEVEL SECURITY;
ALTER TABLE cms_seo DISABLE ROW LEVEL SECURITY;

-- Drop any existing policies on other CMS tables
DROP POLICY IF EXISTS "Allow read access to active pages" ON cms_pages;
DROP POLICY IF EXISTS "Allow read access to page content" ON cms_page_content;
DROP POLICY IF EXISTS "Allow read access to active results cards" ON cms_results_cards;
DROP POLICY IF EXISTS "Allow read access to active success stories cards" ON cms_success_stories_cards;
DROP POLICY IF EXISTS "Allow read access to active testimonials" ON cms_testimonials;
DROP POLICY IF EXISTS "Allow read access to active faq cards" ON cms_faq_cards;
DROP POLICY IF EXISTS "Allow read access to seo data" ON cms_seo;
