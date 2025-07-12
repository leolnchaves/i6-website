-- Update existing testimonials to use the correct success-stories page_id
UPDATE cms_testimonials 
SET page_id = '02b3edf8-22fe-4553-99ae-45c8127f2ea7'
WHERE page_id = '0e8d127d-7ae2-497e-ab18-5436af2b8a5c';