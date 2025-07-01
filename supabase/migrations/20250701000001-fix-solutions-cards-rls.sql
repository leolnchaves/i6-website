
-- Enable RLS on cms_solutions_cards table
ALTER TABLE cms_solutions_cards ENABLE ROW LEVEL SECURITY;

-- Create policy to allow read access to active solutions cards
CREATE POLICY "Allow read access to active solutions cards" ON cms_solutions_cards
FOR SELECT USING (is_active = true);

-- Create policy to allow all access for authenticated users (for CMS admin)
CREATE POLICY "Allow all access for authenticated users" ON cms_solutions_cards
FOR ALL USING (auth.role() = 'authenticated');

-- If the above doesn't work, we can also create a more permissive policy for now
CREATE POLICY "Allow public read access to solutions cards" ON cms_solutions_cards
FOR SELECT USING (true);
