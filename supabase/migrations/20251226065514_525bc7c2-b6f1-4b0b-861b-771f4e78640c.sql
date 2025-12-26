-- Create messages table for public wishes
CREATE TABLE public.messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert messages (public feature)
CREATE POLICY "Anyone can send messages"
ON public.messages
FOR INSERT
WITH CHECK (true);

-- Allow anyone to read messages (for couple view)
CREATE POLICY "Anyone can read messages"
ON public.messages
FOR SELECT
USING (true);