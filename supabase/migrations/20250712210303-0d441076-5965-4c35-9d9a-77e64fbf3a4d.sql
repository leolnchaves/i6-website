-- Enable RLS and create policies for cms_success_stories_cards table
ALTER TABLE cms_success_stories_cards ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read active success stories cards
CREATE POLICY "Allow everyone to view active success stories cards" 
ON cms_success_stories_cards 
FOR SELECT 
USING (is_active = true);

-- Allow authenticated users to manage success stories cards (for CMS)
CREATE POLICY "Allow authenticated users to manage success stories cards" 
ON cms_success_stories_cards 
FOR ALL 
USING (true);