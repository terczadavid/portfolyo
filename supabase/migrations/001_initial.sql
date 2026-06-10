-- Portfolyo Database Schema
-- Run this SQL in your Supabase SQL Editor to set up the database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Portfolios table: stores user customization settings
CREATE TABLE portfolios (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    github_username TEXT NOT NULL UNIQUE,
    display_name TEXT,
    theme TEXT DEFAULT 'default' CHECK (theme IN ('default', 'modern', 'minimal')),
    accent_color TEXT DEFAULT '#0ea5e9',
    dark_mode BOOLEAN DEFAULT false,
    show_contributions BOOLEAN DEFAULT true,
    bio TEXT,
    custom_domain TEXT,
    selected_repos JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read portfolios (public access for portfolio pages)
CREATE POLICY "Allow public read" ON portfolios
    FOR SELECT USING (true);

-- Allow authenticated users to manage their own portfolio
CREATE POLICY "Allow own updates" ON portfolios
    FOR ALL USING (auth.uid() = id);

-- Create index on github_username for fast lookups
CREATE INDEX idx_portfolios_username ON portfolios(github_username);

-- Analytics table: track portfolio views
CREATE TABLE portfolio_views (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE,
    referrer TEXT,
    user_agent TEXT,
    ip_address TEXT,
    viewed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on analytics
ALTER TABLE portfolio_views ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anyone (for tracking)
CREATE POLICY "Allow insert views" ON portfolio_views
    FOR INSERT WITH CHECK (true);

-- Create index for analytics queries
CREATE INDEX idx_views_portfolio ON portfolio_views(portfolio_id);

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
CREATE TRIGGER update_portfolios_updated_at
    BEFORE UPDATE ON portfolios
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
