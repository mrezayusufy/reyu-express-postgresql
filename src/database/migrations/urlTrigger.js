const db = require('../client');

async function urlTrigger() {
  await db.connect();

  await db.query(`create or replace function url() returns trigger as $$
  begin
  update files set url = concat('${process.env.FILE_URL}', path) where id=new.id;
  return new;
  end; $$
  language plpgsql;`);

  await db.query(`create trigger url_insert
  after insert on files
  for each row
  execute procedure url();`);

  await db.query(`create trigger url_update
  after update of path on files
  for each row
	execute procedure url();`);

  await db.end();
}

urlTrigger();
