use agkv_db;
insert into user (firstname, lastname, email, password, available) values ('Marcellina', 'Farry', 'mfarry0@yale.edu', 'Z0oNpt', 'MWF');
insert into user (firstname, lastname, email, password, available) values ('Yehudi', 'Sandford', 'ysandford1@sciencedaily.com', 'PXShLgDgfJ4B', null);
insert into user (firstname, lastname, email, password, available) values ('Stefanie', 'Roset', 'sroset2@squidoo.com', 'LYsbxPfYlI', 'MWF');
insert into user (firstname, lastname, email, password, available) values ('Staci', 'Rapier', 'srapier3@nba.com', 'oZmoleotd', null);
insert into user (firstname, lastname, email, password, available) values ('Abigale', 'Cahalin', 'acahalin4@51.la', '2pP7tm7050X', 'TR');
insert into user (firstname, lastname, email, password, available) values ('Phaedra', 'Sambidge', 'psambidge5@cisco.com', 'R85P0P', 'MWF');
insert into user (firstname, lastname, email, password, available) values ('Cristine', 'Kloisner', 'ckloisner6@technorati.com', 'lz714WB', null);
insert into user (firstname, lastname, email, password, available) values ('Rikki', 'Gentiry', 'rgentiry7@twitpic.com', '9ksd8yr7Gzv', null);
insert into user (firstname, lastname, email, password, available) values ('Ninnette', 'Perkins', 'nperkins8@mail.ru', 'HNb02BhoTgh7', null);
insert into user (firstname, lastname, email, password, available) values ('Clayson', 'Farley', 'cfarley9@csmonitor.com', 'JDGh6TC', 'TR');

insert into meeting (date, start, duration, meeting_name, topic, organizer_id) values ('2020/08/14', '09:00', null, 'Coffee', 'Morbi non , venenatis non, sodales sed, tincidunt eu, felis.', 9);
insert into meeting (date, start, duration, meeting_name, topic, organizer_id) values ('2021/03/18', '10:00', null, 'Document Security', 'Aliquam  tortor quis turpis.', 7);
insert into meeting (date, start, duration, meeting_name, topic, organizer_id) values ('2020/06/30', '11:00', 1.5, 'Man from U.N.C.L.E.', 'In sag pretium quis, lectus.', 4);
insert into meeting (date, start, duration, meeting_name, topic, organizer_id) values ('2020/03/28', '12:00', 1, 'Database Design', 'Integer tido placerat.', 8);
insert into meeting (date, start, duration, meeting_name, topic, organizer_id) values ('2021/01/21', '13:00', 1.5, 'More Database Design', 'Nullam sit m. Integer a nibh.', 4);
insert into meeting (date, start, duration, meeting_name, topic, organizer_id) values ('2020/05/09', '14:30', 1, 'parking etiquette', 'Praenean sit amet justo. Morbi ut odio.', 5);
insert into meeting (date, start, duration, meeting_name, topic, organizer_id) values ('2020/07/18', '14:00', 1, 'employee announcements', 'Quisque is et ultrices pojusto, sollicitudin ut, suscipit a, feugiat et, eros.', 8);
insert into meeting (date, start, duration, meeting_name, topic, organizer_id) values ('2021/02/14', '09:30', 1.5, 'Coffee', 'Morbi porue in, tempus sit amet, sem.', 6);
insert into meeting (date, start, duration, meeting_name, topic, organizer_id) values ('2020/08/03', '15:00', 1, 'annual meeting', 'Curabiicitudin vitae, consectetuer eget, rutrum at, lorem.', 6);
insert into meeting (date, start, duration, meeting_name, topic, organizer_id) values ('2021/03/21', '15:30', 1, 'Conservation', 'Phasellus in flibero. Nam dui.', 7);

insert into participant (user_id, meeting_id, accepted) values ('1','1', true);
insert into participant (user_id, meeting_id, accepted) values ('5','1', false);
insert into participant (user_id, meeting_id, accepted) values ('2','2', true);
insert into participant (user_id, meeting_id, accepted) values ('8','2', null);
insert into participant (user_id, meeting_id, accepted) values ('8','3', true);
insert into participant (user_id, meeting_id, accepted) values ('6','3', false);
insert into participant (user_id, meeting_id, accepted) values ('6','4', null);
insert into participant (user_id, meeting_id, accepted) values ('4','4', false);


