const db = require('../client');

async function example() {
  await db.connect();
  await db.query(`set timezone = 'UTC'`);
  await db.query(`CREATE TYPE mood AS ENUM ('sad', 'ok', 'happy');`);
  await db.query(`
  DROP TABLE IF EXISTS ads_campaigns;
  CREATE TABLE IF NOT EXISTS ads_campaigns  (
  campaint_id serial primary key not NULL,
  campaign_user_id INT NOT NULL,
  campaign_title varchar(256) NOT NULL,
  campaign_start_date timestamp NOT NULL,
  campaign_end_date timestamp NOT NULL,
  campaign_budget float NOT NULL,
  campaign_spend float NOT NULL DEFAULT '0',
  campaign_bidding varchar(32) NOT NULL,
  audience_countries text NOT NULL,
  audience_gender varchar(32) NOT NULL,
  audience_relationship varchar(64) NOT NULL,
  ads_title varchar(255) DEFAULT NULL,
  ads_description text,
  ads_type varchar(32) NOT NULL,
  ads_url varchar(256) DEFAULT NULL,
  ads_page INT DEFAULT NULL,
  ads_group INT DEFAULT NULL,
  ads_event INT DEFAULT NULL,
  ads_placemen varchar(32) NOT NULL,
  ads_image varchar(256) NOT NULL,
  campaign_created_date timestamp NOT NULL,
  campaign_is_active varchar(32) NOT NULL DEFAULT '1',
  campaign_views INT NOT NULL DEFAULT '0',
  campaign_clicks INT NOT NULL DEFAULT '0'
  );
  `);
  await db.query(`
  DROP TABLE IF EXISTS ads_system;
  CREATE TABLE IF NOT EXISTS ads_system (
  ads_id serial primary key NOT NULL,
  title varchar(256) NOT NULL,
  place varchar(32) NOT NULL,
  code text NOT NULL,
  time timestamp NOT NULL 
  );
  `);
  await db.query(`
  DROP TABLE IF EXISTS ads_users_wallet_transactions;
  CREATE TABLE IF NOT EXISTS ads_users_wallet_transactions (
  transaction_id serial primary key NOT NULL,
  user_id INT NOT NULL,
  node_type varchar(32) NOT NULL,
  node_id INT DEFAULT NULL,
  amount varchar(32) NOT NULL,
  type varchar(32) NOT NULL,
  date timestamp NOT NULL
  );
  `);
  await db.query(`
  DROP TABLE IF EXISTS affiliates_payments;
  CREATE TABLE IF NOT EXISTS affiliates_payments (
  payment_id serial primary key NOT NULL,
  user_id INT NOT NULL,
  amount varchar(32) NOT NULL,
  method varchar(64) NOT NULL,
  method_value text NOT NULL,
  time timestamp NOT NULL,
  status boolean NOT NULL 
  );
  `);
  await db.query(`
  DROP TABLE IF EXISTS announcements;
  CREATE TABLE IF NOT EXISTS announcements (
  announcement_id serial PRIMARY KEY NOT NULL,
  name varchar(256) NOT NULL,
  title varchar(256) NOT NULL,
  type varchar(32) NOT NULL,
  code text NOT NULL,
  start_date timestamp NOT NULL,
  end_date timestamp NOT NULL 
  );
  `);
  await db.query(`
  DROP TABLE IF EXISTS announcements_users;
  CREATE TABLE IF NOT EXISTS announcements_users (
  id serial PRIMARY KEY NOT NULL,
  announcement_id INT NOT NULL,
  user_id INT NOT NULL
  );
  `);
  await db.query(`
  DROP TABLE IF EXISTS bank_transfers;
  CREATE TABLE IF NOT EXISTS bank_transfers (
  transfer_id serial PRIMARY KEY NOT NULL,
  user_id INT NOT NULL,
  handle varchar(32) NOT NULL,
  package_id INT DEFAULT NULL,
  price varchar(32) DEFAULT NULL,
  bank_receipt varchar(256) NOT NULL,
  time timestamp NOT NULL,
  status boolean NOT NULL DEFAULT FALSE
  );
  `);
  await db.query(`
  create type node_type as enum('ip','email','username');
  DROP TABLE IF EXISTS blacklist;
  CREATE TABLE IF NOT EXISTS blacklist (
  node_id serial PRIMARY KEY NOT NULL,
  node_type varchar(32) NOT NULL,
  node_value varchar(64) NOT NULL,
  created_time timestamp NOT NULL
  );
  `);

  await db.query(`
  DROP TABLE IF EXISTS blogs_categories;
  CREATE TABLE IF NOT EXISTS blogs_categories (
  category_id serial PRIMARY KEY NOT NULL,
  category_name varchar(256) NOT NULL,
  category_order INT NOT NULL DEFAULT '1'
  );
  `);

  await db.query(`
  DROP TABLE IF EXISTS blogs_categories;
  CREATE TABLE IF NOT EXISTS blogs_categories (
  category_id serial PRIMARY KEY NOT NULL,
  category_name varchar(256) NOT NULL,
  category_order INT NOT NULL DEFAULT '1'
  );
  `);

  await db.query(`
  INSERT INTO blogs_categories (category_id, category_name, category_order) VALUES
  (1, 'Art', 1),
  (2, 'Causes', 2),
  (3, 'Crafts', 3),
  (4, 'Dance', 4),
  (5, 'Drinks', 5),
  (6, 'Film', 6),
  (7, 'Fitness', 7),
  (8, 'Food', 8),
  (9, 'Games', 9),
  (10, 'Gardening', 10),
  (11, 'Health', 11),
  (12, 'Home', 12),
  (13, 'Literature', 13),
  (14, 'Music', 14),
  (15, 'Networking', 15),
  (16, 'Other', 16),
  (17, 'Party', 17),
  (18, 'Religion', 18),
  (19, 'Shopping', 19),
  (20, 'Sports', 20),
  (21, 'Theater', 21),
  (22, 'Wellness', 22);
  `);

  await db.query(`
  DROP TABLE IF EXISTS coinpayments_transactions;
  CREATE TABLE IF NOT EXISTS coinpayments_transactions (
  transaction_id serial PRIMARY KEY NOT NULL,
  transaction_txn_id text,
  user_id INT NOT NULL,
  amount varchar(32) NOT NULL,
  product text NOT NULL,
  created_at timestamp NOT NULL,
  last_update timestamp NOT NULL,
  status boolean NOT NULL,
  status_message text
  );
  `);

  await db.query(`
  DROP TABLE IF EXISTS conversations;
  CREATE TABLE IF NOT EXISTS conversations (
  conversation_id serial PRIMARY KEY NOT NULL,
  last_message_id INT NOT NULL,
  color varchar(32) DEFAULT NULL);
  `);

  await db.query(`
  DROP TABLE IF EXISTS conversations_calls_audio;
  CREATE TABLE IF NOT EXISTS conversations_calls_audio (
  call_id serial PRIMARY KEY NOT NULL,
  from_user_id INT NOT NULL,
  from_user_token text NOT NULL,
  to_user_id INT NOT NULL,
  to_user_token text NOT NULL,
  room varchar(64) NOT NULL,
  answered boolean NOT NULL DEFAULT FALSE,
  declined boolean NOT NULL DEFAULT FALSE,
  created_time timestamp NOT NULL,
  updated_time timestamp NOT NULL);
  `);

  await db.query(`
  DROP TABLE IF EXISTS conversations_messages;
  CREATE TABLE IF NOT EXISTS conversations_messages (
  message_id serial PRIMARY KEY NOT NULL,
  conversation_id INT NOT NULL,
  user_id INT NOT NULL,
  message text NOT NULL,
  image varchar(256) NOT NULL,
  voice_note varchar(256) NOT NULL,
  time timestamp NOT NULL);
  `);

  await db.query(`
  DROP TABLE IF EXISTS affiliates_payments;
  CREATE TABLE IF NOT EXISTS affiliates_payments (
  payment_id serial PRIMARY KEY NOT NULL,
  user_id INT NOT NULL,
  amount varchar(32) NOT NULL,
  method varchar(64) NOT NULL,
  method_value text NOT NULL,
  time timestamp NOT NULL,
  status boolean NOT NULL);
  `);

  await db.query(`
  DROP TABLE IF EXISTS custom_fields;
  CREATE TABLE IF NOT EXISTS custom_fields (
  field_id serial PRIMARY KEY NOT NULL,
  field_for varchar(32) NOT NULL DEFAULT 'user',
  type varchar(32) NOT NULL,
  select_options text NOT NULL,
  label varchar(256) NOT NULL,
  description text NOT NULL,
  place varchar(32) NOT NULL,
  length INT NOT NULL DEFAULT '32',
  field_order INT NOT NULL DEFAULT '1',
  mandatory boolean NOT NULL DEFAULT FALSE,
  in_registration boolean NOT NULL DEFAULT FALSE,
  in_profile boolean NOT NULL DEFAULT FALSE);
  `);

  await db.query(`
  DROP TABLE IF EXISTS custom_fields_values;
  CREATE TABLE IF NOT EXISTS custom_fields_values (
  value_id serial PRIMARY KEY NOT NULL,
  value text NOT NULL,
  field_id INT NOT NULL,
  node_id INT NOT NULL,
  node_type varchar(32) NOT NULL);
  `);

  await db.query(`
  DROP TABLE IF EXISTS developers_apps;
  CREATE TABLE IF NOT EXISTS developers_apps (
  app_id serial PRIMARY KEY NOT NULL,
  app_user_id INT NOT NULL,
  app_category_id INT NOT NULL,
  app_auth_id varchar(128) UNIQUE NOT NULL,
  app_auth_secret varchar(128) UNIQUE NOT NULL,
  app_name varchar(256) NOT NULL,
  app_domain varchar(256) NOT NULL,
  app_redirect_url varchar(256) NOT NULL,
  app_description text NOT NULL,
  app_icon varchar(256) NOT NULL,
  app_date timestamp NOT NULL);
  `);

  await db.query(`
  DROP TABLE IF EXISTS developers_apps_categories;
  CREATE TABLE IF NOT EXISTS developers_apps_categories (
  category_id serial PRIMARY KEY NOT NULL,
  category_name varchar(256) NOT NULL,
  category_order INT NOT NULL DEFAULT '1');
  `);

  await db.query(`
  INSERT INTO developers_apps_categories (category_id, category_name, category_order) VALUES
  (1, 'Business and Pages', 1),
  (2, 'Community &amp; Government', 2),
  (3, 'Education', 3),
  (4, 'Entertainment', 4),
  (5, 'Entertainment', 5),
  (6, 'Games', 6),
  (7, 'Lifestyle', 7),
  (8, 'Messaging', 8),
  (9, 'News', 9),
  (10, 'Shopping', 10),
  (11, 'Social Networks &amp; Dating', 11),
  (12, 'Utility &amp; Productivity', 12);
  `);

  await db.query(`
  DROP TABLE IF EXISTS developers_apps_users;
  CREATE TABLE IF NOT EXISTS developers_apps_users (
  id serial PRIMARY KEY NOT NULL,
  app_id INT NOT NULL,
  user_id INT NOT NULL,
  auth_key varchar(128) NOT NULL,
  access_token varchar(128) DEFAULT NULL,
  access_token_date timestamp DEFAULT NULL);
  `);

  await db.query(`
  DROP TABLE IF EXISTS emojis;
  CREATE TABLE IF NOT EXISTS emojis (
  emoji_id serial PRIMARY KEY NOT NULL,
  pattern varchar(256) NOT NULL,
  class varchar(256) NOT NULL);
  `);

  await db.query(`
  INSERT INTO emojis (emoji_id, pattern, class) VALUES
  (1, ':)', 'smile'),
  (2, '(&lt;', 'joy'),
  (3, ':D', 'smiley'),
  (4, ':(', 'worried'),
  (5, ':relaxed:', 'relaxed'),
  (6, ':P', 'stuck-out-tongue'),
  (7, ':O', 'open-mouth'),
  (8, ':/', 'confused'),
  (9, ';)', 'wink'),
  (10, ';(', 'sob'),
  (11, 'B|', 'sunglasses'),
  (12, ':disappointed:', 'disappointed'),
  (13, ':yum:', 'yum'),
  (14, '^_^', 'grin'),
  (15, ':no_mouth:', 'no-mouth'),
  (16, '*_*', 'heart-eyes'),
  (17, '*)', 'kissing-heart'),
  (18, 'O:)', 'innocent'),
  (19, ':angry:', 'angry'),
  (20, ':rage:', 'rage'),
  (21, ':smirk:', 'smirk'),
  (22, ':flushed:', 'flushed'),
  (23, ':satisfied:', 'satisfied'),
  (24, ':relieved:', 'relieved'),
  (25, ':sleeping:', 'sleeping'),
  (26, ':stuck_out_tongue:', 'stuck-out-tongue'),
  (27, ':stuck_out_tongue_closed_eyes:', 'stuck-out-tongue-closed-eyes'),
  (28, ':frowning:', 'frowning'),
  (29, ':anguished:', 'anguished'),
  (30, ':open_mouth:', 'open-mouth'),
  (31, ':grimacing:', 'grimacing'),
  (32, ':hushed:', 'hushed'),
  (33, ':expressionless:', 'expressionless'),
  (34, ':unamused:', 'unamused'),
  (35, ':sweat_smile:', 'sweat-smile'),
  (36, ':sweat:', 'sweat'),
  (37, ':confounded:', 'confounded'),
  (38, ':weary:', 'weary'),
  (39, ':pensive:', 'pensive'),
  (40, ':fearful:', 'fearful'),
  (41, ':cold_sweat:', 'cold-sweat'),
  (42, ':persevere:', 'persevere'),
  (43, ':cry:', 'cry'),
  (44, ':astonished:', 'astonished'),
  (45, ':scream:', 'scream'),
  (46, ':mask:', 'mask'),
  (47, ':tired_face:', 'tired-face'),
  (48, ':triumph:', 'triumph'),
  (49, ':dizzy_face:', 'dizzy-face'),
  (50, ':imp:', 'imp'),
  (51, ':smiling_imp:', 'smiling-imp'),
  (52, ':neutral_face:', 'neutral-face'),
  (53, ':alien:', 'alien'),
  (54, ':yellow_heart:', 'yellow-heart'),
  (55, ':blue_heart:', 'blue-heart'),
  (56, ':blue_heart:', 'blue-heart'),
  (57, ':heart:', 'heart'),
  (58, ':green_heart:', 'green-heart'),
  (59, ':broken_heart:', 'broken-heart'),
  (60, ':heartbeat:', 'heartbeat'),
  (61, ':heartpulse:', 'heartpulse'),
  (62, ':two_hearts:', 'two-hearts'),
  (63, ':revolving_hearts:', 'revolving-hearts'),
  (64, ':cupid:', 'cupid'),
  (65, ':sparkling_heart:', 'sparkling-heart'),
  (66, ':sparkles:', 'sparkles'),
  (67, ':star:', 'star'),
  (68, ':star2:', 'star2'),
  (69, ':dizzy:', 'dizzy'),
  (70, ':boom:', 'boom'),
  (71, ':exclamation:', 'exclamation'),
  (72, ':anger:', 'anger'),
  (73, ':question:', 'question'),
  (74, ':grey_exclamation:', 'grey-exclamation'),
  (75, ':grey_question:', 'grey-question'),
  (76, ':zzz:', 'zzz'),
  (77, ':dash:', 'dash'),
  (78, ':sweat_drops:', 'sweat-drops'),
  (79, ':notes:', 'notes'),
  (80, ':musical_note:', 'musical-note'),
  (81, ':fire:', 'fire'),
  (82, ':poop:', 'poop'),
  (83, ':thumbsup:', 'thumbsup'),
  (84, ':thumbsdown:', 'thumbsdown'),
  (85, ':ok_hand:', 'ok-hand'),
  (86, ':punch:', 'punch'),
  (87, ':fist:', 'fist'),
  (88, ':v:', 'v'),
  (89, ':wave:', 'wave'),
  (90, ':hand:', 'hand'),
  (91, ':raised_hand:', 'raised-hand'),
  (92, ':open_hands:', 'open-hands'),
  (93, ':point_up:', 'point-up'),
  (94, ':point_down:', 'point-down'),
  (95, ':point_left:', 'point-left'),
  (96, ':point_right:', 'point-right'),
  (97, ':raised_hands:', 'raised-hands'),
  (98, ':pray:', 'pray'),
  (99, ':clap:', 'clap'),
  (100, ':muscle:', 'muscle'),
  (101, ':runner:', 'runner'),
  (102, ':couple:', 'couple'),
  (103, ':family:', 'family'),
  (104, ':two_men_holding_hands:', 'two-men-holding-hands'),
  (105, ':two_women_holding_hands:', 'two-women-holding-hands'),
  (106, ':dancer:', 'dancer'),
  (107, ':dancers:', 'dancers'),
  (108, ':ok_woman:', 'ok-woman'),
  (109, ':no_good:', 'no-good'),
  (110, ':information_desk_person:', 'information-desk-person'),
  (111, ':bride_with_veil:', 'bride-with-veil'),
  (112, ':couplekiss:', 'couplekiss'),
  (113, ':couple_with_heart:', 'couple-with-heart'),
  (114, ':nail_care:', 'nail-care'),
  (115, ':boy:', 'boy'),
  (116, ':girl:', 'girl'),
  (117, ':woman:', 'woman'),
  (118, ':man:', 'man'),
  (119, ':baby:', 'baby'),
  (120, ':older_woman:', 'older-woman'),
  (121, ':older_man:', 'older-man'),
  (122, ':cop:', 'cop'),
  (123, ':angel:', 'angel'),
  (124, ':princess:', 'princess'),
  (125, ':smiley_cat:', 'smiley-cat'),
  (126, ':smile_cat:', 'smile-cat'),
  (127, ':heart_eyes_cat:', 'heart-eyes-cat'),
  (128, ':kissing_cat:', 'kissing-cat'),
  (129, ':smirk_cat:', 'smirk-cat'),
  (130, ':scream_cat:', 'scream-cat'),
  (131, ':crying_cat_face:', 'crying-cat-face'),
  (132, ':joy_cat:', 'joy-cat'),
  (133, ':pouting_cat:', 'pouting-cat'),
  (134, ':japanese_ogre:', 'japanese-ogre'),
  (135, ':see_no_evil:', 'see-no-evil'),
  (136, ':hear_no_evil:', 'hear-no-evil'),
  (137, ':speak_no_evil:', 'speak-no-evil'),
  (138, ':guardsman:', 'guardsman'),
  (139, ':skull:', 'skull'),
  (140, ':feet:', 'feet'),
  (141, ':lips:', 'lips'),
  (142, ':kiss:', 'kiss'),
  (143, ':droplet:', 'droplet'),
  (144, ':ear:', 'ear'),
  (145, ':eyes:', 'eyes'),
  (146, ':nose:', 'nose'),
  (147, ':tongue:', 'tongue'),
  (148, ':love_letter:', 'love-letter'),
  (149, ':speech_balloon:', 'speech-balloon'),
  (150, ':thought_balloon:', 'thought-balloon'),
  (151, ':sunny:', 'sunny');
  `);

  await db.query(`
  DROP TABLE IF EXISTS events;
  CREATE TABLE IF NOT EXISTS events (
  event_id serial PRIMARY KEY NOT NULL,
  event_privacy varchar(32) DEFAULT 'public',
  event_admin INT NOT NULL,
  event_category INT NOT NULL,
  event_title varchar(256) NOT NULL,
  event_location varchar(256) DEFAULT NULL,
  event_description text NOT NULL,
  event_start_date timestamp NOT NULL,
  event_end_date timestamp NOT NULL,
  event_publish_enabled boolean NOT NULL DEFAULT TRUE,
  event_publish_approval_enabled boolean NOT NULL DEFAULT FALSE,
  event_cover varchar(256) DEFAULT NULL,
  event_cover_id INT DEFAULT NULL,
  event_cover_position varchar(256) DEFAULT NULL,
  event_album_covers INT DEFAULT NULL,
  event_album_timeline INT DEFAULT NULL,
  event_pinned_post INT DEFAULT NULL,
  event_invited INT NOT NULL DEFAULT '0',
  event_interested INT NOT NULL DEFAULT '0',
  event_going INT NOT NULL DEFAULT '0',
  event_date timestamp NOT NULL
  );`);

  await db.query(`
  DROP TABLE IF EXISTS events_categories;
  CREATE TABLE IF NOT EXISTS events_categories (
  category_id serial PRIMARY KEY NOT NULL,
  category_name varchar(256) NOT NULL,
  category_order INT NOT NULL DEFAULT '1'
  );
  `);

  await db.query(`
  INSERT INTO events_categories (category_id, category_name, category_order) VALUES
  (1, 'Art', 1),
  (2, 'Causes', 2),
  (3, 'Crafts', 3),
  (4, 'Dance', 4),
  (5, 'Drinks', 5),
  (6, 'Film', 6),
  (7, 'Fitness', 7),
  (8, 'Food', 8),
  (9, 'Games', 9),
  (10, 'Gardening', 10),
  (11, 'Health', 11),
  (12, 'Home', 12),
  (13, 'Literature', 13),
  (14, 'Music', 14),
  (15, 'Networking', 15),
  (16, 'Other', 16),
  (17, 'Party', 17),
  (18, 'Religion', 18),
  (19, 'Shopping', 19),
  (20, 'Sports', 20),
  (21, 'Theater', 21),
  (22, 'Wellness', 22);
  `);

  await db.query(`
  DROP TABLE IF EXISTS events_members;
  CREATE TABLE IF NOT EXISTS events_members (
  id serial PRIMARY KEY NOT NULL,
  event_id INT NOT NULL,
  user_id INT NOT NULL,
  is_invited boolean DEFAULT FALSE,
  is_interested boolean DEFAULT FALSE,
  is_going boolean DEFAULT FALSE);
  `);

  await db.query(`
  DROP TABLE IF EXISTS followings;
  CREATE TABLE IF NOT EXISTS followings (
  id serial PRIMARY KEY NOT NULL,
  user_id INT NOT NULL,
  following_id INT NOT NULL);
  `);

  await db.query(`
  DROP TABLE IF EXISTS forums;
  CREATE TABLE IF NOT EXISTS forums (
  forum_id serial PRIMARY KEY NOT NULL,
  forum_section INT NOT NULL,
  forum_name varchar(256) NOT NULL,
  forum_description text,
  forum_order INT NOT NULL DEFAULT '1',
  forum_threads INT NOT NULL DEFAULT '0',
  forum_replies INT NOT NULL DEFAULT '0');
  `);

  await db.query(`
  DROP TABLE IF EXISTS forums_replies;
  CREATE TABLE IF NOT EXISTS forums_replies (
  reply_id serial PRIMARY KEY NOT NULL,
  thread_id INT NOT NULL,
  user_id INT NOT NULL,
  text text NOT NULL,
  time timestamp NOT NULL);
  `);

  await db.query(`
  DROP TABLE IF EXISTS forums_threads;
  CREATE TABLE IF NOT EXISTS forums_threads (
  thread_id serial PRIMARY KEY NOT NULL,
  forum_id INT NOT NULL,
  user_id INT NOT NULL,
  title varchar(256) NOT NULL,
  text text NOT NULL,
  replies INT NOT NULL DEFAULT '0',
  views INT NOT NULL DEFAULT '0',
  time timestamp NOT NULL,
  last_reply timestamp DEFAULT NULL);
  `);

  await db.query(`
  DROP TABLE IF EXISTS friends;
  CREATE TABLE IF NOT EXISTS friends (
  id serial PRIMARY KEY NOT NULL,
  user_one_id INT NOT NULL,
  user_two_id INT NOT NULL,
  status boolean NOT NULL);
  `);

  await db.query(`
  DROP TABLE IF EXISTS games;
  CREATE TABLE IF NOT EXISTS games (
  game_id serial PRIMARY KEY NOT NULL,
  title varchar(256) NOT NULL,
  description text NOT NULL,
  source text NOT NULL,
  thumbnail varchar(256) NOT NULL);
  `);

  await db.query(`
  DROP TABLE IF EXISTS games_players;
  CREATE TABLE IF NOT EXISTS games_players (
  id serial PRIMARY KEY NOT NULL,
  game_id INT NOT NULL,
  user_id INT NOT NULL,
  last_played_time timestamp DEFAULT NULL);
  `);

  await db.query(`
  DROP TABLE IF EXISTS gifts;
  CREATE TABLE IF NOT EXISTS gifts (
  gift_id serial PRIMARY KEY NOT NULL,
  image varchar(256) NOT NULL);
  `);

  await db.query(`
  DROP TABLE IF EXISTS groups;
  CREATE TABLE IF NOT EXISTS groups (
  group_id serial PRIMARY KEY NOT NULL,
  group_privacy varchar(32) DEFAULT 'public',
  group_admin INT NOT NULL,
  group_category INT NOT NULL,
  group_name varchar(64) NOT NULL,
  group_title varchar(256) NOT NULL,
  group_description text NOT NULL,
  group_publish_enabled boolean NOT NULL DEFAULT TRUE,
  group_publish_approval_enabled boolean NOT NULL DEFAULT FALSE,
  group_picture varchar(256) DEFAULT NULL,
  group_picture_id INT DEFAULT NULL,
  group_cover varchar(256) DEFAULT NULL,
  group_cover_id INT DEFAULT NULL,
  group_cover_position varchar(256) DEFAULT NULL,
  group_album_pictures INT DEFAULT NULL,
  group_album_covers INT DEFAULT NULL,
  group_album_timeline INT DEFAULT NULL,
  group_pinned_post INT DEFAULT NULL,
  group_members INT NOT NULL DEFAULT '0',
  group_date timestamp NOT NULL;
  `);
  await db.query(` 
  TABLE IF EXISTS groups_admins;
  CREATE TABLE IF NOT EXISTS groups_admins (
  id serial PRIMARY KEY NOT NULL,
  group_id INT NOT NULL,
  user_id INT NOT NULL);
  `);
  await db.query(` 
  DROP TABLE IF EXISTS groups_categories;
  CREATE TABLE IF NOT EXISTS groups_categories (
  category_id serial PRIMARY KEY NOT NULL,
  category_name varchar(256) NOT NULL,
  category_order INT NOT NULL DEFAULT '1');`);

  await db.query(` 
  INSERT INTO groups_categories (category_id, category_name, category_order) VALUES
  (1, 'Cars and Vehicles', 1),
  (2, 'Comedy', 2),
  (3, 'Economics and Trade', 3),
  (4, 'Education', 4),
  (5, 'Entertainment', 5),
  (6, 'Movies and Animation', 6),
  (7, 'Gaming', 7),
  (8, 'History and Facts', 8),
  (9, 'Live Style', 9),
  (10, 'Natural', 10),
  (11, 'News and Politics', 11),
  (12, 'People and Nations', 12),
  (13, 'Pets and Animals', 13),
  (14, 'Places and Regions', 14),
  (15, 'Science and Technology', 15),
  (16, 'Sport', 16),
  (17, 'Travel and Events', 17),
  (18, 'Other', 18);`);
  await db.query(` DROP TABLE IF EXISTS groups_members;
  CREATE TABLE IF NOT EXISTS groups_members (
  id serial PRIMARY KEY NOT NULL,
  group_id INT NOT NULL,
  user_id INT NOT NULL,
  approved boolean NOT NULL DEFAULT FALSE);`);
  await db.query(` DROP TABLE IF EXISTS hashtags;
  CREATE TABLE IF NOT EXISTS hashtags (
  hashtag_id serial PRIMARY KEY NOT NULL,
  hashtag varchar(256) NOT NULL);`);

  await db.query(` DROP TABLE IF EXISTS hashtags_posts;
  CREATE TABLE IF NOT EXISTS hashtags_posts (
  id serial PRIMARY KEY NOT NULL,
  post_id INT NOT NULL,
  hashtag_id INT NOT NULL,
  created_at timestamp DEFAULT NULL);`);
  await db.query(`DROP TABLE IF EXISTS invitation_codes;
  CREATE TABLE IF NOT EXISTS invitation_codes (
  code_id serial PRIMARY KEY NOT NULL,
  code varchar(64) NOT NULL,
  valid boolean NOT NULL DEFAULT TRUE,
  date timestamp NOT NULL);`);
  await db.query(` DROP TABLE IF EXISTS jobs_categories;
  CREATE TABLE IF NOT EXISTS jobs_categories (
  category_id serial PRIMARY KEY NOT NULL,
  category_name varchar(256) NOT NULL,
  category_order INT NOT NULL DEFAULT '1');`);
  await db.query(`
  INSERT INTO jobs_categories (category_id, category_name, category_order) VALUES
  (1, 'Admin &amp; Office', 1),
  (2, 'Art &amp; Design', 2),
  (3, 'Business Operations', 3),
  (4, 'Cleaning &amp; Facilities', 4),
  (5, 'Community &amp; Social Services', 5),
  (6, 'Computer &amp; Data', 6),
  (7, 'Construction &amp; Mining', 7),
  (8, 'Education', 8),
  (9, 'Farming &amp; Forestry', 9),
  (10, 'Healthcare', 10),
  (11, 'Installation, Maintenance &amp; Repair', 11),
  (12, 'Legal', 12),
  (13, 'Management', 13),
  (14, 'Manufacturing', 14),
  (15, 'Media &amp; Communication', 15),
  (16, 'Personal Care', 16),
  (17, 'Protective Services', 17),
  (18, 'Restaurant &amp; Hospitality', 18),
  (19, 'Retail &amp; Sales', 19),
  (20, 'Science &amp; Engineering', 20),
  (21, 'Sports &amp; Entertainment', 21),
  (22, 'Transportation', 22),
  (23, 'Other', 23);
  `);
  await db.query(` DROP TABLE IF EXISTS market_categories;
  CREATE TABLE IF NOT EXISTS market_categories (
  category_id serial PRIMARY KEY NOT NULL,
  category_name varchar(256) NOT NULL,
  category_order INT NOT NULL DEFAULT '1');`);
  await db.query(`
  INSERT INTO market_categories (category_id, category_name, category_order) VALUES
  (1, 'Apparel &amp; Accessories', 1),
  (2, 'Autos &amp; Vehicles', 2),
  (3, 'Baby &amp; Children&#039;s Products', 3),
  (4, 'Beauty Products &amp; Services', 4),
  (5, 'Computers &amp; Peripherals', 5),
  (6, 'Consumer Electronics', 6),
  (7, 'Dating Services', 7),
  (8, 'Financial Services', 8),
  (9, 'Gifts &amp; Occasions', 9),
  (10, 'Home &amp; Garden', 10),
  (11, 'Other', 11);
  `);
  await db.query(` DROP TABLE IF EXISTS movies;
  CREATE TABLE IF NOT EXISTS movies (
  movie_id serial PRIMARY KEY NOT NULL,
  source text NOT NULL,
  source_type varchar(64) NOT NULL,
  title varchar(256) NOT NULL,
  description text,
  imdb_url text,
  stars text,
  release_year INT DEFAULT NULL,
  duration INT DEFAULT NULL,
  genres text,
  poster varchar(256) DEFAULT NULL,
  views INT NOT NULL DEFAULT '0');`);
  await db.query(` DROP TABLE IF EXISTS movies_genres;
  CREATE TABLE IF NOT EXISTS movies_genres (
  genre_id serial PRIMARY KEY NOT NULL,
  genre_name varchar(256) NOT NULL,
  genre_order INT NOT NULL DEFAULT '1',
  genre_description text NOT NULL);`);
  await db.query(`
  INSERT INTO movies_genres (genre_id, genre_name, genre_order, genre_description) VALUES
  (1, 'Action', 1, ''),
  (2, 'Adventure', 2, ''),
  (3, 'Animation', 3, ''),
  (4, 'Comedy', 4, ''),
  (5, 'Crime', 5, ''),
  (6, 'Documentary', 6, ''),
  (7, 'Drama', 7, ''),
  (8, 'Family', 8, ''),
  (9, 'Fantasy', 9, ''),
  (10, 'History', 10, ''),
  (11, 'Horror', 11, ''),
  (12, 'Musical', 12, ''),
  (13, 'Mythological', 13, ''),
  (14, 'Romance', 14, ''),
  (15, 'Sport', 15, ''),
  (16, 'TV Show', 16, ''),
  (17, 'Thriller', 17, ''),
  (18, 'War', 18, '');`);
  await db.query(` DROP TABLE IF EXISTS notifications;
  CREATE TABLE IF NOT EXISTS notifications (
  notification_id serial PRIMARY KEY NOT NULL,
  to_user_id INT NOT NULL,
  from_user_id INT NOT NULL,
  action varchar(256) NOT NULL,
  node_type varchar(256) NOT NULL,
  node_url varchar(256) NOT NULL,
  notify_id varchar(256) DEFAULT NULL,
  message text,
  time timestamp DEFAULT NULL,
  seen boolean NOT NULL DEFAULT FALSE);`);
  await db.query(` DROP TABLE IF EXISTS offers_categories;
  CREATE TABLE IF NOT EXISTS offers_categories (
  category_id serial PRIMARY KEY NOT NULL,
  category_name varchar(256) NOT NULL,
  category_order INT NOT NULL DEFAULT '1');`);
  await db.query(`
  INSERT INTO offers_categories (category_id, category_name, category_order) VALUES
  (1, 'Apparel &amp; Accessories', 1),
  (2, 'Autos &amp; Vehicles', 2),
  (3, 'Baby &amp; Children&#039;s Products', 3),
  (4, 'Beauty Products &amp; Services', 4),
  (5, 'Computers &amp; Peripherals', 5),
  (6, 'Consumer Electronics', 6),
  (7, 'Dating Services', 7),
  (8, 'Financial Services', 8),
  (9, 'Gifts &amp; Occasions', 9),
  (10, 'Home &amp; Garden', 10),
  (11, 'Other', 11);
  `);
  await db.query(` DROP TABLE IF EXISTS packages;
  CREATE TABLE IF NOT EXISTS packages (
  package_id serial PRIMARY KEY NOT NULL,
  name varchar(256) NOT NULL,
  price varchar(32) NOT NULL,
  period_num INT NOT NULL,
  period varchar(32) NOT NULL,
  color varchar(32) NOT NULL,
  icon varchar(256) NOT NULL,
  verification_badge_enabled boolean NOT NULL DEFAULT FALSE,
  boost_posts_enabled boolean NOT NULL DEFAULT FALSE,
  boost_posts INT NOT NULL,
  boost_pages_enabled boolean NOT NULL DEFAULT FALSE,
  boost_pages INT NOT NULL);`);
  await db.query(` DROP TABLE IF EXISTS packages_payments;
  CREATE TABLE IF NOT EXISTS packages_payments (
  payment_id serial PRIMARY KEY NOT NULL,
  payment_date timestamp NOT NULL,
  package_name varchar(256) NOT NULL,
  package_price varchar(32) NOT NULL);`);
  await db.query(` DROP TABLE IF EXISTS pages;
  CREATE TABLE IF NOT EXISTS pages (
  page_id serial PRIMARY KEY NOT NULL,
  page_admin INT NOT NULL,
  page_category INT NOT NULL,
  page_name varchar(64) NOT NULL,
  page_title varchar(256) NOT NULL,
  page_picture varchar(256) DEFAULT NULL,
  page_picture_id INT DEFAULT NULL,
  page_cover varchar(256) DEFAULT NULL,
  page_cover_id INT DEFAULT NULL,
  page_cover_position varchar(256) DEFAULT NULL,
  page_album_pictures INT DEFAULT NULL,
  page_album_covers INT DEFAULT NULL,
  page_album_timeline INT DEFAULT NULL,
  page_pinned_post INT DEFAULT NULL,
  page_verified boolean NOT NULL DEFAULT FALSE,
  page_boosted boolean NOT NULL DEFAULT FALSE,
  page_boosted_by INT DEFAULT NULL,
  page_company varchar(256) DEFAULT NULL,
  page_phone varchar(256) DEFAULT NULL,
  page_website varchar(256) DEFAULT NULL,
  page_location varchar(256) DEFAULT NULL,
  page_description text NOT NULL,
  page_action_text varchar(32) DEFAULT NULL,
  page_action_color varchar(32) DEFAULT NULL,
  page_action_url varchar(256) DEFAULT NULL,
  page_social_facebook varchar(256) DEFAULT NULL,
  page_social_twitter varchar(256) DEFAULT NULL,
  page_social_youtube varchar(256) DEFAULT NULL,
  page_social_instagram varchar(256) DEFAULT NULL,
  page_social_linkedin varchar(256) DEFAULT NULL,
  page_social_vkontakte varchar(256) DEFAULT NULL,
  page_likes INT NOT NULL DEFAULT FALSE,
  page_date timestamp NOT NULL);`);
  await db.query(` DROP TABLE IF EXISTS pages_admins;
  CREATE TABLE IF NOT EXISTS pages_admins (
  id serial PRIMARY KEY NOT NULL,
  page_id INT NOT NULL,
  user_id INT NOT NULL);`);
  await db.query(` DROP TABLE IF EXISTS pages_categories;
  CREATE TABLE IF NOT EXISTS pages_categories (
  category_id serial PRIMARY KEY NOT NULL,
  category_name varchar(256) NOT NULL,
  category_order INT NOT NULL DEFAULT '1');`);
  await db.query(`
  INSERT INTO pages_categories (category_id, category_name, category_order) VALUES
  (1, 'Cars and Vehicles', 1),
  (2, 'Comedy', 2),
  (3, 'Economics and Trade', 3),
  (4, 'Education', 4),
  (5, 'Entertainment', 5),
  (6, 'Movies and Animation', 6),
  (7, 'Gaming', 7),
  (8, 'History and Facts', 8),
  (9, 'Live Style', 9),
  (10, 'Natural', 10),
  (11, 'News and Politics', 11),
  (12, 'People and Nations', 12),
  (13, 'Pets and Animals', 13),
  (14, 'Places and Regions', 14),
  (15, 'Science and Technology', 15),
  (16, 'Sport', 16),
  (17, 'Travel and Events', 17),
  (18, 'Other', 18);`);
  await db.query(` DROP TABLE IF EXISTS pages_invites;
  CREATE TABLE IF NOT EXISTS pages_invites (
  id serial PRIMARY KEY NOT NULL,
  page_id INT NOT NULL,
  user_id INT NOT NULL,
  from_user_id INT NOT NULL);`);
  await db.query(` DROP TABLE IF EXISTS pages_likes;
  CREATE TABLE IF NOT EXISTS pages_likes (
  id serial PRIMARY KEY NOT NULL,
  page_id INT NOT NULL,
  user_id INT NOT NULL);`);
  await db.query(` DROP TABLE IF EXISTS points_payments;
  CREATE TABLE IF NOT EXISTS points_payments (
  payment_id serial PRIMARY KEY NOT NULL,
  user_id INT NOT NULL,
  amount varchar(32) NOT NULL,
  method varchar(64) NOT NULL,
  method_value text NOT NULL,
  time timestamp NOT NULL,
  status boolean NOT NULL);`);
  await db.query(` DROP TABLE IF EXISTS posts;
  CREATE TABLE IF NOT EXISTS posts (
  post_id serial PRIMARY KEY NOT NULL,
  user_id INT NOT NULL,
  user_type varchar(32) NOT NULL,
  in_group boolean NOT NULL DEFAULT FALSE,
  group_id INT DEFAULT NULL,
  group_approved boolean NOT NULL DEFAULT TRUE,
  in_event boolean NOT NULL DEFAULT FALSE,
  event_id INT DEFAULT NULL,
  event_approved boolean NOT NULL DEFAULT TRUE,
  in_wall boolean NOT NULL DEFAULT FALSE,
  wall_id INT DEFAULT NULL,
  post_type varchar(32) NOT NULL,
  colored_pattern INT DEFAULT NULL,
  origin_id INT DEFAULT NULL,
  time timestamp NOT NULL,
  location varchar(256) DEFAULT NULL,
  privacy varchar(32) NOT NULL,
  text text,
  feeling_action varchar(32) DEFAULT NULL,
  feeling_value varchar(256) DEFAULT NULL,
  boosted boolean NOT NULL DEFAULT FALSE,
  boosted_by INT DEFAULT NULL,
  comments_disabled boolean NOT NULL DEFAULT FALSE,
  is_hidden boolean NOT NULL DEFAULT FALSE,
  is_anonymous boolean NOT NULL DEFAULT FALSE,
  reaction_like_count INT NOT NULL DEFAULT '0',
  reaction_love_count INT NOT NULL DEFAULT '0',
  reaction_haha_count INT NOT NULL DEFAULT '0',
  reaction_yay_count INT NOT NULL DEFAULT '0',
  reaction_wow_count INT NOT NULL DEFAULT '0',
  reaction_sad_count INT NOT NULL DEFAULT '0',
  reaction_angry_count INT NOT NULL DEFAULT '0',
  comments INT NOT NULL DEFAULT '0',
  shares INT NOT NULL DEFAULT '0',
  points_earned boolean NOT NULL DEFAULT FALSE);`);
  await db.query(` DROP TABLE IF EXISTS posts_articles;
  CREATE TABLE IF NOT EXISTS posts_articles (
  article_id serial PRIMARY KEY NOT NULL,
  post_id INT NOT NULL,
  cover varchar(256) NOT NULL,
  title varchar(256) NOT NULL,
  text text NOT NULL,
  category_id INT NOT NULL,
  tags text NOT NULL,
  views INT NOT NULL DEFAULT '0');`);
  await db.query(` DROP TABLE IF EXISTS posts_audios;
  CREATE TABLE IF NOT EXISTS posts_audios (
  audio_id serial PRIMARY KEY NOT NULL,
  post_id INT NOT NULL,
  source varchar(256) NOT NULL,
  views INT NOT NULL DEFAULT '0');`);
  await db.query(` DROP TABLE IF EXISTS posts_colored_patterns;
  CREATE TABLE IF NOT EXISTS posts_colored_patterns (
  pattern_id serial PRIMARY KEY NOT NULL,
  type varchar(32) NOT NULL DEFAULT 'color',
  background_image varchar(256) DEFAULT NULL,
  background_color_1 varchar(32) DEFAULT NULL,
  background_color_2 varchar(32) DEFAULT NULL,
  text_color varchar(32) DEFAULT NULL);`);
  await db.query(`INSERT INTO posts_colored_patterns (pattern_id, type, background_image, background_color_1, background_color_2, text_color) VALUES
  (1, 'image', 'patterns/1.jpg', NULL, NULL, '#FFFFFF'),
  (2, 'image', 'patterns/2.jpg', NULL, NULL, '#FFFFFF'),
  (3, 'image', 'patterns/3.jpg', NULL, NULL, '#FFFFFF'),
  (4, 'image', 'patterns/4.jpg', '', '', '#000000'),
  (5, 'image', 'patterns/5.jpg', NULL, NULL, '#FFFFFF'),
  (6, 'color', NULL, '#FF00FF', '#030355', '#FFF300'),
  (7, 'color', '', '#FF003D', '#D73A3A', '#FFFFFF');`);
  await db.query(` DROP TABLE IF EXISTS posts_comments;
  CREATE TABLE IF NOT EXISTS posts_comments (
  comment_id serial PRIMARY KEY NOT NULL,
  node_id INT NOT NULL,
  node_type varchar(32) NOT NULL,
  user_id INT NOT NULL,
  user_type varchar(32) NOT NULL,
  text text NOT NULL,
  image varchar(256) DEFAULT NULL,
  voice_note varchar(256) DEFAULT NULL,
  time timestamp NOT NULL,
  reaction_like_count INT NOT NULL DEFAULT '0',
  reaction_love_count INT NOT NULL DEFAULT '0',
  reaction_haha_count INT NOT NULL DEFAULT '0',
  reaction_yay_count INT NOT NULL DEFAULT '0',
  reaction_wow_count INT NOT NULL DEFAULT '0',
  reaction_sad_count INT NOT NULL DEFAULT '0',
  reaction_angry_count INT NOT NULL DEFAULT '0',
  replies INT NOT NULL DEFAULT '0',
  points_earned boolean NOT NULL DEFAULT FALSE);`);
  await db.query(` DROP TABLE IF EXISTS posts_comments_reactions;
  CREATE TABLE IF NOT EXISTS posts_comments_reactions (
  id serial PRIMARY KEY NOT NULL,
  comment_id INT NOT NULL,
  user_id INT NOT NULL,
  reaction varchar(32) DEFAULT 'like',
  reaction_time timestamp DEFAULT NULL,
  points_earned boolean NOT NULL DEFAULT FALSE);`);
  await db.query(` DROP TABLE IF EXISTS posts_files;
  CREATE TABLE IF NOT EXISTS posts_files (
  file_id serial PRIMARY KEY NOT NULL,
  post_id INT NOT NULL,
  source varchar(256) NOT NULL);`);
  await db.query(` DROP TABLE IF EXISTS posts_hidden;
  CREATE TABLE IF NOT EXISTS posts_hidden (
  id serial PRIMARY KEY NOT NULL,
  post_id INT NOT NULL,
  user_id INT NOT NULL);`);
  await db.query(` DROP TABLE IF EXISTS posts_jobs;
  CREATE TABLE IF NOT EXISTS posts_jobs (
  job_id serial PRIMARY KEY NOT NULL,
  post_id INT NOT NULL,
  category_id INT NOT NULL,
  title varchar(100) NOT NULL,
  location varchar(100) NOT NULL,
  salary_minimum varchar(100) NOT NULL,
  salary_maximum varchar(100) NOT NULL,
  pay_salary_per varchar(100) NOT NULL,
  type varchar(100) NOT NULL,
  question_1_type varchar(100) DEFAULT NULL,
  question_1_title varchar(256) DEFAULT NULL,
  question_1_choices text,
  question_2_type varchar(100) DEFAULT NULL,
  question_2_title varchar(256) DEFAULT NULL,
  question_2_choices text,
  question_3_type varchar(100) DEFAULT NULL,
  question_3_title varchar(256) DEFAULT NULL,
  question_3_choices text,
  cover_image varchar(256) NOT NULL,
  available boolean NOT NULL DEFAULT FALSE);`);

  await db.query(` DROP TABLE IF EXISTS jobs_categories;
  CREATE TABLE IF NOT EXISTS jobs_categories (
  category_id serial PRIMARY KEY NOT NULL,
  category_name varchar(256) NOT NULL,
  category_order INT NOT NULL DEFAULT '1');`);
  await db.query(` DROP TABLE IF EXISTS posts_jobs_applications;
  CREATE TABLE IF NOT EXISTS posts_jobs_applications (
  application_id serial PRIMARY KEY NOT NULL,
  post_id INT NOT NULL,
  user_id INT NOT NULL,
  name varchar(100) NOT NULL,
  location varchar(100) NOT NULL,
  phone varchar(100) NOT NULL,
  email varchar(100) NOT NULL,
  work_place varchar(100) DEFAULT NULL,
  work_position varchar(100) DEFAULT NULL,
  work_description text,
  work_from varchar(100) DEFAULT NULL,
  work_to varchar(100) DEFAULT NULL,
  work_now boolean DEFAULT NULL,
  question_1_answer text,
  question_2_answer text,
  question_3_answer text,
  applied_time timestamp NOT NULL);`);
  await db.query(` DROP TABLE IF EXISTS posts_links;
  CREATE TABLE IF NOT EXISTS posts_links (
  link_id serial PRIMARY KEY NOT NULL,
  post_id INT NOT NULL,
  source_url text NOT NULL,
  source_host varchar(256) NOT NULL,
  source_title varchar(256) NOT NULL,
  source_text text NOT NULL,
  source_thumbnail text NOT NULL);`);
  await db.query(` DROP TABLE IF EXISTS posts_live;
  CREATE TABLE IF NOT EXISTS posts_live (
  live_id serial PRIMARY KEY NOT NULL,
  post_id INT NOT NULL,
  video_thumbnail varchar(256) NOT NULL,
  agora_uid INT NOT NULL,
  agora_channel_name varchar(256) NOT NULL,
  agora_resource_id text,
  agora_sid varchar(256) DEFAULT NULL,
  agora_file text,
  live_ended boolean NOT NULL DEFAULT FALSE,
  live_recorded boolean NOT NULL DEFAULT FALSE);`);
  await db.query(` DROP TABLE IF EXISTS posts_live_users;
  CREATE TABLE IF NOT EXISTS posts_live_users (
  id serial PRIMARY KEY NOT NULL,
  user_id INT NOT NULL,
  post_id INT NOT NULL);`);
  await db.query(` DROP TABLE IF EXISTS posts_media;
  CREATE TABLE IF NOT EXISTS posts_media (
  media_id serial PRIMARY KEY NOT NULL,
  post_id INT NOT NULL,
  source_url text NOT NULL,
  source_provider varchar(256) NOT NULL,
  source_type varchar(256) NOT NULL,
  source_title varchar(256) DEFAULT NULL,
  source_text text,
  source_html text,
  source_thumbnail text);`);
  await db.query(` DROP TABLE IF EXISTS posts_offers;
  CREATE TABLE IF NOT EXISTS posts_offers (
  offer_id serial PRIMARY KEY NOT NULL,
  post_id INT NOT NULL,
  category_id INT NOT NULL,
  title varchar(100) NOT NULL,
  discount_type varchar(32) NOT NULL,
  discount_percent INT NOT NULL,
  discount_amount varchar(100) NOT NULL,
  buy_x varchar(100) NOT NULL,
  get_y varchar(100) NOT NULL,
  spend_x varchar(100) NOT NULL,
  amount_y varchar(100) NOT NULL,
  end_date timestamp NOT NULL,
  thumbnail varchar(256) NOT NULL);`);
  await db.query(` DROP TABLE IF EXISTS posts_photos;
  CREATE TABLE IF NOT EXISTS posts_photos (
  photo_id serial PRIMARY KEY NOT NULL,
  post_id INT NOT NULL,
  album_id INT DEFAULT NULL,
  source varchar(256) NOT NULL,
  blur boolean NOT NULL DEFAULT FALSE,
  reaction_like_count INT NOT NULL DEFAULT '0',
  reaction_love_count INT NOT NULL DEFAULT '0',
  reaction_haha_count INT NOT NULL DEFAULT '0',
  reaction_yay_count INT NOT NULL DEFAULT '0',
  reaction_wow_count INT NOT NULL DEFAULT '0',
  reaction_sad_count INT NOT NULL DEFAULT '0',
  reaction_angry_count INT NOT NULL DEFAULT '0',
  comments INT NOT NULL DEFAULT '0');`);
  await db.query(` DROP TABLE IF EXISTS posts_photos_albums;
  CREATE TABLE IF NOT EXISTS posts_photos_albums (
  album_id serial PRIMARY KEY NOT NULL,
  user_id INT NOT NULL,
  user_type varchar(32) NOT NULL,
  in_group boolean NOT NULL DEFAULT FALSE,
  group_id INT DEFAULT NULL,
  in_event boolean NOT NULL DEFAULT FALSE,
  event_id INT DEFAULT NULL,
  title varchar(32) NOT NULL,
  privacy varchar(32) NOT NULL DEFAULT 'public');`);
  await db.query(` DROP TABLE IF EXISTS posts_photos_reactions;
  CREATE TABLE IF NOT EXISTS posts_photos_reactions (
  id serial PRIMARY KEY NOT NULL,
  photo_id INT NOT NULL,
  user_id INT NOT NULL,
  reaction varchar(32) NOT NULL DEFAULT 'like',
  reaction_time timestamp DEFAULT NULL,
  points_earned boolean DEFAULT FALSE);`);
  await db.query(` DROP TABLE IF EXISTS posts_polls;
  CREATE TABLE IF NOT EXISTS posts_polls (
  poll_id serial PRIMARY KEY NOT NULL,
  post_id INT NOT NULL,
  votes INT NOT NULL DEFAULT '0');`);
  await db.query(` DROP TABLE IF EXISTS posts_polls_options;
  CREATE TABLE IF NOT EXISTS posts_polls_options (
  option_id serial PRIMARY KEY NOT NULL,
  poll_id INT NOT NULL,
  text varchar(256) NOT NULL);`);
  await db.query(` DROP TABLE IF EXISTS posts_polls_options_users;
  CREATE TABLE IF NOT EXISTS posts_polls_options_users (
  id serial PRIMARY KEY NOT NULL,
  user_id INT NOT NULL,
  poll_id INT NOT NULL,
  option_id INT NOT NULL);`);
  await db.query(` DROP TABLE IF EXISTS posts_products;
  CREATE TABLE IF NOT EXISTS posts_products (
  product_id serial PRIMARY KEY NOT NULL,
  post_id INT NOT NULL,
  name varchar(256) NOT NULL,
  price varchar(32) NOT NULL,
  category_id INT NOT NULL,
  status varchar(32) NOT NULL DEFAULT 'new',
  location varchar(255) NOT NULL,
  available boolean NOT NULL DEFAULT TRUE);`);
  await db.query(` DROP TABLE IF EXISTS posts_reactions;
  CREATE TABLE IF NOT EXISTS posts_reactions (
  id serial PRIMARY KEY NOT NULL,
  post_id INT NOT NULL,
  user_id INT NOT NULL,
  reaction varchar(32) NOT NULL DEFAULT 'like',
  reaction_time timestamp DEFAULT NULL,
  points_earned boolean NOT NULL DEFAULT FALSE);`);
  await db.query(` DROP TABLE IF EXISTS posts_saved;
  CREATE TABLE IF NOT EXISTS posts_saved (
  id serial PRIMARY KEY NOT NULL,
  post_id INT NOT NULL,
  user_id INT NOT NULL,
  time timestamp NOT NULL);`);
  await db.query(` DROP TABLE IF EXISTS posts_videos;
  CREATE TABLE IF NOT EXISTS posts_videos (
  video_id serial PRIMARY KEY NOT NULL,
  post_id INT NOT NULL,
  source varchar(256) NOT NULL,
  thumbnail varchar(256) DEFAULT NULL,
  views INT NOT NULL DEFAULT '0');`);
  await db.query(` DROP TABLE IF EXISTS reports;
  CREATE TABLE IF NOT EXISTS reports (
  report_id serial PRIMARY KEY NOT NULL,
  user_id INT NOT NULL,
  node_id INT NOT NULL,
  node_type varchar(32) NOT NULL,
  time timestamp NOT NULL);`);
  await db.query(` DROP TABLE IF EXISTS static_pages;
  CREATE TABLE IF NOT EXISTS static_pages (
  page_id serial PRIMARY KEY NOT NULL,
  page_url varchar(64) NOT NULL,
  page_title varchar(256) NOT NULL,
  page_text text NOT NULL,
  page_in_footer boolean NOT NULL DEFAULT TRUE,
  page_order INT NOT NULL DEFAULT '1');`);
  await db.query(`
  INSERT INTO static_pages (page_id, page_url, page_title, page_text, page_in_footer, page_order) VALUES
  (1, 'about', 'About', '&lt;p&gt;Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.&lt;/p&gt;\r\n&lt;h3 class=&quot;text-info&quot;&gt;Big Title&lt;/h3&gt;\r\n&lt;p&gt;Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.&lt;/p&gt;\r\n&lt;h3 class=&quot;text-info&quot;&gt;Big Title&lt;/h3&gt;\r\n&lt;p&gt;Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.&lt;/p&gt;', '1', 1),
  (2, 'terms', 'Terms', '&lt;p&gt;&lt;strong&gt; We run this website and permits its use according to the following terms and conditions: &lt;/strong&gt;&lt;/p&gt;\r\n&lt;h3 class=&quot;text-info&quot;&gt;Basic Terms:&lt;/h3&gt;\r\n&lt;ol&gt;\r\n&lt;li&gt;Using this website implies your acceptance of these conditions. If you do not fully accept them, your entry to this site will be considered unauthorized and you will have to stop using it immediately&lt;/li&gt;\r\n&lt;li&gt;You must be 13 years or older to use this site.&lt;/li&gt;\r\n&lt;li&gt;You are responsible for any activity that occurs under your screen name.&lt;/li&gt;\r\n&lt;li&gt;You are responsible for keeping your account secure.&lt;/li&gt;\r\n&lt;li&gt;You must not abuse, harass, threaten or intimidate other social network users.&lt;/li&gt;\r\n&lt;li&gt;You are solely responsible for your conduct and any data, text, information, screen names, graphics, photos, profiles, audio and video clips, links (&quot;Content&quot;) that you submit, post, and display on the social network service.&lt;/li&gt;\r\n&lt;li&gt;You must not modify, adapt or hack social network or modify another website so as to falsely imply that it is associated with social network&lt;/li&gt;\r\n&lt;li&gt;You must not create or submit unwanted email to any social network members (&quot;Spam&quot;).&lt;/li&gt;\r\n&lt;li&gt;You must not transmit any worms or viruses or any code of a destructive nature.&lt;/li&gt;\r\n&lt;li&gt;You must not, in the use of social network, violate any laws in your jurisdiction (including but not limited to copyright laws).&lt;/li&gt;\r\n&lt;/ol&gt;\r\n&lt;p&gt;Violation of any of these agreements will result in the termination of your social network account. While social network prohibits such conduct and content on its site, you understand and agree that social network cannot be responsible for the Content posted on its web site and you nonetheless may be exposed to such materials and that you use the social network service at your own risk.&lt;/p&gt;\r\n&lt;h3 class=&quot;text-info&quot;&gt;General Conditions:&lt;/h3&gt;\r\n&lt;ol&gt;\r\n&lt;li&gt;We reserve the right to modify or terminate the social network service for any reason, without notice at any time.&lt;/li&gt;\r\n&lt;li&gt;We reserve the right to alter these Terms of Use at any time. If the alterations constitute a material change to the Terms of Use, we will notify you via internet mail according to the preference expressed on your account. What constitutes a &quot;material change&quot; will be determined at our sole discretion, in good faith and using common sense and reasonable judgement.&lt;/li&gt;\r\n&lt;li&gt;We reserve the right to refuse service to anyone for any reason at any time.&lt;/li&gt;\r\n&lt;li&gt;We may, but have no obligation to, remove Content and accounts containing Content that we determine in our sole discretion are unlawful, offensive, threatening, libelous, defamatory, obscene or otherwise objectionable or violates any party&#039;s intellectual property or these Terms of Use.&lt;/li&gt;\r\n&lt;li&gt;social network service makes it possible to post images and text hosted on social network to outside websites. This use is accepted (and even encouraged!). However, pages on other websites which display data hosted on social network must provide a link back to social network.&lt;/li&gt;\r\n&lt;/ol&gt;\r\n&lt;h3 class=&quot;text-info&quot;&gt;Copyright (What&#039;s Yours is Yours):&lt;/h3&gt;\r\n&lt;ol&gt;\r\n&lt;li&gt;We claim no intellectual property rights over the material you provide to the social network service. Your profile and materials uploaded remain yours. You can remove your profile at any time by deleting your account. This will also remove any text and images you have stored in the system.&lt;/li&gt;\r\n&lt;li&gt;We encourage users to contribute their creations to the public domain or consider progressive licensing terms.&lt;/li&gt;\r\n&lt;/ol&gt;\r\n&lt;p&gt;&lt;small&gt; &lt;em&gt;Last updated on: Jan 29, 2016&lt;/em&gt; &lt;/small&gt;&lt;/p&gt;', '1', 2),
  (3, 'privacy', 'Privacy', '&lt;p&gt;We recognize that your privacy is very important and take it seriously. This Privacy Policy describes social network&#039;s policies and procedures on the collection, use and disclosure of your information when you use the social network Service. We will not use or share your information with anyone except as described in this Privacy Policy.&lt;/p&gt;\r\n&lt;h3 class=&quot;text-info&quot;&gt;Information Collection and Use&lt;/h3&gt;\r\n&lt;p&gt;We uses information we collect to analyze how the Service is used, diagnose service or technical problems, maintain security, personalize content, remember information to help you efficiently access your account, monitor aggregate metrics such as total number of visitors, traffic, and demographic patterns, and track User Content and users as necessary to comply with the Digital Millennium Copyright Act and other applicable laws.&lt;/p&gt;\r\n&lt;h4 class=&quot;text-danger&quot;&gt;User-Provided Information:&lt;/h4&gt;\r\n&lt;p&gt;You provide us information about yourself, such as your name and e-mail address, if you register for a member account with the Service. Your name and other information you choose to add to your profile will be available for public viewing on the Service. We may use your email address to send you Service-related notices. You can control receipt of certain Service-related messages on your Settings page. We may also use your contact information to send you marketing messages. If you do not want to receive such messages, you may opt out by following the instructions in the message. If you correspond with us by email, we may retain the content of your email messages, your email address and our responses.&lt;/p&gt;\r\n&lt;p&gt;You also provide us information in User Content you post to the Service. Your posts and other contributions on the Service, and metadata about them (such as when you posted them), are publicly viewable on the Service, along with your name (unless the Service permits you to post anonymously). This information may be searched by search engines and be republished elsewhere on the Web in accordance with our Terms of Service.&lt;/p&gt;\r\n&lt;p&gt;If you choose to use our invitation service to invite a friend to the Service, we will ask you for that person&#039;s email address and automatically send an email invitation. We stores this information to send this email, to register your friend if your invitation is accepted, and to track the success of our invitation service.&lt;/p&gt;\r\n&lt;h4 class=&quot;text-danger&quot;&gt;Cookies:&lt;/h4&gt;\r\n&lt;p&gt;When you visit the Service, we may send one or more &quot;cookies&quot; - small data files - to your computer to uniquely identify your browser and let social network help you log in faster and enhance your navigation through the site. A cookie may convey anonymous information about how you browse the Service to us, but does not collect personal information about you. A persistent cookie remains on your computer after you close your browser so that it can be used by your browser on subsequent visits to the Service. Persistent cookies can be removed by following your web browser&#039;s directions. A session cookie is temporary and disappears after you close your browser. You can reset your web browser to refuse all cookies or to indicate when a cookie is being sent. However, some features of the Service may not function properly if the ability to accept cookies is disabled.&lt;/p&gt;\r\n&lt;h4 class=&quot;text-danger&quot;&gt;Log Files:&lt;/h4&gt;\r\n&lt;p&gt;Log file information is automatically reported by your browser each time you access a web page. When you use the Service, our servers automatically record certain information that your web browser sends whenever you visit any website. These server logs may include information such as your web request, Internet Protocol (&quot;IP&quot;) address, browser type, referring / exit pages and URLs, number of clicks, domain names, landing pages, pages viewed, and other such information.&lt;/p&gt;\r\n&lt;h4 class=&quot;text-danger&quot;&gt;Third Party Services:&lt;/h4&gt;\r\n&lt;p&gt;We may use Google Analytics or Mixpanel to help understand use of the Service. Google Analytics and Mixpanel collect the information sent by your browser as part of a web page request, including cookies and your IP address. Google Analytics and Mixpanel also receive this information and their use of it is governed by their Privacy Policies.&lt;/p&gt;\r\n&lt;h3 class=&quot;text-info&quot;&gt;How We Share Your Information&lt;/h3&gt;\r\n&lt;h4 class=&quot;text-danger&quot;&gt;Personally Identifiable Information:&lt;/h4&gt;\r\n&lt;p&gt;We may share your personally identifiable information with third parties for the purpose of providing the Service to you. If we do this, such third parties&#039; use of your information will be bound by this Privacy Policy. We may store personal information in locations outside the direct control of social network (for instance, on servers or databases co-located with hosting providers).&lt;/p&gt;\r\n&lt;p&gt;We may share or disclose your information with your consent, such as if you choose to sign on to the Service through a third-party service. We cannot control third parties&#039; use of your information.&lt;/p&gt;\r\n&lt;p&gt;social network may disclose your personal information if required to do so by law or subpoena or if we believe that it is reasonably necessary to comply with a law, regulation or legal request; to protect the safety of any person; to address fraud, security or technical issues; or to protect social network&#039;s rights or property.&lt;/p&gt;\r\n&lt;h4 class=&quot;text-danger&quot;&gt;Non-Personally Identifiable Information:&lt;/h4&gt;\r\n&lt;p&gt;We may share non-personally identifiable information (such as anonymous usage data, referring/exit pages and URLs, platform types, number of clicks, etc.) with interested third parties to help them understand the usage patterns for certain social network services.&lt;/p&gt;\r\n&lt;p&gt;social network may allow third-party ad servers or ad networks to serve advertisements on the Service. These third-party ad servers or ad networks use technology to send, directly to your browser, the advertisements and links that appear on social network. They automatically receive your IP address when this happens. They may also use other technologies (such as cookies, JavaScript, or web beacons) to measure the effectiveness of their advertisements and to personalize the advertising content. social network does not provide any personally identifiable information to these third-party ad servers or ad networks without your consent. However, please note that if an advertiser asks social network to show an advertisement to a certain audience and you respond to that advertisement, the advertiser or ad server may conclude that you fit the description of the audience they are trying to reach. The social network Privacy Policy does not apply to, and we cannot control the activities of, third-party advertisers. Please consult the respective privacy policies of such advertisers for more information.&lt;/p&gt;\r\n&lt;h3 class=&quot;text-info&quot;&gt;How We Protect Your Information&lt;/h3&gt;\r\n&lt;p&gt;We uses commercially reasonable physical, managerial, and technical safeguards to preserve the integrity and security of your personal information. We cannot, however, ensure or warrant the security of any information you transmit to social network or guarantee that your information on the Service may not be accessed, disclosed, altered, or destroyed by breach of any of our physical, technical, or managerial safeguards.&lt;/p&gt;\r\n&lt;h3 class=&quot;text-info&quot;&gt;Your Choices About Your Information&lt;/h3&gt;\r\n&lt;p&gt;You may, of course, decline to submit personally identifiable information through the Service, in which case social network may not be able to provide certain services to you. You may update or correct your account information and email preferences at any time by logging in to your account.&lt;/p&gt;\r\n&lt;h3 class=&quot;text-info&quot;&gt;Links to Other Web Sites&lt;/h3&gt;\r\n&lt;p&gt;We are not responsible for the practices employed by websites linked to or from the Service, nor the information or content contained therein. Please remember that when you use a link to go from the Service to another website, our Privacy Policy is no longer in effect. Your browsing and interaction on any other website, including those that have a link on our website, is subject to that website&#039;s own rules and policies.&lt;/p&gt;\r\n&lt;h3 class=&quot;text-info&quot;&gt;Changes to Our Privacy Policy&lt;/h3&gt;\r\n&lt;p&gt;If we change our privacy policies and procedures, we will post those changes on this page to keep you aware of what information we collect, how we use it and under what circumstances we may disclose it. Changes to this Privacy Policy are effective when they are posted on this page.&lt;/p&gt;\r\n&lt;h4 class=&quot;text-danger&quot;&gt;&lt;small&gt; &lt;em&gt;Last updated on: Jan 29, 2016&lt;/em&gt; &lt;/small&gt;&lt;/h4&gt;', '1', 3);
  `);
  await db.query(` DROP TABLE IF EXISTS stickers;
  CREATE TABLE IF NOT EXISTS stickers (
  sticker_id serial PRIMARY KEY NOT NULL,
  image varchar(256) NOT NULL);`);
  await db.query(`
  INSERT INTO stickers (sticker_id, image) VALUES
  (1, 'stickers/1.png'),
  (2, 'stickers/2.png'),
  (3, 'stickers/3.png'),
  (4, 'stickers/4.png'),
  (5, 'stickers/5.png'),
  (6, 'stickers/6.png'),
  (7, 'stickers/7.png'),
  (8, 'stickers/8.png'),
  (9, 'stickers/9.png'),
  (10, 'stickers/10.png'),
  (11, 'stickers/11.png'),
  (12, 'stickers/12.png'),
  (13, 'stickers/13.png'),
  (14, 'stickers/14.png'),
  (15, 'stickers/15.png'),
  (16, 'stickers/16.png'),
  (17, 'stickers/17.png'),
  (18, 'stickers/18.png'),
  (19, 'stickers/19.png'),
  (20, 'stickers/20.png');
  `);
  await db.query(` DROP TABLE IF EXISTS stories;
  CREATE TABLE IF NOT EXISTS stories (
  story_id serial PRIMARY KEY NOT NULL,
  user_id INT NOT NULL,
  time timestamp NOT NULL);`);
  await db.query(` DROP TABLE IF EXISTS stories_media;
  CREATE TABLE IF NOT EXISTS stories_media (
  media_id serial PRIMARY KEY NOT NULL,
  story_id INT NOT NULL,
  source varchar(256) NOT NULL,
  is_photo boolean NOT NULL DEFAULT FALSE,
  text text NOT NULL,
  time timestamp NOT NULL);`);
  await db.query(` DROP TABLE IF EXISTS system_countries;
  CREATE TABLE IF NOT EXISTS system_countries (
  country_id serial PRIMARY KEY NOT NULL,
  country_code varchar(2) NOT NULL,
  country_name varchar(64) NOT NULL);`);
  await db.query(`
  INSERT INTO system_countries (country_id, country_code, country_name) VALUES
  (1, 'AF', 'Afghanistan'),
  (2, 'AL', 'Albania'),
  (3, 'DZ', 'Algeria'),
  (4, 'DS', 'American Samoa'),
  (5, 'AD', 'Andorra'),
  (6, 'AO', 'Angola'),
  (7, 'AI', 'Anguilla'),
  (8, 'AQ', 'Antarctica'),
  (9, 'AG', 'Antigua and Barbuda'),
  (10, 'AR', 'Argentina'),
  (11, 'AM', 'Armenia'),
  (12, 'AW', 'Aruba'),
  (13, 'AU', 'Australia'),
  (14, 'AT', 'Austria'),
  (15, 'AZ', 'Azerbaijan'),
  (16, 'BS', 'Bahamas'),
  (17, 'BH', 'Bahrain'),
  (18, 'BD', 'Bangladesh'),
  (19, 'BB', 'Barbados'),
  (20, 'BY', 'Belarus'),
  (21, 'BE', 'Belgium'),
  (22, 'BZ', 'Belize'),
  (23, 'BJ', 'Benin'),
  (24, 'BM', 'Bermuda'),
  (25, 'BT', 'Bhutan'),
  (26, 'BO', 'Bolivia'),
  (27, 'BA', 'Bosnia and Herzegovina'),
  (28, 'BW', 'Botswana'),
  (29, 'BV', 'Bouvet Island'),
  (30, 'BR', 'Brazil'),
  (31, 'IO', 'British Indian Ocean Territory'),
  (32, 'BN', 'Brunei Darussalam'),
  (33, 'BG', 'Bulgaria'),
  (34, 'BF', 'Burkina Faso'),
  (35, 'BI', 'Burundi'),
  (36, 'KH', 'Cambodia'),
  (37, 'CM', 'Cameroon'),
  (38, 'CA', 'Canada'),
  (39, 'CV', 'Cape Verde'),
  (40, 'KY', 'Cayman Islands'),
  (41, 'CF', 'Central African Republic'),
  (42, 'TD', 'Chad'),
  (43, 'CL', 'Chile'),
  (44, 'CN', 'China'),
  (45, 'CX', 'Christmas Island'),
  (46, 'CC', 'Cocos (Keeling) Islands'),
  (47, 'CO', 'Colombia'),
  (48, 'KM', 'Comoros'),
  (49, 'CG', 'Congo'),
  (50, 'CK', 'Cook Islands'),
  (51, 'CR', 'Costa Rica'),
  (52, 'HR', 'Croatia (Hrvatska)'),
  (53, 'CU', 'Cuba'),
  (54, 'CY', 'Cyprus'),
  (55, 'CZ', 'Czech Republic'),
  (56, 'DK', 'Denmark'),
  (57, 'DJ', 'Djibouti'),
  (58, 'DM', 'Dominica'),
  (59, 'DO', 'Dominican Republic'),
  (60, 'TP', 'East Timor'),
  (61, 'EC', 'Ecuador'),
  (62, 'EG', 'Egypt'),
  (63, 'SV', 'El Salvador'),
  (64, 'GQ', 'Equatorial Guinea'),
  (65, 'ER', 'Eritrea'),
  (66, 'EE', 'Estonia'),
  (67, 'ET', 'Ethiopia'),
  (68, 'FK', 'Falkland Islands (Malvinas)'),
  (69, 'FO', 'Faroe Islands'),
  (70, 'FJ', 'Fiji'),
  (71, 'FI', 'Finland'),
  (72, 'FR', 'France'),
  (73, 'FX', 'France, Metropolitan'),
  (74, 'GF', 'French Guiana'),
  (75, 'PF', 'French Polynesia'),
  (76, 'TF', 'French Southern Territories'),
  (77, 'GA', 'Gabon'),
  (78, 'GM', 'Gambia'),
  (79, 'GE', 'Georgia'),
  (80, 'DE', 'Germany'),
  (81, 'GH', 'Ghana'),
  (82, 'GI', 'Gibraltar'),
  (83, 'GK', 'Guernsey'),
  (84, 'GR', 'Greece'),
  (85, 'GL', 'Greenland'),
  (86, 'GD', 'Grenada'),
  (87, 'GP', 'Guadeloupe'),
  (88, 'GU', 'Guam'),
  (89, 'GT', 'Guatemala'),
  (90, 'GN', 'Guinea'),
  (91, 'GW', 'Guinea-Bissau'),
  (92, 'GY', 'Guyana'),
  (93, 'HT', 'Haiti'),
  (94, 'HM', 'Heard and Mc Donald Islands'),
  (95, 'HN', 'Honduras'),
  (96, 'HK', 'Hong Kong'),
  (97, 'HU', 'Hungary'),
  (98, 'IS', 'Iceland'),
  (99, 'IN', 'India'),
  (100, 'IM', 'Isle of Man'),
  (101, 'ID', 'Indonesia'),
  (102, 'IR', 'Iran (Islamic Republic of)'),
  (103, 'IQ', 'Iraq'),
  (104, 'IE', 'Ireland'),
  (105, 'IL', 'Israel'),
  (106, 'IT', 'Italy'),
  (107, 'CI', 'Ivory Coast'),
  (108, 'JE', 'Jersey'),
  (109, 'JM', 'Jamaica'),
  (110, 'JP', 'Japan'),
  (111, 'JO', 'Jordan'),
  (112, 'KZ', 'Kazakhstan'),
  (113, 'KE', 'Kenya'),
  (114, 'KI', 'Kiribati'),
  (115, 'KP', 'Korea, Democratic People\\'s Republic of'),
  (116, 'KR', 'Korea, Republic of'),
  (117, 'XK', 'Kosovo'),
  (118, 'KW', 'Kuwait'),
  (119, 'KG', 'Kyrgyzstan'),
  (120, 'LA', 'Lao People\\'s Democratic Republic'),
  (121, 'LV', 'Latvia'),
  (122, 'LB', 'Lebanon'),
  (123, 'LS', 'Lesotho'),
  (124, 'LR', 'Liberia'),
  (125, 'LY', 'Libyan Arab Jamahiriya'),
  (126, 'LI', 'Liechtenstein'),
  (127, 'LT', 'Lithuania'),
  (128, 'LU', 'Luxembourg'),
  (129, 'MO', 'Macau'),
  (130, 'MK', 'Macedonia'),
  (131, 'MG', 'Madagascar'),
  (132, 'MW', 'Malawi'),
  (133, 'MY', 'Malaysia'),
  (134, 'MV', 'Maldives'),
  (135, 'ML', 'Mali'),
  (136, 'MT', 'Malta'),
  (137, 'MH', 'Marshall Islands'),
  (138, 'MQ', 'Martinique'),
  (139, 'MR', 'Mauritania'),
  (140, 'MU', 'Mauritius'),
  (141, 'TY', 'Mayotte'),
  (142, 'MX', 'Mexico'),
  (143, 'FM', 'Micronesia, Federated States of'),
  (144, 'MD', 'Moldova, Republic of'),
  (145, 'MC', 'Monaco'),
  (146, 'MN', 'Mongolia'),
  (147, 'ME', 'Montenegro'),
  (148, 'MS', 'Montserrat'),
  (149, 'MA', 'Morocco'),
  (150, 'MZ', 'Mozambique'),
  (151, 'MM', 'Myanmar'),
  (152, 'NA', 'Namibia'),
  (153, 'NR', 'Nauru'),
  (154, 'NP', 'Nepal'),
  (155, 'NL', 'Netherlands'),
  (156, 'AN', 'Netherlands Antilles'),
  (157, 'NC', 'New Caledonia'),
  (158, 'NZ', 'New Zealand'),
  (159, 'NI', 'Nicaragua'),
  (160, 'NE', 'Niger'),
  (161, 'NG', 'Nigeria'),
  (162, 'NU', 'Niue'),
  (163, 'NF', 'Norfolk Island'),
  (164, 'MP', 'Northern Mariana Islands'),
  (165, 'NO', 'Norway'),
  (166, 'OM', 'Oman'),
  (167, 'PK', 'Pakistan'),
  (168, 'PW', 'Palau'),
  (169, 'PS', 'Palestine'),
  (170, 'PA', 'Panama'),
  (171, 'PG', 'Papua New Guinea'),
  (172, 'PY', 'Paraguay'),
  (173, 'PE', 'Peru'),
  (174, 'PH', 'Philippines'),
  (175, 'PN', 'Pitcairn'),
  (176, 'PL', 'Poland'),
  (177, 'PT', 'Portugal'),
  (178, 'PR', 'Puerto Rico'),
  (179, 'QA', 'Qatar'),
  (180, 'RE', 'Reunion'),
  (181, 'RO', 'Romania'),
  (182, 'RU', 'Russian Federation'),
  (183, 'RW', 'Rwanda'),
  (184, 'KN', 'Saint Kitts and Nevis'),
  (185, 'LC', 'Saint Lucia'),
  (186, 'VC', 'Saint Vincent and the Grenadines'),
  (187, 'WS', 'Samoa'),
  (188, 'SM', 'San Marino'),
  (189, 'ST', 'Sao Tome and Principe'),
  (190, 'SA', 'Saudi Arabia'),
  (191, 'SN', 'Senegal'),
  (192, 'RS', 'Serbia'),
  (193, 'SC', 'Seychelles'),
  (194, 'SL', 'Sierra Leone'),
  (195, 'SG', 'Singapore'),
  (196, 'SK', 'Slovakia'),
  (197, 'SI', 'Slovenia'),
  (198, 'SB', 'Solomon Islands'),
  (199, 'SO', 'Somalia'),
  (200, 'ZA', 'South Africa'),
  (201, 'GS', 'South Georgia South Sandwich Islands'),
  (202, 'ES', 'Spain'),
  (203, 'LK', 'Sri Lanka'),
  (204, 'SH', 'St. Helena'),
  (205, 'PM', 'St. Pierre and Miquelon'),
  (206, 'SD', 'Sudan'),
  (207, 'SR', 'Suriname'),
  (208, 'SJ', 'Svalbard and Jan Mayen Islands'),
  (209, 'SZ', 'Swaziland'),
  (210, 'SE', 'Sweden'),
  (211, 'CH', 'Switzerland'),
  (212, 'SY', 'Syrian Arab Republic'),
  (213, 'TW', 'Taiwan'),
  (214, 'TJ', 'Tajikistan'),
  (215, 'TZ', 'Tanzania, United Republic of'),
  (216, 'TH', 'Thailand'),
  (217, 'TG', 'Togo'),
  (218, 'TK', 'Tokelau'),
  (219, 'TO', 'Tonga'),
  (220, 'TT', 'Trinidad and Tobago'),
  (221, 'TN', 'Tunisia'),
  (222, 'TR', 'Turkey'),
  (223, 'TM', 'Turkmenistan'),
  (224, 'TC', 'Turks and Caicos Islands'),
  (225, 'TV', 'Tuvalu'),
  (226, 'UG', 'Uganda'),
  (227, 'UA', 'Ukraine'),
  (228, 'AE', 'United Arab Emirates'),
  (229, 'GB', 'United Kingdom'),
  (230, 'US', 'United States'),
  (231, 'UM', 'United States minor outlying islands'),
  (232, 'UY', 'Uruguay'),
  (233, 'UZ', 'Uzbekistan'),
  (234, 'VU', 'Vanuatu'),
  (235, 'VA', 'Vatican City State'),
  (236, 'VE', 'Venezuela'),
  (237, 'VN', 'Vietnam'),
  (238, 'VG', 'Virgin Islands (British)'),
  (239, 'VI', 'Virgin Islands (U.S.)'),
  (240, 'WF', 'Wallis and Futuna Islands'),
  (241, 'EH', 'Western Sahara'),
  (242, 'YE', 'Yemen'),
  (243, 'ZR', 'Zaire'),
  (244, 'ZM', 'Zambia'),
  (245, 'ZW', 'Zimbabwe');`);
  await db.query(` DROP TABLE IF EXISTS system_currencies;
  CREATE TABLE IF NOT EXISTS system_currencies (
  currency_id serial PRIMARY KEY NOT NULL,
  name varchar(256) NOT NULL,
  code varchar(32) NOT NULL,
  symbol varchar(32) NOT NULL,
  default boolean NOT NULL);`);
  await db.query(`
  INSERT INTO system_currencies (currency_id, name, code, symbol, default) VALUES
  (1, 'Australia Dollar', 'AUD', '$', '0'),
  (2, 'Brazil Real', 'BRL', 'R$', '0'),
  (3, 'Canada Dollar', 'CAD', '$', '0'),
  (4, 'Czech Republic Koruna', 'CZK', 'KÄ', '0'),
  (5, 'Denmark Krone', 'DKK', 'kr', '0'),
  (6, 'Euro', 'EUR', '&euro;', '0'),
  (7, 'Hong Kong Dollar', 'HKD', '$', '0'),
  (8, 'Hungary Forint', 'HUF', 'Ft', '0'),
  (9, 'Israel Shekel', 'ILS', 'â‚ª', '0'),
  (10, 'Japan Yen', 'JPY', '&yen;', '0'),
  (11, 'Malaysia Ringgit', 'MYR', 'RM', '0'),
  (12, 'Mexico Peso', 'MXN', '$', '0'),
  (13, 'Norway Krone', 'NOK', 'kr', '0'),
  (14, 'New Zealand Dollar', 'NZD', '$', '0'),
  (15, 'Philippines Peso', 'PHP', 'â‚±', '0'),
  (16, 'Poland Zloty', 'PLN', 'zÅ‚', '0'),
  (17, 'United Kingdom Pound', 'GBP', '&pound;', '0'),
  (18, 'Russia Ruble', 'RUB', 'â‚½', '0'),
  (19, 'Singapore Dollar', 'SGD', '$', '0'),
  (20, 'Sweden Krona', 'SEK', 'kr', '0'),
  (21, 'Switzerland Franc', 'CHF', 'CHF', '0'),
  (22, 'Thailand Baht', 'THB', 'à¸¿', '0'),
  (23, 'Turkey Lira', 'TRY', 'TRY', '0'),
  (24, 'United States Dollar', 'USD', '$', '1');
  `);
  await db.query(` DROP TABLE IF EXISTS system_languages;
  CREATE TABLE IF NOT EXISTS system_languages (
  language_id serial PRIMARY KEY NOT NULL,
  code varchar(32) NOT NULL,
  title varchar(256) NOT NULL,
  flag varchar(256) NOT NULL,
  dir varchar(32) NOT NULL,
  default boolean NOT NULL,
  enabled boolean NOT NULL);`);
  await db.query(`
  INSERT INTO system_languages (language_id, code, title, flag, dir, default, enabled) VALUES
  (1, 'en_us', 'English', 'flags/en_us.png', 'LTR', '1', '1'),
  (2, 'ar_sa', 'Arabic', 'flags/ar_sa.png', 'RTL', '0', '1'),
  (3, 'fr_fr', 'French', 'flags/fr_fr.png', 'LTR', '0', '1'),
  (4, 'es_es', 'Spanish', 'flags/es_es.png', 'LTR', '0', '1'),
  (5, 'pt_pt', 'Portuguese', 'flags/pt_pt.png', 'LTR', '0', '1'),
  (6, 'de_de', 'Deutsch', 'flags/de_de.png', 'LTR', '0', '1'),
  (7, 'tr_tr', 'Turkish', 'flags/tr_tr.png', 'LTR', '0', '1'),
  (8, 'nl_nl', 'Dutch', 'flags/nl_nl.png', 'LTR', '0', '1'),
  (9, 'it_it', 'Italiano', 'flags/it_it.png', 'LTR', '0', '1'),
  (10, 'ru_ru', 'Russian', 'flags/ru_ru.png', 'LTR', '0', '1'),
  (11, 'ro_ro', 'Romaian', 'flags/ro_ro.png', 'LTR', '0', '1'),
  (12, 'pt_br', 'Portuguese (Brazil)', 'flags/pt_br.png', 'LTR', '0', '1'),
  (13, 'el_gr', 'Greek', 'flags/el_gr.png', 'LTR', '0', '1');
  `);
  await db.query(` DROP TABLE IF EXISTS system_options;
  CREATE TABLE IF NOT EXISTS system_options (
  option_id serial PRIMARY KEY NOT NULL,
  option_name varchar(128) NOT NULL,
  option_value varchar(2048) DEFAULT NULL);`);
  await db.query(`create table files (
  id serial primary key NOT NULL,
  name varchar not null,
  path varchar not null unique,
  url varchar unique,
  created_at timestamptz default current_timestamp not null,
  updated_at timestamptz default null);`);
  await db.query(`INSERT INTO system_options (option_id, option_name, option_value) VALUES
  (1, 'system_public', '1'),
  (2, 'system_live', '1'),
  (3, 'system_message', 'We will Back Soon'),
  (4, 'system_title', 'social network'),
  (5, 'system_description', 'social network is a Social Network Platform is the best way to create your own social website or online community, Launch it in just 1 minute with ultimate features, social network is fast, secured, and it will be regularly updated.'),
  (6, 'system_keywords', 'php social network, php social platform, social network, social network v2, social network, social network platform, Social network Script, social platform'),
  (7, 'system_email', ''),
  (8, 'system_timestamp_format', 'd/m/Y H:i'),
  (9, 'contact_enabled', '1'),
  (10, 'directory_enabled', '1'),
  (11, 'pages_enabled', '1'),
  (12, 'groups_enabled', '1'),
  (13, 'events_enabled', '1'),
  (14, 'blogs_enabled', '1'),
  (15, 'users_blogs_enabled', '1'),
  (16, 'market_enabled', '1'),
  (17, 'movies_enabled', '0'),
  (18, 'games_enabled', '0'),
  (19, 'daytime_msg_enabled', '1'),
  (20, 'pokes_enabled', '1'),
  (21, 'gifts_enabled', '0'),
  (22, 'profile_notification_enabled', '1'),
  (23, 'browser_notifications_enabled', '1'),
  (24, 'noty_notifications_enabled', '1'),
  (25, 'cookie_consent_enabled', '1'),
  (26, 'adblock_detector_enabled', '1'),
  (27, 'stories_enabled', '1'),
  (28, 'popular_posts_enabled', '1'),
  (29, 'discover_posts_enabled', '1'),
  (30, 'memories_enabled', '0'),
  (31, 'wall_posts_enabled', '1'),
  (32, 'activity_posts_enabled', '1'),
  (33, 'colored_posts_enabled', '1'),
  (34, 'polls_enabled', '1'),
  (35, 'geolocation_enabled', '0'),
  (36, 'geolocation_key', ''),
  (37, 'gif_enabled', '0'),
  (38, 'giphy_key', ''),
  (39, 'post_translation_enabled', '0'),
  (40, 'yandex_key', ''),
  (41, 'smart_yt_player', '1'),
  (42, 'social_share_enabled', '1'),
  (43, 'max_post_length', '5000'),
  (44, 'max_comment_length', '5000'),
  (45, 'max_posts_hour', '0'),
  (46, 'max_comments_hour', '0'),
  (47, 'default_privacy', 'public'),
  (48, 'trending_hashtags_enabled', '1'),
  (49, 'trending_hashtags_interval', 'week'),
  (50, 'trending_hashtags_limit', '5'),
  (51, 'registration_enabled', '1'),
  (52, 'registration_type', 'free'),
  (53, 'invitation_enabled', '0'),
  (54, 'invitation_widget_enabled', '1'),
  (55, 'invitation_widget_max', '5'),
  (56, 'packages_enabled', '0'),
  (57, 'packages_wallet_payment_enabled', '1'),
  (58, 'activation_enabled', '0'),
  (59, 'activation_type', 'email'),
  (60, 'verification_requests', '1'),
  (61, 'age_restriction', '0'),
  (62, 'minimum_age', '13'),
  (63, 'getting_started', '1'),
  (64, 'delete_accounts_enabled', '1'),
  (65, 'download_info_enabled', '1'),
  (66, 'newsletter_consent', '1'),
  (67, 'max_accounts', '0'),
  (68, 'max_friends', '5000'),
  (69, 'social_login_enabled', '0'),
  (70, 'facebook_login_enabled', '0'),
  (71, 'facebook_appid', ''),
  (72, 'facebook_secret', ''),
  (73, 'google_login_enabled', '0'),
  (74, 'google_appid', ''),
  (75, 'google_secret', ''),
  (76, 'twitter_login_enabled', '0'),
  (77, 'twitter_appid', ''),
  (78, 'twitter_secret', ''),
  (79, 'instagram_login_enabled', '0'),
  (80, 'instagram_appid', ''),
  (81, 'instagram_secret', ''),
  (82, 'linkedin_login_enabled', '0'),
  (83, 'linkedin_appid', ''),
  (84, 'linkedin_secret', ''),
  (85, 'vkontakte_login_enabled', '0'),
  (86, 'vkontakte_appid', ''),
  (87, 'vkontakte_secret', ''),
  (88, 'email_smtp_enabled', '0'),
  (89, 'email_smtp_authentication', '0'),
  (90, 'email_smtp_ssl', '0'),
  (91, 'email_smtp_server', ''),
  (92, 'email_smtp_port', ''),
  (93, 'email_smtp_username', ''),
  (94, 'email_smtp_password', ''),
  (95, 'email_smtp_setfrom', ''),
  (96, 'email_notifications', '0'),
  (97, 'email_post_likes', '0'),
  (98, 'email_post_comments', '0'),
  (99, 'email_post_shares', '0'),
  (100, 'email_wall_posts', '0'),
  (101, 'email_mentions', '0'),
  (102, 'email_profile_visits', '0'),
  (103, 'email_friend_requests', '0'),
  (104, 'twilio_sid', ''),
  (105, 'twilio_token', ''),
  (106, 'twilio_phone', ''),
  (107, 'twilio_apisid', ''),
  (108, 'twilio_apisecret', ''),
  (109, 'system_phone', ''),
  (110, 'chat_enabled', '1'),
  (111, 'chat_status_enabled', '1'),
  (112, 'chat_typing_enabled', '1'),
  (113, 'chat_seen_enabled', '1'),
  (114, 'video_call_enabled', '0'),
  (115, 'audio_call_enabled', '0'),
  (116, 'uploads_directory', 'content/uploads'),
  (117, 'uploads_prefix', 'socialnetwork'),
  (118, 'max_avatar_size', '5120'),
  (119, 'max_cover_size', '5120'),
  (120, 'photos_enabled', '1'),
  (121, 'max_photo_size', '5120'),
  (122, 'uploads_quality', 'medium'),
  (123, 'videos_enabled', '1'),
  (124, 'max_video_size', '5120'),
  (125, 'video_extensions', 'mp4, webm, ogg'),
  (126, 'audio_enabled', '1'),
  (127, 'max_audio_size', '5120'),
  (128, 'audio_extensions', 'mp3, wav, ogg'),
  (129, 'file_enabled', '1'),
  (130, 'max_file_size', '5120'),
  (131, 'file_extensions', 'txt, zip'),
  (132, 's3_enabled', '0'),
  (133, 's3_bucket', ''),
  (134, 's3_region', 'us-east-2'),
  (135, 's3_key', ''),
  (136, 's3_secret', ''),
  (137, 'digitalocean_enabled', '0'),
  (138, 'digitalocean_space_name', ''),
  (139, 'digitalocean_space_region', 'sfo2'),
  (140, 'digitalocean_key', ''),
  (141, 'digitalocean_secret', ''),
  (142, 'ftp_enabled', '0'),
  (143, 'ftp_hostname', ''),
  (144, 'ftp_port', ''),
  (145, 'ftp_username', ''),
  (146, 'ftp_password', ''),
  (147, 'ftp_path', ''),
  (148, 'ftp_endpoint', ''),
  (149, 'session_hash', '5e1mvZITZ-4B8Km-4KHzB-4GT0l-4SMTK-5b7d686c1771'),
  (150, 'unusual_login_enabled', '0'),
  (151, 'brute_force_detection_enabled', '1'),
  (152, 'brute_force_bad_login_limit', '5'),
  (153, 'brute_force_lockout_time', '10'),
  (154, 'two_factor_enabled', '0'),
  (155, 'two_factor_type', 'email'),
  (156, 'censored_words_enabled', '1'),
  (157, 'censored_words', 'pussy,fuck,shit,asshole,dick,tits,boobs'),
  (158, 'reCAPTCHA_enabled', '0'),
  (159, 'reCAPTCHA_site_key', ''),
  (160, 'reCAPTCHA_secret_key', ''),
  (161, 'paypal_enabled', '0'),
  (162, 'paypal_mode', 'sandbox'),
  (163, 'paypal_id', ''),
  (164, 'paypal_secret', ''),
  (165, 'creditcard_enabled', '0'),
  (166, 'alipay_enabled', '0'),
  (167, 'stripe_mode', 'test'),
  (168, 'stripe_test_secret', ''),
  (169, 'stripe_test_publishable', ''),
  (170, 'stripe_live_secret', ''),
  (171, 'stripe_live_publishable', ''),
  (172, 'coinpayments_enabled', '0'),
  (173, 'coinpayments_merchant_id', ''),
  (174, 'coinpayments_ipn_secret', ''),
  (175, '2checkout_enabled', '0'),
  (176, '2checkout_mode', 'sandbox'),
  (177, '2checkout_merchant_code', ''),
  (178, '2checkout_publishable_key', ''),
  (179, '2checkout_private_key', ''),
  (180, 'bank_transfers_enabled', '0'),
  (181, 'bank_name', ''),
  (182, 'bank_account_number', ''),
  (183, 'bank_account_name', ''),
  (184, 'bank_account_routing', ''),
  (185, 'bank_account_country', ''),
  (186, 'bank_transfer_note', 'In order to confirm the bank transfer, you will need to upload a receipt or take a screenshot of your transfer within 1 day from your payment date. If a bank transfer is made but no receipt is uploaded within this period, your order will be cancelled. We will verify and confirm your receipt within 3 working days from the date you upload it.'),
  (187, 'data_heartbeat', '5'),
  (188, 'chat_heartbeat', '5'),
  (189, 'offline_time', '10'),
  (190, 'min_results', '5'),
  (191, 'max_results', '10'),
  (192, 'min_results_even', '6'),
  (193, 'max_results_even', '12'),
  (194, 'analytics_code', ''),
  (195, 'system_theme_night_on', '0'),
  (196, 'system_theme_mode_select', '1'),
  (197, 'system_profile_background_enabled', '1'),
  (198, 'system_logo', ''),
  (199, 'system_wallpaper_default', '1'),
  (200, 'system_wallpaper', ''),
  (201, 'system_favicon_default', '1'),
  (202, 'system_favicon', ''),
  (203, 'system_ogimage_default', '1'),
  (204, 'system_ogimage', ''),
  (205, 'css_customized', '0'),
  (206, 'css_background', ''),
  (207, 'css_link_color', ''),
  (208, 'css_header', ''),
  (209, 'css_header_search', ''),
  (210, 'css_header_search_color', ''),
  (211, 'css_btn_primary', ''),
  (212, 'css_custome_css', '/* \r\n\r\nAdd here your custom css styles \r\nExample:\r\np { text-align: center; color: red; }\r\n\r\n*/'),
  (213, 'custome_js_header', '/* \r\nYou can add your JavaScript code here\r\n\r\nExample:\r\n\r\nvar x, y, z;\r\nx = 1;\r\ny = 2;\r\nz = x + y;\r\n*/'),
  (214, 'custome_js_footer', '/* \r\nYou can add your JavaScript code here\r\n\r\nExample:\r\n\r\nvar x, y, z;\r\nx = 1;\r\ny = 2;\r\nz = x + y;\r\n*/'),
  (215, 'forums_enabled', '0'),
  (216, 'forums_online_enabled', '1'),
  (217, 'forums_statistics_enabled', '1'),
  (218, 'affiliates_enabled', '0'),
  (219, 'affiliate_type', 'registration'),
  (220, 'affiliate_payment_method', 'paypal,skrill'),
  (221, 'affiliate_payment_method_custom', ''),
  (222, 'affiliates_min_withdrawal', '50'),
  (223, 'affiliate_payment_type', 'fixed'),
  (224, 'affiliates_per_user', '0.10'),
  (225, 'affiliates_percentage', '1'),
  (226, 'points_enabled', '0'),
  (227, 'points_money_withdraw_enabled', '1'),
  (228, 'points_payment_method', 'paypal,skrill'),
  (229, 'points_payment_method_custom', ''),
  (230, 'points_min_withdrawal', '50'),
  (231, 'points_money_transfer_enabled', '0'),
  (232, 'points_per_currency', '100'),
  (233, 'points_per_post', '20'),
  (234, 'points_per_comment', '10'),
  (235, 'points_per_reaction', '5'),
  (236, 'points_limit_user', '1000'),
  (237, 'points_limit_pro', '2000'),
  (238, 'ads_enabled', '0'),
  (239, 'ads_cost_click', '0.05'),
  (240, 'ads_cost_view', '0.01'),
  (241, 'developers_apps_enabled', '0'),
  (242, 'developers_share_enabled', '0'),
  (243, 'auto_friend', '0'),
  (244, 'auto_friend_users', '[]'),
  (245, 'auto_follow', '0'),
  (246, 'auto_follow_users', ''),
  (247, 'auto_like', '0'),
  (248, 'auto_like_pages', ''),
  (249, 'auto_join', '0'),
  (250, 'auto_join_groups', ''),
  (251, 'last_backup_time', ''),
  (252, 'sms_provider', 'twilio'),
  (253, 'bulksms_username', ''),
  (254, 'bulksms_password', ''),
  (255, 'infobip_username', ''),
  (256, 'infobip_password', ''),
  (257, 'watermark_enabled', '0'),
  (258, 'watermark_icon', ''),
  (259, 'watermark_position', 'bottom right'),
  (260, 'watermark_xoffset', '-30'),
  (261, 'watermark_yoffset', '-30'),
  (262, 'watermark_opacity', '1'),
  (263, 'adult_images_enabled', ''),
  (264, 'adult_images_action', 'blur'),
  (265, 'adult_images_api_key', ''),
  (266, 'mobile_infinite_scroll', '0'),
  (267, 'limit_cover_photo', '1'),
  (268, 'comments_photos_enabled', '1'),
  (269, 'chat_photos_enabled', '1'),
  (270, 'onesignal_notification_enabled', '0'),
  (271, 'onesignal_app_id', ''),
  (272, 'onesignal_api_key', ''),
  (273, 'system_distance', 'kilometer'),
  (274, 'wallet_enabled', '0'),
  (275, 'wallet_transfer_enabled', '0'),
  (276, 'affiliates_money_withdraw_enabled', '1'),
  (277, 'affiliates_money_transfer_enabled', '0'),
  (278, 'pages_permission', 'everyone'),
  (279, 'groups_permission', 'everyone'),
  (280, 'events_permission', 'everyone'),
  (281, 'blogs_permission', 'everyone'),
  (282, 'market_permission', 'everyone'),
  (283, 'forums_permission', 'everyone'),
  (284, 'movies_permission', 'everyone'),
  (285, 'games_permission', 'everyone'),
  (286, 'jobs_enabled', '1'),
  (287, 'posts_online_status', '1'),
  (288, 'anonymous_mode', '1'),
  (289, 'tinymce_photos_enabled', '1'),
  (290, 'voice_notes_posts_enabled', '1'),
  (291, 'voice_notes_comments_enabled', '1'),
  (292, 'voice_notes_chat_enabled', '1'),
  (293, 'offers_enabled', '1'),
  (294, 'live_enabled', '0'),
  (295, 'save_live_enabled', '0'),
  (296, 'live_permission', 'everyone'),
  (297, 'agora_app_id', ''),
  (298, 'agora_app_certificate', ''),
  (299, 'agora_customer_id', ''),
  (300, 'agora_customer_certificate', ''),
  (301, 'agora_s3_bucket', ''),
  (302, 'agora_s3_region', 'us-east-1'),
  (303, 'agora_s3_key', ''),
  (304, 'agora_s3_secret', '');`);
  await db.query(` DROP TABLE IF EXISTS system_themes;
  CREATE TABLE IF NOT EXISTS system_themes (
  theme_id serial PRIMARY KEY NOT NULL,
  name varchar(64) NOT NULL,
  default boolean NOT NULL)`);
  await db.query(`INSERT INTO system_themes (theme_id, name, default) VALUES
  (1, 'default', '1');`);
  await db.query(` DROP TABLE IF EXISTS users_gifts;
  CREATE TABLE IF NOT EXISTS users_gifts (
  id serial PRIMARY KEY NOT NULL,
  from_user_id INT NOT NULL,
  to_user_id INT NOT NULL,
  gift_id INT NOT NULL);`);
  await db.query(` DROP TABLE IF EXISTS users_invitations;
  CREATE TABLE IF NOT EXISTS users_invitations (
  id serial PRIMARY KEY NOT NULL,
  user_id INT NOT NULL,
  email varchar(64) NOT NULL,
  invitation_date timestamp NOT NULL);`);
  await db.query(` DROP TABLE IF EXISTS users_pokes;
  CREATE TABLE IF NOT EXISTS users_pokes (
  id serial PRIMARY KEY NOT NULL,
  user_id INT NOT NULL,
  poked_id INT NOT NULL);`);
  await db.query(` DROP TABLE IF EXISTS users_searches;
  CREATE TABLE IF NOT EXISTS users_searches (
  log_id serial PRIMARY KEY NOT NULL,
  user_id INT NOT NULL,
  node_id INT NOT NULL,
  node_type varchar(32) NOT NULL,
  time timestamp DEFAULT NULL);`);
  await db.query(` DROP TABLE IF EXISTS verification_requests;
  CREATE TABLE IF NOT EXISTS verification_requests (
  request_id serial PRIMARY KEY NOT NULL,
  node_id INT NOT NULL,
  node_type varchar(32) NOT NULL,
  photo varchar(256) DEFAULT NULL,
  passport varchar(256) DEFAULT NULL,
  message text,
  time timestamp NOT NULL,
  status boolean NOT NULL);`);
  await db.query(` DROP TABLE IF EXISTS widgets;
  CREATE TABLE IF NOT EXISTS widgets (
  widget_id serial PRIMARY KEY NOT NULL,
  title varchar(256) NOT NULL,
  place varchar(32) NOT NULL,
  place_order INT NOT NULL DEFAULT '1',
  code text NOT NULL);`);

  await db.query(` 
  create table if not exists users (
  id serial primary key not null,
  avatar_id integer references files(id) on update cascade on delete set null,
  user_group  INT   NOT NULL DEFAULT '3',
  user_name  varchar(64) NOT NULL,
  user_email  varchar(64) unique NOT NULL,
  user_email_verified BOOLEAN DEFAULT FALSE,
  user_email_verification_code  varchar(64) DEFAULT NULL,
  user_phone  varchar(64) DEFAULT NULL,
  user_phone_verified  BOOLEAN DEFAULT FALSE,
  user_phone_verification_code  varchar(64) DEFAULT NULL,
  user_password  varchar(64) NOT NULL,
  user_two_factor_enabled  BOOLEAN DEFAULT FALSE ,
  user_two_factor_type varchar(256),
  user_two_factor_key  varchar(64) DEFAULT NULL,
  user_two_factor_gsecret  varchar(64) DEFAULT NULL,
  user_activated BOOLEAN DEFAULT FALSE,
  user_reseted BOOLEAN DEFAULT FALSE,
  user_reset_key  varchar(64) DEFAULT NULL,
  user_subscribed BOOLEAN DEFAULT FALSE,
  user_package  INT   DEFAULT NULL,
  user_subscription_date  TIMESTAMP DEFAULT NULL,
  user_boosted_posts  INT   NOT NULL DEFAULT '0',
  user_boosted_pages  INT   NOT NULL DEFAULT '0',
  user_started  BOOLEAN DEFAULT FALSE,
  user_verified BOOLEAN DEFAULT FALSE,
  user_banned BOOLEAN DEFAULT FALSE,
  user_live_requests_counter  INT   NOT NULL DEFAULT '0',
  user_live_requests_lastid  INT   NOT NULL DEFAULT '0',
  user_live_messages_counter  INT   NOT NULL DEFAULT '0',
  user_live_messages_lastid  INT   NOT NULL DEFAULT '0',
  user_live_notifications_counter  INT   NOT NULL DEFAULT '0',
  user_live_notifications_lastid  INT   NOT NULL DEFAULT '0',
  user_latitude  varchar(256) NOT NULL DEFAULT '0',
  user_longitude  varchar(256) NOT NULL DEFAULT '0',
  user_location_updated  TIMESTAMP DEFAULT NULL,
  user_firstname  varchar(256) NOT NULL,
  user_lastname  varchar(256) DEFAULT NULL,
  user_gender  varchar(256) NOT NULL,
  user_picture  varchar(255) DEFAULT NULL,
  user_picture_id  INT   DEFAULT NULL,
  user_cover  varchar(256) DEFAULT NULL,
  user_cover_id  INT   DEFAULT NULL,
  user_cover_position  varchar(256) DEFAULT NULL,
  user_album_pictures  INT   DEFAULT NULL,
  user_album_covers  INT DEFAULT NULL,
  user_album_timeline  INT   DEFAULT NULL,
  user_pinned_post  INT   DEFAULT NULL,
  user_registered  TIMESTAMP DEFAULT NULL,
  user_last_seen  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  user_first_failed_login  TIMESTAMP DEFAULT NULL,
  user_failed_login_ip  varchar(64) DEFAULT NULL,
  user_failed_login_count  INT   NOT NULL DEFAULT '0',
  user_country  INT DEFAULT NULL,
  user_birthdate  date DEFAULT NULL,
  user_relationship  varchar(256) DEFAULT NULL,
  user_biography  text,
  user_website  varchar(256) DEFAULT NULL,
  user_work_title  varchar(256) DEFAULT NULL,
  user_work_place  varchar(256) DEFAULT NULL,
  user_work_url  varchar(256) DEFAULT NULL,
  user_current_city  varchar(256) DEFAULT NULL,
  user_hometown  varchar(256) DEFAULT NULL,
  user_edu_major  varchar(256) DEFAULT NULL,
  user_edu_school  varchar(256) DEFAULT NULL,
  user_edu_class  varchar(256) DEFAULT NULL,
  user_social_facebook  varchar(256) DEFAULT NULL,
  user_social_twitter  varchar(256) DEFAULT NULL,
  user_social_youtube  varchar(256) DEFAULT NULL,
  user_social_instagram  varchar(256) DEFAULT NULL,
  user_social_linkedin  varchar(256) DEFAULT NULL,
  user_social_vkontakte  varchar(256) DEFAULT NULL,
  user_profile_background  varchar(256) DEFAULT NULL,
  user_chat_enabled BOOLEAN DEFAULT true,
  user_privacy_newsletter BOOLEAN DEFAULT TRUE,
  user_privacy_poke varchar(256) NOT NULL DEFAULT 'public',
  user_privacy_gifts varchar(256)  NOT NULL DEFAULT 'public',
  user_privacy_wall varchar(256) NOT NULL DEFAULT 'friends',
  user_privacy_birthdate varchar(256) NOT NULL DEFAULT 'public',
  user_privacy_relationship varchar(256) NOT NULL DEFAULT 'public',
  user_privacy_basic varchar(256) NOT NULL DEFAULT 'public',
  user_privacy_work varchar(256) NOT NULL DEFAULT 'public',
  user_privacy_location varchar(256) NOT NULL DEFAULT 'public',
  user_privacy_education varchar(256) NOT NULL DEFAULT 'public',
  user_privacy_other varchar(256) NOT NULL DEFAULT 'public',
  user_privacy_friends varchar(256) NOT NULL DEFAULT 'public',
  user_privacy_photos varchar(256) NOT NULL DEFAULT 'public',
  user_privacy_pages varchar(256) NOT NULL DEFAULT 'public',
  user_privacy_groups varchar(256) NOT NULL DEFAULT 'public',
  user_privacy_events varchar(256) NOT NULL DEFAULT 'public',
  email_post_likes BOOLEAN DEFAULT TRUE,
  email_post_comments BOOLEAN DEFAULT TRUE,
  email_post_shares BOOLEAN DEFAULT TRUE,
  email_wall_posts BOOLEAN DEFAULT TRUE,
  email_mentions BOOLEAN DEFAULT TRUE,
  email_profile_visits BOOLEAN DEFAULT TRUE,
  email_friend_requests BOOLEAN DEFAULT TRUE,
  facebook_connected BOOlEAN DEFAULT FALSE ,
  facebook_id  varchar(128) DEFAULT NULL,
  google_connected BOOLEAN DEFAULT FALSE ,
  google_id  varchar(128) DEFAULT NULL,
  twitter_connected BOOLEAN DEFAULT FALSE ,
  twitter_id  varchar(128) DEFAULT NULL,
  instagram_connected BOOLEAN DEFAULT FALSE ,
  instagram_id  varchar(128) DEFAULT NULL,
  linkedin_connected BOOLEAN DEFAULT FALSE ,
  linkedin_id  varchar(128) DEFAULT NULL,
  vkontakte_connected BOOLEAN DEFAULT FALSE ,
  vkontakte_id  varchar(128) DEFAULT NULL,
  user_referrer_id  INT DEFAULT NULL,
  user_affiliate_balance  varchar(64) NOT NULL DEFAULT '0',
  user_wallet_balance  varchar(64) NOT NULL DEFAULT '0',
  user_points  INT NOT NULL DEFAULT '0',
  chat_sound BOOLEAN DEFAULT TRUE,
  notifications_sound BOOLEAN DEFAULT TRUE,
  onesignal_user_id  varchar(100) DEFAULT NULL,
  user_language  varchar(16) DEFAULT 'en_us',
  name varchar not null,
  password_hash varchar not null,
  admin bool default false not null,
  created_at TIMESTAMPtz default current_TIMESTAMP not null,
  updated_at TIMESTAMPtz default null,
  UNIQUE ( user_name ),
  UNIQUE ( user_email ),
  UNIQUE ( facebook_id ),
  UNIQUE ( twitter_id ),
  UNIQUE ( linkedin_id ),
  UNIQUE ( vkontakte_id ),
  UNIQUE ( instagram_id ),
  UNIQUE ( user_phone ),
  UNIQUE ( google_id )
  );`);

  await db.end();
}

example();
