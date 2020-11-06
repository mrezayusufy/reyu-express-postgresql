const db = require('../client');

async function updatedAtTrigger() {
  await db.connect();

  await db.query(`CREATE OR REPLACE FUNCTION updated_at()
  RETURNS TRIGGER AS $$
  BEGIN
      if new.created_at <> current_timestamp then
        NEW.updated_at = now();
      end if;
      RETURN NEW;
  END;
  $$ language 'plpgsql';`);

  await db.query(`CREATE TRIGGER updated_at_file
  BEFORE UPDATE ON files
  FOR EACH ROW EXECUTE PROCEDURE updated_at();`);

  await db.end();
}

updatedAtTrigger();
