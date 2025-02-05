CREATE TABLE IF NOT EXISTS nodes (
    id SERIAL PRIMARY KEY,
    key VARCHAR(20) NOT NULL,
    secret VARCHAR(40) NOT NULL,
    region VARCHAR(16) NOT NULL,
    cpu SMALLINT,
    vm_id VARCHAR(19),
    name VARCHAR(32),
    type VARCHAR(16),
    state VARCHAR(16),
    ip INET,
    created TIMESTAMPTZ
);
