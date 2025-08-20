-- Habilitar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Organizações (corretoras clientes do SaaS)
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  cnpj TEXT,
  subdomain TEXT UNIQUE,
  logo_url TEXT,
  primary_color TEXT DEFAULT '#0D214F',
  secondary_color TEXT DEFAULT '#5A7A9E',
  plan TEXT CHECK (plan IN ('basic', 'pro', 'enterprise')) DEFAULT 'basic',
  status TEXT CHECK (status IN ('active', 'trial', 'suspended')) DEFAULT 'trial',
  stripe_customer_id TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Profiles (usuários do sistema - staff das corretoras)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT CHECK (role IN ('admin', 'broker', 'support')) NOT NULL,
  status TEXT CHECK (status IN ('active', 'inactive')) DEFAULT 'active',
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Clientes das corretoras
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  broker_id UUID REFERENCES profiles(id),
  name TEXT NOT NULL,
  email TEXT,
  cpf_cnpj TEXT,
  phone TEXT,
  status TEXT CHECK (status IN ('active', 'inactive', 'prospect')) DEFAULT 'prospect',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Policy para organizations (só o próprio admin pode ver)
CREATE POLICY "Users can view own organization" ON organizations FOR SELECT
USING (id IN (SELECT organization_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Users can update own organization" ON organizations FOR UPDATE
USING (id IN (SELECT organization_id FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Policy para profiles (isolamento por organização)
CREATE POLICY "Users can view org profiles" ON profiles FOR SELECT
USING (organization_id IN (SELECT organization_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Admins can insert profiles" ON profiles FOR INSERT
WITH CHECK (organization_id IN (SELECT organization_id FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins can update profiles" ON profiles FOR UPDATE
USING (organization_id IN (SELECT organization_id FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Policy para clients (isolamento por organização)
CREATE POLICY "Users can view org clients" ON clients FOR SELECT
USING (organization_id IN (SELECT organization_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Users can insert clients" ON clients FOR INSERT
WITH CHECK (organization_id IN (SELECT organization_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Users can update clients" ON clients FOR UPDATE
USING (organization_id IN (SELECT organization_id FROM profiles WHERE id = auth.uid()));

-- Triggers para updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();