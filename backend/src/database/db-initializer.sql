-- ## CONSTRUCTION ORDER ##
-- Avatars         -- 6 records
-- Users           -- 7 records
-- Exercises       -- 35 / 2 / 39 / 38 records
-- UserExercises   -- 38 records
-- Workouts
-- Surveys

DROP TABLE IF EXISTS Surveys;
DROP TABLE IF EXISTS Workouts;
DROP TABLE IF EXISTS UserExercises;
DROP TABLE IF EXISTS Exercises;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Avatars;       
DROP TABLE IF EXISTS States;

CREATE TABLE States (
  id INT AUTO_INCREMENT PRIMARY KEY,
  state VARCHAR(255) NOT NULL,
  UNIQUE KEY(state)
);

CREATE TABLE Avatars (
  id INT AUTO_INCREMENT PRIMARY KEY,
  file_path VARCHAR(255) NOT NULL,
  UNIQUE KEY(file_path)
);

INSERT INTO Avatars (file_path) VALUES
('file_path_1'),
('file_path_2'),
('file_path_3'),
('file_path_4'),
('file_path_5'),
('file_path_6');

CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL,
    avatar_id INT NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    city VARCHAR(255),
    state VARCHAR(255),
    age INT,
    gender VARCHAR(255),
    weight INT,
    height INT,
    fitness_track ENUM('Strength', 'Cardio', 'Flexibility') NOT NULL,
    secondary_track ENUM('Running', 'Cycling', 'Yoga', 'Stretching')
);

INSERT INTO Users (user_id, email, avatar_id, first_name, last_name, city, state, age, gender, weight, height, fitness_track, secondary_track)
VALUES
('65512a3b7409f13021857720', 'user1@mock.com', 1, 'firstName1', 'lastName1', 'City1', 'State1', 25, 'Male', 160, 70, 'Strength', NULL),
('65512a7064e79113efca213b', 'user2@mock.com', 2, 'firstName2', 'lastName2', 'City2', 'State2', 30, 'Female', 140, 65, 'Strength', NULL),
('65512aa4f51452e44ecddaae', 'user3@mock.com', 3, 'firstName3', 'lastName3', 'City3', 'State3', 28, 'Agender', 150, 68, 'Strength', NULL),
('65512ad4f51452e44ecddac4', 'user4@mock.com', 4, 'firstName4', 'lastName4', 'City4', 'State4', 32, 'Non-Binary', 120, 63, 'Cardio', 'Running'),
('65512b098eaf8db1930f6e56', 'user5@mock.com', 5, 'firstName5', 'lastName5', 'City5', 'State5', 27, 'Pangender', 170, 75, 'Cardio', 'Cycling'),
('655133dd3e05dd89a157815a', 'user6@mock.com', 6, 'firstName6', 'lastName6', 'City6', 'State6', 29, 'Transmasculine', 145, 68, 'Flexibility', 'Yoga'),
('655133f67409f13021857cfb', 'user7@mock.com', 7, 'firstName7', 'lastName7', 'City7', 'State7', 31, 'Transfeminine', 160, 72, 'Flexibility', 'Stretching');


CREATE TABLE Exercises (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(255),
    name VARCHAR(255) NOT NULL,
    type ENUM('Strength', 'Cardio', 'Flexibility') NOT NULL,
    secondary_type ENUM('Push', 'Pull', 'Legs', 'Running', 'Cycling', 'Yoga', 'Stretching') NOT NULL,
    description VARCHAR(255) NOT NULL,
    muscle_group ENUM('Chest', 'Shoulders', 'Triceps', 'Back', 'Biceps', 'Deltoids', 'Calves', 'Glutes', 'Hamstrings', 'Quads'),
    equipment VARCHAR(255),
    weight_class INT
);

-- Insert Strength Exercises
INSERT INTO Exercises (user_id, name, type, secondary_type, description, muscle_group, equipment, weight_class)
VALUES
(NULL, 'Bench press', 'Strength', 'Push', 'Lie with your back on a weight bench and then lower a barbell to your chest and press it back up', 'Chest', 'Bench, barbell', 3),
(NULL, 'Overhead press', 'Strength', 'Push', 'Standing with the barbell at shoulder-height, press it up over your head', 'Shoulders', 'Barbell', 3),
(NULL, 'Preacher curls', 'Strength', 'Pull', 'Grab the bar in front of you with your elbows resting on the bench and then perform a curl keeping your elbows in place', 'Biceps', 'Barbell, bench', 3),
(NULL, 'Cable rows', 'Strength', 'Pull', 'Grab the cable with your arms stretched out in front of you, pull it back until your elbows are behind you and then release', 'Back', 'Cable machine', 3),
(NULL, 'Inverted rows', 'Strength', 'Pull', 'Lie flat on your back with your arms fully outstretched and grabbing the bar, then lift your body up to the bar and lower down', 'Back', 'Barbell', 3),
(NULL, 'Seated cable rows', 'Strength', 'Pull', 'Grab the cable with your arms stretched out in front of you, pull it back until your elbows are behind you and then release', 'Back', 'Cable machine', 3),
(NULL, 'Squats', 'Strength', 'Legs', 'With a barbell across your shoulders, lower down into a squat and then press back up', 'Quads', 'Barbell', 3),
(NULL, 'Leg press', 'Strength', 'Legs', 'Press your legs out and away from you and slowly lower back down.', 'Quads', 'Leg press machine', 3),
(NULL, 'Standing calf raises', 'Strength', 'Legs', 'Use a calf raise machine to apply weight to your shoulders as you stand up on tiptoes to lift it up.', 'Calves', 'Calf raise machine', 3),
(NULL, 'Glute bridges', 'Strength', 'Legs', 'Lying on a bench with your feet on the floor and a dumbbell across your hips, raise your hips up to lift the weight and slowly lower down.', 'Glutes', 'Barbell, Bench', 3),
(NULL, 'Deadlifts', 'Strength', 'Legs', 'Bend over to grab a barbell on the floor and straighten your back and legs to lift it off the ground until you are standing.', 'Hamstrings', 'Barbell', 3),
(NULL, 'Good mornings', 'Strength', 'Legs', 'With a barbell across your shoulders and your back leaned slightly over (but straight), stand up tall and then lower back down.', 'Hamstrings', 'Barbell', 3),

(NULL, 'Dumbbell flys', 'Strength', 'Push', 'Lie with your back on a weight bench with your arms extended out to each side. Then, lift the dumbbells up over your head until they meet in the middle in front of you.', 'Chest', 'Dumbells, bench', 2), -- id = 13
(NULL, 'Reverse flys', 'Strength', 'Push', 'Stand up, leaning forward, with a dumbbell in each hand and gradually raise the dumbbells out to the sides and lower them', 'Chest', 'Dumbbells', 2),
(NULL, 'Tricep kickbacks', 'Strength', 'Push', 'Lean forward with a dumbbell in your hand and your arm bent, then slowly extend your arm backward until it is straight and repeat.', 'Triceps', 'Dumbbells, bench', 2),
(NULL, 'Dumbbell pullover', 'Strength', 'Push', 'Lie with your back on a bench and grab a dumbbell behind your head with both hands, then slowly lift the dumbbell up and over your head and lower down', 'Triceps', 'Dumbbells, bench', 2),
(NULL, 'Tricep pushdowns', 'Strength', 'Push', 'Grab the cable and pull it down until your arms are straight and gradually bend your arms to raise the cable', 'Triceps', 'Cable machine', 2),
(NULL, 'Lateral raises', 'Strength', 'Push', 'Stand with your arms at your sides with a dumbbell in each hand, then raise your arms out to the sides, parallel with the floor', 'Shoulders', 'Dumbbells', 2),
(NULL, 'Front raises', 'Strength', 'Push', 'Stand with your arms at your sides with a dumbbell in each hand, then raise your arms in front of you to be parallel with the floor', 'Shoulders', 'Dumbbells', 2),
(NULL, 'Dumbbell rows', 'Strength', 'Pull', 'Lean over on a bench with one arm, holding a dumbbell in your other straightened arm, and slowly raise your arm up until your elbow is behind you and lower it back down', 'Biceps', 'Dumbbells', 2),
(NULL, 'Face pulls', 'Strength', 'Pull', 'Hold the cable with your arms out in front of you and then pull the rope directly towards your face and then release', 'Deltoids', 'Cable machine', 2),
(NULL, 'Rear deltoid raises', 'Strength', 'Pull', 'Lean over with a dumbbell in each hand and lift your arms out to each side', 'Deltoids', 'Dumbbells', 2),
(NULL, 'Reverse flys', 'Strength', 'Pull', 'Lean forward, letting arms hang down with dumbbells, and slowly raise arms out to sides and lower down', 'Deltoids', 'Dumbbells', 2),
(NULL, 'Bicep curls', 'Strength', 'Pull', 'Stand up straight with a dumbbell in each hand with your arms straightened to your sides and slowly lift each arm up to bring the weight to your shoulder without moving your arm above the elbow and lower down', 'Biceps', 'Dumbbells', 2),
(NULL, 'Lat pulldowns', 'Strength', 'Pull', 'Grab the bar on the machine with your arms outstretched overhead, with palms facing away from you, and gradually lower the bar down to your chest and release', 'Back', 'Pulldown machine', 2),
(NULL, 'Lunges', 'Strength', 'Legs', 'Standing with dumbbells by your sides, step forward into a lunge and then raise back up.', 'Quads', 'Dumbbells', 2),
(NULL, 'Calf raises', 'Strength', 'Legs', 'Standing with dumbbells by your side, stand up on your tiptoes and then lower down.', 'Calves', 'Dumbbells', 2),
(NULL, 'Step-ups', 'Strength', 'Legs', 'Standing with dumbbells at your sides, step up onto a step and then lower back down.', 'Glutes', 'Box, Dumbbells', 2),
(NULL, 'Leg curls', 'Strength', 'Legs', 'In a leg curl machine, lift your legs up to lift the weights and then lower back down.', 'Hamstrings', 'Leg curl machine', 2),
(NULL, 'Hamstring curls', 'Strength', 'Legs', 'In a hamstring curl machine, lift your legs up to lift the weights and then lower back down.', 'Hamstrings', 'Hamstring curl machine', 2);

-- Insert Cardio Exercises
INSERT INTO Exercises (user_id, name, type, secondary_type, description)
VALUES
(NULL, 'Running', 'Cardio', 'Running', 'Run, Forrest, run!'), -- id = 36
(NULL, 'Cycling', 'Cardio', 'Cycling', 'I want to ride my bicycle, I want to ride my bike!');

-- Insert Yoga Exercises
INSERT INTO Exercises (user_id, name, type, secondary_type, description)
VALUES
(NULL, 'Mountain', 'Flexibility', 'Yoga', 'Stand upright with your arms at your sides, palms facing forward'), -- id = 38
(NULL, 'Standing Forward Bend', 'Flexibility', 'Yoga', 'With your legs straight, bend over and try to touch your toes'),
(NULL, 'Child''s Pose', 'Flexibility', 'Yoga', 'Sit kneeling on the floor and bring your forehead to touch the ground with your arms outstretched overhead.'),
(NULL, 'Cat-Cow', 'Flexibility', 'Yoga', 'On all fours, arch your back on the inhale, round your back on the exhale. Repeat.'),
(NULL, 'Downward Facing Dog', 'Flexibility', 'Yoga', 'On all fours with your hands and feet 3-4 feet apart, extend your limbs and press into the floor to lift your body off the ground.'),
(NULL, 'Warrior I', 'Flexibility', 'Yoga', 'Assume a lunge position, put your hands together, and lift them up over your head. Repeat on both sides.'),
(NULL, 'Warrior II', 'Flexibility', 'Yoga', 'Assume a lunge position, stretch your hands out so that your arms are straight over their respective legs. Repeat on both sides.'),
(NULL, 'Triangle', 'Flexibility', 'Yoga', 'Place one foot 3-4 feet in front of the other, reach down and grab your front foot with the same arm and stretch the other arm up overhead. Repeat on both sides.'),
(NULL, 'Seated Forward Bend', 'Flexibility', 'Yoga', 'Sit with your legs extended in front of you and reach out towards your toes.'),
(NULL, 'Bridge', 'Flexibility', 'Yoga', 'Lie on your back with your knees bend. Gradually straighten your back and use your legs to lift your body up off the ground.'),
(NULL, 'Cobra', 'Flexibility', 'Yoga', 'Lie on your stomach, place your hands on the ground next to your shoulders and then straighten your arms to lift your body off the ground and look upwards.'),
(NULL, 'Seated Twist', 'Flexibility', 'Yoga', 'With one leg straight and one leg bent, place your opposite elbow on the outside of your bent knee and twist your body across for a spinal stretch.'),
(NULL, 'Happy Baby', 'Flexibility', 'Yoga', 'Lying on your back, grab your feet and then point the soles of your feet up overhead to be parallel with the floor'),
(NULL, 'Corpse', 'Flexibility', 'Yoga', 'Lie flat on your back with arms and legs outstretched'),
(NULL, 'Low Lunge Twist', 'Flexibility', 'Yoga', 'Take a lunge forward and turn your body sideways to open up towards your back foot. Repeat on both sides.'),

(NULL, 'Boat', 'Flexibility', 'Yoga', 'Sit with your legs straight and raise your legs at a 45-degree angle and stretch your arms out towards your feet'), -- id = 53
(NULL, 'Plank', 'Flexibility', 'Yoga', 'Hold the top of a pushup position'),
(NULL, 'Pigeon', 'Flexibility', 'Yoga', 'Place one foot in front of you at a 90-degree angle with the other leg outstretched behind you. Lower down into your front leg until you feel a stretch.'),
(NULL, 'Camel', 'Flexibility', 'Yoga', 'Kneeling, form a 90-degree angle with your knees so that you''re sitting up tall and then reach back and grab your feet with your hands'),
(NULL, 'Tree', 'Flexibility', 'Yoga', 'Stand on one leg, bend the opposite leg so your foot is pressed into the side of the thigh of your standing leg and place your palms together at your heart.'),
(NULL, 'Half Moon', 'Flexibility', 'Yoga', 'Stand with your arms stretched out straight, parallel to the floor, and then bend over to stand on one leg and straighten the other leg out behind you to be parallel to the floor as you bend over and place one arm on the ground. Repeat on the other side.'),
(NULL, 'Shoulder Stand', 'Flexibility', 'Yoga', 'Lying flat on your back, place your arms on the ground and your palms on your lower back to lift your legs up until they''re stretched out straight overhead.'),
(NULL, 'Fish', 'Flexibility', 'Yoga', 'Lying flat on your back, sit on your hands and arch your back, keeping your head on the floor.'),
(NULL, 'Fallen Triangle', 'Flexibility', 'Yoga', 'Standing with straight legs 3-4 feet apart, lean forward to place one arm straight on the ground and twist to rotate the other arm straight up overhead. Repeat on both sides.'),
(NULL, 'Chair', 'Flexibility', 'Yoga', 'Stand with both legs bent generously, place palms together, and straight arms overhead as you look up'),
(NULL, 'Garland', 'Flexibility', 'Yoga', 'Squat with both feet flat on the ground, place palms together at heart and use elbows to push knees outward'),
(NULL, 'Eagle', 'Flexibility', 'Yoga', 'Standing with knees bent, wrap one leg around the opposite calf and bend arms in front of you with palms touching.'),
(NULL, 'Side Plank', 'Flexibility', 'Yoga', 'From a plank, lift one hand off the ground and rotate your body upwards so your hand extends overhead, balancing on your other arm. Repeat on the other side.'),

(NULL, 'Firefly', 'Flexibility', 'Yoga', 'Squat with arms straight and palms flat on the floor, then lift your legs up and point them straight forward, resting them on your upper arms.'), -- id = 66
(NULL, 'Scorpion', 'Flexibility', 'Yoga', 'With all of your body weight pressed into your forearms on the ground, lift your legs together and reach them up overhead, resting on your head.'),
(NULL, 'Handstand', 'Flexibility', 'Yoga', 'Press your palms into the ground and lift your legs straight up overhead to stand on your hands'),
(NULL, 'Peacock', 'Flexibility', 'Yoga', 'Place your palms on the ground with your fingers pointing backwards, then straighten your legs behind you and lift your legs and body up off the ground'),
(NULL, 'Wheel', 'Flexibility', 'Yoga', 'From a bridge pose, place your hands on the ground above your shoulders (fingers pointing towards your toes) and then raise up into a standing backbend.'),
(NULL, 'Hummingbird', 'Flexibility', 'Yoga', 'Pressing both hands into the ground, extend one leg out straight to the opposite side and bend the other leg so that it rests on the straightened leg''s inner thigh.'),
(NULL, 'King Pigeon', 'Flexibility', 'Yoga', 'Sit with one leg crossed in front of you as though you were sitting cross-legged and extend the other leg behind you with the foot pointing straight up and reach behind your head and grab your outstretched foot. Repeat on other side.'),
(NULL, 'Formidable Face', 'Flexibility', 'Yoga', 'From a squat, place both hands on the ground in front of you facing forwards and then slowly lift your legs up until they are extended straight overhead while you keep your chin on the ground.'),
(NULL, 'Elephant Trunk', 'Flexibility', 'Yoga', 'Place both palms on the ground with your legs straightened in front of you. Then loop one leg over your shoulder with the other leg straight and lift off the ground. Repeat on both sides.'),
(NULL, 'Compass', 'Flexibility', 'Yoga', 'Bend one leg in front of you like you''re sitting cross-legged and then lift the other leg straight up in the air and reach the opposite hand over your head to grab your extended foot. Repeat on the other side.'),
(NULL, 'Crow', 'Flexibility', 'Yoga', 'From a squat, place both hands on the floor and then place your knees in your elbow creases and lean forwards so all of your body weight is supported by your hands.');

-- Insert Stretching Exercises
INSERT INTO Exercises (user_id, name, type, secondary_type, description)
VALUES
(NULL, 'Neck Side Stretch', 'Flexibility', 'Stretching', 'Place your left hand on the right side of your head and gently pull down towards your left shoulder. Repeat on the other side.'), -- id = 77
(NULL, 'Neck Rolls', 'Flexibility', 'Stretching', 'Draw big circles with your nose in both directions.'),
(NULL, 'Shoulder Rolls', 'Flexibility', 'Stretching', 'Draw big circles with your shoulders in both directions.'),
(NULL, 'Wrist Circles', 'Flexibility', 'Stretching', 'Draw big circles with your wrists in both directions.'),
(NULL, 'Cat-Cow', 'Flexibility', 'Stretching', 'On all fours, arch your back on the inhale, round your back on the exhale. Repeat.'),
(NULL, 'Seated Forward Bend', 'Flexibility', 'Stretching', 'Sit with your legs out in front of you and reach as far forward as possible.'),
(NULL, 'Standing Forward Bend', 'Flexibility', 'Stretching', 'Standing with feet shoulder-width apart, reach down towards the floor as far as you can'),
(NULL, 'Standing Quad Stretch', 'Flexibility', 'Stretching', 'Standing on one leg, grab the other foot behind you with the opposite hand and gently pull back. Repeat on the other side.'),
(NULL, 'Standing Calf Stretch', 'Flexibility', 'Stretching', 'Using a wall or some flat object in front of you, elevate one toe on this object and then lean forward until you feel a calf stretch. Repeat on the other side.'),
(NULL, 'Ankle Rolls', 'Flexibility', 'Stretching', 'Draw big circles with your ankles in both directions.'),
(NULL, 'Seated Side Stretch', 'Flexibility', 'Stretching', 'Sitting cross-legged on the floor, place one hand at your side and stretch the other arm up and over your head, using your floor hand to balance. Repeat on the other side.'),
(NULL, 'Triceps Stretch', 'Flexibility', 'Stretching', 'Straighten one arm over your head, bend the elbow until your hand is behind your head and gently pull back on your elbow with the opposite hand. Repeat on both sides.'),
(NULL, 'Cross-body Shoulder Stretch', 'Flexibility', 'Stretching', 'Stretch one arm all the way across your chest and gently pull with the opposite hand. Repeat on both sides.'),
(NULL, 'Hamstring Stretch', 'Flexibility', 'Stretching', 'Sitting on the floor, bend one leg so that your foot is against the inside of the opposite thigh and stretch the other out in front of you. Stretch towards your outstretched leg with both hands. Repeat on the other side.'),

(NULL, 'Thread the Needle', 'Flexibility', 'Stretching', 'On all fours, reach one arm underneath your body, threading it under your other arm until you feel a stretch. Repeat on both sides.'), -- id = 91
(NULL, 'Wrist Flexor Stretch', 'Flexibility', 'Stretching', 'Hold one arm out in front of you, palm facing out - gently pull back on the palm with the other hand. Repeat on both sides.'),
(NULL, 'Figure Four Stretch', 'Flexibility', 'Stretching', 'Lie on your back with legs bent. Cross one ankle over the opposite knee. Reach around the calf of your leg that''s on the floor and pull it up towards you, stretching the crossed leg. Repeat on other side.'),
(NULL, 'Lunge with Spinal Twist', 'Flexibility', 'Stretching', 'Take a lunge forward and turn your body sideways to open up towards your back foot. Repeat on both sides.'),
(NULL, 'Seated Straddle Stretch', 'Flexibility', 'Stretching', 'Sit with both legs straight out to the sides. Stretch forward, reaching as far as you can.'),
(NULL, 'Seated Forward Bend with Twist', 'Flexibility', 'Stretching', 'Sit with both legs outstretched. Reach out towards your feet with one arm and reach straight up in the air with your other arm, opening up your body. Repeat on other side.'),
(NULL, 'Squatting Spinal Rotations', 'Flexibility', 'Stretching', 'From a deep squat, reach one arm up and overhead to perform a back stretch. Repeat on other side.'),
(NULL, 'Butterfly Stretch', 'Flexibility', 'Stretching', 'Sit with the soles of your feet touching, then press your knees down towards the floor and gently stretch your head down to your feet.'),
(NULL, 'Cobra Stretch', 'Flexibility', 'Stretching', 'Lying on your stomach with legs outstretched, place your hands shoulder-width apart and push your head and torso to look upwards, stretching the back.'),
(NULL, 'Cat Stretch', 'Flexibility', 'Stretching', 'On your knees, stretch your body out with your arms straight out in front of you and try to press your chest down towards the floor.'),
(NULL, 'One-Armed Side Stretch', 'Flexibility', 'Stretching', 'Stand with your feet slightly wider than your shoulders, place one hand on your hip, and stretch the other arm up and over to the side. Repeat on other side.'),
(NULL, 'Full Toes Stretch', 'Flexibility', 'Stretching', 'Kneel down with your toes curled under and then press your body weight back into your toes to stretch out the arches of your feet.'),

(NULL, 'Standing Pike Squats', 'Flexibility', 'Stretching', 'From a squat position, put your hands flat on the floor and press up until your legs are straight, keeping your hands on the floor.'), -- id = 103
(NULL, 'Supine Spinal Twist', 'Flexibility', 'Stretching', 'Lying on your back, cross one leg over your body and put it on the ground at a 90-degree angle. Then stretch your arms out perpendicular to your body and rotate your head to look in the other direction. Repeat on other side.'),
(NULL, 'Hip Flexor Lunges', 'Flexibility', 'Stretching', 'Take a lunge, with the top of your back foot on the floor, and press down as low as you can, feeling the stretch in your rear hip flexor. Repeat on other side.'),
(NULL, 'Pigeon Stretch', 'Flexibility', 'Stretching', 'Place one foot in front of you at a 90-degree angle with the other leg outstretched behind you. Lower down into your front leg until you feel a stretch.'),
(NULL, 'Standing Backbend', 'Flexibility', 'Stretching', 'From a bridge pose, place your hands on the ground above your shoulders (fingers pointing towards your toes) and then raise up into a standing backbend.'),
(NULL, 'Extended Side Plank', 'Flexibility', 'Stretching', 'From a plank, lift one hand off the ground and rotate your body upwards so your hand extends overhead, balancing on your other arm. Repeat on other side.'),
(NULL, 'Front Plank', 'Flexibility', 'Stretching', 'Assume a push-up position and hold.'),
(NULL, 'Seated Quad Stretch', 'Flexibility', 'Stretching', 'On all fours, reach one hand around to grab your opposite toes and pull your leg up until you feel a stretch across your quads.'),
(NULL, 'Chest Opener', 'Flexibility', 'Stretching', 'From a standing position, clasp your hands behind your back and lean forward as you raise your hands up behind you until you feel a chest stretch.'),
(NULL, 'Two-Armed Side Stretch', 'Flexibility', 'Stretching', 'Stand with your feet slightly wider than your shoulders, clasp your hands overhead, and move your arms to one side for a side stretch. Repeat on the other side.'),
(NULL, 'Palms Up Wrist Stretch', 'Flexibility', 'Stretching', 'Kneeling with your thighs perpendicular to the ground, place your hands in front of your knees with your palms up and pointing towards your knees. Then, lean back to sit on your feet behind you.'),
(NULL, 'Palms Down Wrist Stretch', 'Flexibility', 'Stretching', 'Kneeling with your thighs perpendicular to the ground, place your hands in front of your knees with your palms down and pointing towards your knees. Then, lean back to sit on your feet behind you.'); -- id = 114

CREATE TABLE UserExercises (
    id INT AUTO_INCREMENT PRIMARY KEY,
    exercise_id INT NOT NULL,
    user_id VARCHAR(255),
    reps INT,
    sets INT,
    weight INT,
    rest INT,
    duration INT,
    distance FLOAT,
    difficulty INT,
    times_completed INT DEFAULT 0,
    experience INT,
    FOREIGN KEY (exercise_id) REFERENCES Exercises(id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Insert Mock User Strength Exercises
INSERT INTO UserExercises (exercise_id, user_id, reps, sets, weight, rest, times_completed)
VALUES
-- User 1: Strength (beginner)
(1,  "65512a3b7409f13021857720", 12, 3, 40,   60, 0),   -- Bench press
(2,  "65512a3b7409f13021857720", 12, 3, 40,   60, 0),   -- Overhead press
(3,  "65512a3b7409f13021857720", 12, 3, 40,   60, 0),   -- Preacher curls
(4,  "65512a3b7409f13021857720", 12, 3, 40,   60, 0),   -- Cable rows
(5,  "65512a3b7409f13021857720", 12, 3, 40,   60, 0),   -- Inverted rows
(6,  "65512a3b7409f13021857720", 12, 3, 40,   60, 0),   -- Seated cable rows
(7,  "65512a3b7409f13021857720", 12, 3, 40,   60, 0),   -- Squats
(8,  "65512a3b7409f13021857720", 12, 3, 40,   60, 0),   -- Leg press
(9,  "65512a3b7409f13021857720", 12, 3, 40,   60, 0),   -- Standing calf raises
(10, "65512a3b7409f13021857720", 12, 3, 40,   60, 0),   -- Glute bridges
(11, "65512a3b7409f13021857720", 12, 3, 40,   60, 0),   -- Deadlifts
(12, "65512a3b7409f13021857720", 12, 3, 40,   60, 0),   -- Good mornings
(13, "65512a3b7409f13021857720", 12, 3, 10,   60, 0),   -- Dumbbell flys
(14, "65512a3b7409f13021857720", 12, 3, 10,   60, 0),   -- Reverse flys
(15, "65512a3b7409f13021857720", 12, 3, 10,   60, 0),   -- Tricep kickbacks
(16, "65512a3b7409f13021857720", 12, 3, 10,   60, 0),   -- Dumbbell pullover
(17, "65512a3b7409f13021857720", 12, 3, 10,   60, 0),   -- Tricep pushdowns
(18, "65512a3b7409f13021857720", 12, 3, 10,   60, 0),   -- Lateral raises
(19, "65512a3b7409f13021857720", 12, 3, 10,   60, 0),   -- Front raises
(20, "65512a3b7409f13021857720", 12, 3, 10,   60, 0),   -- Dumbbell rows
(21, "65512a3b7409f13021857720", 12, 3, 10,   60, 0),   -- Face pulls
(22, "65512a3b7409f13021857720", 12, 3, 10,   60, 0),   -- Rear deltoid raises
(23, "65512a3b7409f13021857720", 12, 3, 10,   60, 0),   -- Reverse flys
(24, "65512a3b7409f13021857720", 12, 3, 10,   60, 0),   -- Bicep curls
(25, "65512a3b7409f13021857720", 12, 3, 10,   60, 0),   -- Lat pulldowns
(26, "65512a3b7409f13021857720", 12, 3, 10,   60, 0),   -- Lunges
(27, "65512a3b7409f13021857720", 12, 3, 10,   60, 0),   -- Calf raises
(28, "65512a3b7409f13021857720", 12, 3, 10,   60, 0),   -- Step-ups
(29, "65512a3b7409f13021857720", 12, 3, 10,   60, 0),   -- Leg curls
(30, "65512a3b7409f13021857720", 12, 3, 10,   60, 0),   -- Hamstring curls

-- User 2: Strength (intermediate)
(1,  "65512a7064e79113efca213b", 8,  4, 25,   60, 0),   -- Bench press
(2,  "65512a7064e79113efca213b", 8,  4, 25,   60, 0),   -- Overhead press
(3,  "65512a7064e79113efca213b", 8,  4, 25,   60, 0),   -- Preacher curls
(4,  "65512a7064e79113efca213b", 8,  4, 25,   60, 0),   -- Cable rows
(5,  "65512a7064e79113efca213b", 8,  4, 25,   60, 0),   -- Inverted rows
(6,  "65512a7064e79113efca213b", 8,  4, 25,   60, 0),   -- Seated cable rows
(7,  "65512a7064e79113efca213b", 8,  4, 25,   60, 0),   -- Squats
(8,  "65512a7064e79113efca213b", 8,  4, 25,   60, 0),   -- Leg press
(9,  "65512a7064e79113efca213b", 8,  4, 25,   60, 0),   -- Standing calf raises
(10, "65512a7064e79113efca213b", 8,  4, 25,   60, 0),   -- Glute bridges
(11, "65512a7064e79113efca213b", 8,  4, 25,   60, 0),   -- Deadlifts
(12, "65512a7064e79113efca213b", 8,  4, 25,   60, 0),   -- Good mornings
(13, "65512a7064e79113efca213b", 8,  4, 60,   60, 0),   -- Dumbbell flys
(14, "65512a7064e79113efca213b", 8,  4, 60,   60, 0),   -- Reverse flys
(15, "65512a7064e79113efca213b", 8,  4, 60,   60, 0),   -- Tricep kickbacks
(16, "65512a7064e79113efca213b", 8,  4, 60,   60, 0),   -- Dumbbell pullover
(17, "65512a7064e79113efca213b", 8,  4, 60,   60, 0),   -- Tricep pushdowns
(18, "65512a7064e79113efca213b", 8,  4, 60,   60, 0),   -- Lateral raises
(19, "65512a7064e79113efca213b", 8,  4, 60,   60, 0),   -- Front raises
(20, "65512a7064e79113efca213b", 8,  4, 60,   60, 0),   -- Dumbbell rows
(21, "65512a7064e79113efca213b", 8,  4, 60,   60, 0),   -- Face pulls
(22, "65512a7064e79113efca213b", 8,  4, 60,   60, 0),   -- Rear deltoid raises
(23, "65512a7064e79113efca213b", 8,  4, 60,   60, 0),   -- Reverse flys
(24, "65512a7064e79113efca213b", 8,  4, 60,   60, 0),   -- Bicep curls
(25, "65512a7064e79113efca213b", 8,  4, 60,   60, 0),   -- Lat pulldowns
(26, "65512a7064e79113efca213b", 8,  4, 60,   60, 0),   -- Lunges
(27, "65512a7064e79113efca213b", 8,  4, 60,   60, 0),   -- Calf raises
(28, "65512a7064e79113efca213b", 8,  4, 60,   60, 0),   -- Step-ups
(29, "65512a7064e79113efca213b", 8,  4, 60,   60, 0),   -- Leg curls
(30, "65512a7064e79113efca213b", 8,  4, 60,   60, 0),   -- Hamstring curls

-- User 3: Strength (advanced)
(1,  "65512aa4f51452e44ecddaae", 5,  5, 45,   90, 0),   -- Bench press
(2,  "65512aa4f51452e44ecddaae", 5,  5, 45,   90, 0),   -- Overhead press
(3,  "65512aa4f51452e44ecddaae", 5,  5, 45,   90, 0),   -- Preacher curls
(4,  "65512aa4f51452e44ecddaae", 5,  5, 45,   90, 0),   -- Cable rows
(5,  "65512aa4f51452e44ecddaae", 5,  5, 45,   90, 0),   -- Inverted rows
(6,  "65512aa4f51452e44ecddaae", 5,  5, 45,   90, 0),   -- Seated cable rows
(7,  "65512aa4f51452e44ecddaae", 5,  5, 45,   90, 0),   -- Squats
(8,  "65512aa4f51452e44ecddaae", 5,  5, 45,   90, 0),   -- Leg press
(9,  "65512aa4f51452e44ecddaae", 5,  5, 45,   90, 0),   -- Standing calf raises
(10, "65512aa4f51452e44ecddaae", 5,  5, 45,   90, 0),   -- Glute bridges
(11, "65512aa4f51452e44ecddaae", 5,  5, 45,   90, 0),   -- Deadlifts
(12, "65512aa4f51452e44ecddaae", 5,  5, 45,   90, 0),   -- Good mornings
(13, "65512aa4f51452e44ecddaae", 5,  5, 90,   90, 0),   -- Dumbbell flys
(14, "65512aa4f51452e44ecddaae", 5,  5, 90,   90, 0),   -- Reverse flys
(15, "65512aa4f51452e44ecddaae", 5,  5, 90,   90, 0),   -- Tricep kickbacks
(16, "65512aa4f51452e44ecddaae", 5,  5, 90,   90, 0),   -- Dumbbell pullover
(17, "65512aa4f51452e44ecddaae", 5,  5, 90,   90, 0),   -- Tricep pushdowns
(18, "65512aa4f51452e44ecddaae", 5,  5, 90,   90, 0),   -- Lateral raises
(19, "65512aa4f51452e44ecddaae", 5,  5, 90,   90, 0),   -- Front raises
(20, "65512aa4f51452e44ecddaae", 5,  5, 90,   90, 0),   -- Dumbbell rows
(21, "65512aa4f51452e44ecddaae", 5,  5, 90,   90, 0),   -- Face pulls
(22, "65512aa4f51452e44ecddaae", 5,  5, 90,   90, 0),   -- Rear deltoid raises
(23, "65512aa4f51452e44ecddaae", 5,  5, 90,   90, 0),   -- Reverse flys
(24, "65512aa4f51452e44ecddaae", 5,  5, 90,   90, 0),   -- Bicep curls
(25, "65512aa4f51452e44ecddaae", 5,  5, 90,   90, 0),   -- Lat pulldowns
(26, "65512aa4f51452e44ecddaae", 5,  5, 90,   90, 0),   -- Lunges
(27, "65512aa4f51452e44ecddaae", 5,  5, 90,   90, 0),   -- Calf raises
(28, "65512aa4f51452e44ecddaae", 5,  5, 90,   90, 0),   -- Step-ups
(29, "65512aa4f51452e44ecddaae", 5,  5, 90,   90, 0),   -- Leg curls
(30, "65512aa4f51452e44ecddaae", 5,  5, 90,   90, 0);   -- Hamstring curls

-- Insert Cardio Exercises
INSERT INTO UserExercises (exercise_id, user_id, duration, distance, times_completed)
VALUES
(31, "65512ad4f51452e44ecddac4", 15, 1, 0),   -- User 4: Running
(32, "65512b098eaf8db1930f6e56", 20, 4, 0);   -- User 5: Cycling

-- Insert Flexibility-Yoga Exercises
-- User 6: Yoga
INSERT INTO UserExercises (exercise_id, user_id, duration, difficulty, times_completed)
VALUES
(33, "655133dd3e05dd89a157815a", 10, 1, 0),
(34, "655133dd3e05dd89a157815a", 10, 1, 0),
(35, "655133dd3e05dd89a157815a", 10, 1, 0),
(36, "655133dd3e05dd89a157815a", 10, 1, 0),
(37, "655133dd3e05dd89a157815a", 10, 1, 0),
(38, "655133dd3e05dd89a157815a", 10, 1, 0),
(39, "655133dd3e05dd89a157815a", 10, 1, 0),
(40, "655133dd3e05dd89a157815a", 10, 1, 0),
(41, "655133dd3e05dd89a157815a", 10, 1, 0),
(42, "655133dd3e05dd89a157815a", 10, 1, 0),
(43, "655133dd3e05dd89a157815a", 10, 1, 0),
(44, "655133dd3e05dd89a157815a", 10, 1, 0),
(45, "655133dd3e05dd89a157815a", 10, 1, 0),
(46, "655133dd3e05dd89a157815a", 10, 1, 0),
(47, "655133dd3e05dd89a157815a", 10, 1, 0),
(48, "655133dd3e05dd89a157815a", 25, 2, 0),
(49, "655133dd3e05dd89a157815a", 25, 2, 0),
(50, "655133dd3e05dd89a157815a", 25, 2, 0),
(51, "655133dd3e05dd89a157815a", 25, 2, 0),
(52, "655133dd3e05dd89a157815a", 25, 2, 0),
(53, "655133dd3e05dd89a157815a", 25, 2, 0),
(54, "655133dd3e05dd89a157815a", 25, 2, 0),
(55, "655133dd3e05dd89a157815a", 25, 2, 0),
(56, "655133dd3e05dd89a157815a", 25, 2, 0),
(57, "655133dd3e05dd89a157815a", 25, 2, 0),
(58, "655133dd3e05dd89a157815a", 25, 2, 0),
(59, "655133dd3e05dd89a157815a", 25, 2, 0),
(60, "655133dd3e05dd89a157815a", 25, 2, 0),
(61, "655133dd3e05dd89a157815a", 25, 2, 0),
(62, "655133dd3e05dd89a157815a", 40, 3, 0),
(63, "655133dd3e05dd89a157815a", 40, 3, 0),
(64, "655133dd3e05dd89a157815a", 40, 3, 0),
(65, "655133dd3e05dd89a157815a", 40, 3, 0),
(66, "655133dd3e05dd89a157815a", 40, 3, 0),
(67, "655133dd3e05dd89a157815a", 40, 3, 0),
(68, "655133dd3e05dd89a157815a", 40, 3, 0),
(69, "655133dd3e05dd89a157815a", 40, 3, 0),
(70, "655133dd3e05dd89a157815a", 40, 3, 0),
(71, "655133dd3e05dd89a157815a", 40, 3, 0);

-- Insert Flexibility-Stretching Exercises
-- User 7: Stretching
INSERT INTO UserExercises (exercise_id, user_id, duration, difficulty, times_completed)
VALUES
(72,  "655133f67409f13021857cfb", 10, 1, 0),
(73,  "655133f67409f13021857cfb", 10, 1, 0),
(74,  "655133f67409f13021857cfb", 10, 1, 0),
(75,  "655133f67409f13021857cfb", 10, 1, 0),
(76,  "655133f67409f13021857cfb", 10, 1, 0),
(77,  "655133f67409f13021857cfb", 10, 1, 0),
(78,  "655133f67409f13021857cfb", 10, 1, 0),
(79,  "655133f67409f13021857cfb", 10, 1, 0),
(80,  "655133f67409f13021857cfb", 10, 1, 0),
(81,  "655133f67409f13021857cfb", 10, 1, 0),
(82,  "655133f67409f13021857cfb", 10, 1, 0),
(83,  "655133f67409f13021857cfb", 10, 1, 0),
(84,  "655133f67409f13021857cfb", 10, 1, 0),
(85,  "655133f67409f13021857cfb", 10, 1, 0),
(86,  "655133f67409f13021857cfb", 25, 2, 0),
(87,  "655133f67409f13021857cfb", 25, 2, 0),
(88,  "655133f67409f13021857cfb", 25, 2, 0),
(89,  "655133f67409f13021857cfb", 25, 2, 0),
(90,  "655133f67409f13021857cfb", 25, 2, 0),
(91,  "655133f67409f13021857cfb", 25, 2, 0),
(92,  "655133f67409f13021857cfb", 25, 2, 0),
(93,  "655133f67409f13021857cfb", 25, 2, 0),
(94,  "655133f67409f13021857cfb", 25, 2, 0),
(95,  "655133f67409f13021857cfb", 25, 2, 0),
(96,  "655133f67409f13021857cfb", 25, 2, 0),
(97,  "655133f67409f13021857cfb", 25, 2, 0),
(98,  "655133f67409f13021857cfb", 25, 2, 0),
(99,  "655133f67409f13021857cfb", 25, 2, 0),
(100, "655133f67409f13021857cfb", 40, 3, 0),
(101, "655133f67409f13021857cfb", 40, 3, 0),
(102, "655133f67409f13021857cfb", 40, 3, 0),
(103, "655133f67409f13021857cfb", 40, 3, 0),
(104, "655133f67409f13021857cfb", 40, 3, 0),
(105, "655133f67409f13021857cfb", 40, 3, 0),
(106, "655133f67409f13021857cfb", 40, 3, 0),
(107, "655133f67409f13021857cfb", 40, 3, 0),
(108, "655133f67409f13021857cfb", 40, 3, 0),
(109, "655133f67409f13021857cfb", 40, 3, 0);

-- -- Insert Default Strength Exercises
INSERT INTO UserExercises (exercise_id, user_id, reps, sets, weight, rest, times_completed, experience)
VALUES
-- Strength (beginner)
(1,  NULL, 12, 3, 40,   60, 0, 1),   -- Bench press
(2,  NULL, 12, 3, 40,   60, 0, 1),   -- Overhead press
(3,  NULL, 12, 3, 40,   60, 0, 1),   -- Preacher curls
(4,  NULL, 12, 3, 40,   60, 0, 1),   -- Cable rows
(5,  NULL, 12, 3, 40,   60, 0, 1),   -- Inverted rows
(6,  NULL, 12, 3, 40,   60, 0, 1),   -- Seated cable rows
(7,  NULL, 12, 3, 40,   60, 0, 1),   -- Squats
(8,  NULL, 12, 3, 40,   60, 0, 1),   -- Leg press
(9,  NULL, 12, 3, 40,   60, 0, 1),   -- Standing calf raises
(10, NULL, 12, 3, 40,   60, 0, 1),   -- Glute bridges
(11, NULL, 12, 3, 40,   60, 0, 1),   -- Deadlifts
(12, NULL, 12, 3, 40,   60, 0, 1),   -- Good mornings
(13, NULL, 12, 3, 10,   60, 0, 1),   -- Dumbbell flys
(14, NULL, 12, 3, 10,   60, 0, 1),   -- Reverse flys
(15, NULL, 12, 3, 10,   60, 0, 1),   -- Tricep kickbacks
(16, NULL, 12, 3, 10,   60, 0, 1),   -- Dumbbell pullover
(17, NULL, 12, 3, 10,   60, 0, 1),   -- Tricep pushdowns
(18, NULL, 12, 3, 10,   60, 0, 1),   -- Lateral raises
(19, NULL, 12, 3, 10,   60, 0, 1),   -- Front raises
(20, NULL, 12, 3, 10,   60, 0, 1),   -- Dumbbell rows
(21, NULL, 12, 3, 10,   60, 0, 1),   -- Face pulls
(22, NULL, 12, 3, 10,   60, 0, 1),   -- Rear deltoid raises
(23, NULL, 12, 3, 10,   60, 0, 1),   -- Reverse flys
(24, NULL, 12, 3, 10,   60, 0, 1),   -- Bicep curls
(25, NULL, 12, 3, 10,   60, 0, 1),   -- Lat pulldowns
(26, NULL, 12, 3, 10,   60, 0, 1),   -- Lunges
(27, NULL, 12, 3, 10,   60, 0, 1),   -- Calf raises
(28, NULL, 12, 3, 10,   60, 0, 1),   -- Step-ups
(29, NULL, 12, 3, 10,   60, 0, 1),   -- Leg curls
(30, NULL, 12, 3, 10,   60, 0, 1),   -- Hamstring curls

-- Strength (intermediate)
(1,  NULL, 8,  4, 25,   60, 0, 2),   -- Bench press
(2,  NULL, 8,  4, 25,   60, 0, 2),   -- Overhead press
(3,  NULL, 8,  4, 25,   60, 0, 2),   -- Preacher curls
(4,  NULL, 8,  4, 25,   60, 0, 2),   -- Cable rows
(5,  NULL, 8,  4, 25,   60, 0, 2),   -- Inverted rows
(6,  NULL, 8,  4, 25,   60, 0, 2),   -- Seated cable rows
(7,  NULL, 8,  4, 25,   60, 0, 2),   -- Squats
(8,  NULL, 8,  4, 25,   60, 0, 2),   -- Leg press
(9,  NULL, 8,  4, 25,   60, 0, 2),   -- Standing calf raises
(10, NULL, 8,  4, 25,   60, 0, 2),   -- Glute bridges
(11, NULL, 8,  4, 25,   60, 0, 2),   -- Deadlifts
(12, NULL, 8,  4, 25,   60, 0, 2),   -- Good mornings
(13, NULL, 8,  4, 60,   60, 0, 2),   -- Dumbbell flys
(14, NULL, 8,  4, 60,   60, 0, 2),   -- Reverse flys
(15, NULL, 8,  4, 60,   60, 0, 2),   -- Tricep kickbacks
(16, NULL, 8,  4, 60,   60, 0, 2),   -- Dumbbell pullover
(17, NULL, 8,  4, 60,   60, 0, 2),   -- Tricep pushdowns
(18, NULL, 8,  4, 60,   60, 0, 2),   -- Lateral raises
(19, NULL, 8,  4, 60,   60, 0, 2),   -- Front raises
(20, NULL, 8,  4, 60,   60, 0, 2),   -- Dumbbell rows
(21, NULL, 8,  4, 60,   60, 0, 2),   -- Face pulls
(22, NULL, 8,  4, 60,   60, 0, 2),   -- Rear deltoid raises
(23, NULL, 8,  4, 60,   60, 0, 2),   -- Reverse flys
(24, NULL, 8,  4, 60,   60, 0, 2),   -- Bicep curls
(25, NULL, 8,  4, 60,   60, 0, 2),   -- Lat pulldowns
(26, NULL, 8,  4, 60,   60, 0, 2),   -- Lunges
(27, NULL, 8,  4, 60,   60, 0, 2),   -- Calf raises
(28, NULL, 8,  4, 60,   60, 0, 2),   -- Step-ups
(29, NULL, 8,  4, 60,   60, 0, 2),   -- Leg curls
(30, NULL, 8,  4, 60,   60, 0, 2),   -- Hamstring curls

-- Strength (advanced)
(1,  NULL, 5,  5, 45,   90, 0, 3),   -- Bench press
(2,  NULL, 5,  5, 45,   90, 0, 3),   -- Overhead press
(3,  NULL, 5,  5, 45,   90, 0, 3),   -- Preacher curls
(4,  NULL, 5,  5, 45,   90, 0, 3),   -- Cable rows
(5,  NULL, 5,  5, 45,   90, 0, 3),   -- Inverted rows
(6,  NULL, 5,  5, 45,   90, 0, 3),   -- Seated cable rows
(7,  NULL, 5,  5, 45,   90, 0, 3),   -- Squats
(8,  NULL, 5,  5, 45,   90, 0, 3),   -- Leg press
(9,  NULL, 5,  5, 45,   90, 0, 3),   -- Standing calf raises
(10, NULL, 5,  5, 45,   90, 0, 3),   -- Glute bridges
(11, NULL, 5,  5, 45,   90, 0, 3),   -- Deadlifts
(12, NULL, 5,  5, 45,   90, 0, 3),   -- Good mornings
(13, NULL, 5,  5, 90,   90, 0, 3),   -- Dumbbell flys
(14, NULL, 5,  5, 90,   90, 0, 3),   -- Reverse flys
(15, NULL, 5,  5, 90,   90, 0, 3),   -- Tricep kickbacks
(16, NULL, 5,  5, 90,   90, 0, 3),   -- Dumbbell pullover
(17, NULL, 5,  5, 90,   90, 0, 3),   -- Tricep pushdowns
(18, NULL, 5,  5, 90,   90, 0, 3),   -- Lateral raises
(19, NULL, 5,  5, 90,   90, 0, 3),   -- Front raises
(20, NULL, 5,  5, 90,   90, 0, 3),   -- Dumbbell rows
(21, NULL, 5,  5, 90,   90, 0, 3),   -- Face pulls
(22, NULL, 5,  5, 90,   90, 0, 3),   -- Rear deltoid raises
(23, NULL, 5,  5, 90,   90, 0, 3),   -- Reverse flys
(24, NULL, 5,  5, 90,   90, 0, 3),   -- Bicep curls
(25, NULL, 5,  5, 90,   90, 0, 3),   -- Lat pulldowns
(26, NULL, 5,  5, 90,   90, 0, 3),   -- Lunges
(27, NULL, 5,  5, 90,   90, 0, 3),   -- Calf raises
(28, NULL, 5,  5, 90,   90, 0, 3),   -- Step-ups
(29, NULL, 5,  5, 90,   90, 0, 3),   -- Leg curls
(30, NULL, 5,  5, 90,   90, 0, 3);   -- Hamstring curls

-- Insert Cardio Exercises
INSERT INTO UserExercises (exercise_id, user_id, duration, distance, times_completed, experience)
VALUES
(31, NULL, 15,  1, 0, 1),   -- Running: Beginner
(31, NULL, 30,  3, 0, 2),   -- Running: Intermediate
(31, NULL, 60,  5, 0, 3),   -- Running: Advanced
(32, NULL, 20,  4, 0, 1),   -- Cycling: Beginner
(32, NULL, 40, 10, 0, 2),   -- Cycling: Intermediate
(32, NULL, 60, 20, 0, 3);   -- Cycling: Advanced

-- Insert Flexibility-Yoga Exercises
-- Yoga: Beginner
INSERT INTO UserExercises (exercise_id, user_id, duration, difficulty, times_completed)
VALUES
(33, NULL, 10, 1, 0),
(34, NULL, 10, 1, 0),
(35, NULL, 10, 1, 0),
(36, NULL, 10, 1, 0),
(37, NULL, 10, 1, 0),
(38, NULL, 10, 1, 0),
(39, NULL, 10, 1, 0),
(40, NULL, 10, 1, 0),
(41, NULL, 10, 1, 0),
(42, NULL, 10, 1, 0),
(43, NULL, 10, 1, 0),
(44, NULL, 10, 1, 0),
(45, NULL, 10, 1, 0),
(46, NULL, 10, 1, 0),
(47, NULL, 10, 1, 0),
(48, NULL, 25, 2, 0),
(49, NULL, 25, 2, 0),
(50, NULL, 25, 2, 0),
(51, NULL, 25, 2, 0),
(52, NULL, 25, 2, 0),
(53, NULL, 25, 2, 0),
(54, NULL, 25, 2, 0),
(55, NULL, 25, 2, 0),
(56, NULL, 25, 2, 0),
(57, NULL, 25, 2, 0),
(58, NULL, 25, 2, 0),
(59, NULL, 25, 2, 0),
(60, NULL, 25, 2, 0),
(61, NULL, 25, 2, 0),
(62, NULL, 40, 3, 0),
(63, NULL, 40, 3, 0),
(64, NULL, 40, 3, 0),
(65, NULL, 40, 3, 0),
(66, NULL, 40, 3, 0),
(67, NULL, 40, 3, 0),
(68, NULL, 40, 3, 0),
(69, NULL, 40, 3, 0),
(70, NULL, 40, 3, 0),
(71, NULL, 40, 3, 0);

-- Insert Flexibility-Stretching Exercises
-- Stretching: Beginner
INSERT INTO UserExercises (exercise_id, user_id, duration, difficulty, times_completed)
VALUES
(72,  NULL, 10, 1, 0),
(73,  NULL, 10, 1, 0),
(74,  NULL, 10, 1, 0),
(75,  NULL, 10, 1, 0),
(76,  NULL, 10, 1, 0),
(77,  NULL, 10, 1, 0),
(78,  NULL, 10, 1, 0),
(79,  NULL, 10, 1, 0),
(80,  NULL, 10, 1, 0),
(81,  NULL, 10, 1, 0),
(82,  NULL, 10, 1, 0),
(83,  NULL, 10, 1, 0),
(84,  NULL, 10, 1, 0),
(85,  NULL, 10, 1, 0),
(86,  NULL, 25, 2, 0),
(87,  NULL, 25, 2, 0),
(88,  NULL, 25, 2, 0),
(89,  NULL, 25, 2, 0),
(90,  NULL, 25, 2, 0),
(91,  NULL, 25, 2, 0),
(92,  NULL, 25, 2, 0),
(93,  NULL, 25, 2, 0),
(94,  NULL, 25, 2, 0),
(95,  NULL, 25, 2, 0),
(96,  NULL, 25, 2, 0),
(97,  NULL, 25, 2, 0),
(98,  NULL, 25, 2, 0),
(99,  NULL, 25, 2, 0),
(100, NULL, 40, 3, 0),
(101, NULL, 40, 3, 0),
(102, NULL, 40, 3, 0),
(103, NULL, 40, 3, 0),
(104, NULL, 40, 3, 0),
(105, NULL, 40, 3, 0),
(106, NULL, 40, 3, 0),
(107, NULL, 40, 3, 0),
(108, NULL, 40, 3, 0),
(109, NULL, 40, 3, 0);

CREATE TABLE Workouts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    exercises JSON NOT NULL,
    date_completed VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- User 1: Strength beginner
INSERT INTO Workouts (user_id, exercises, date_completed)
VALUES
(
  "65512a3b7409f13021857720", 
  '{
    "1": {
      "id": 1,
      "name": "Bench press",
      "type": "Strength",
      "secondaryType": "Push",
      "description": "Lie with your back on a weight bench and then lower a barbell to your chest and press it back up",
      "userId": "65512a3b7409f13021857720",
      "muscleGroup": "Chest",
      "equipment": "Bench, barbell",
      "reps": 12,
      "sets": 3,
      "weightClass": "Barbell",
      "weight": 40,
      "rest": 60,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/1"
    },
    "2": {
      "id": 2,
      "name": "Overhead press",
      "type": "Strength",
      "secondaryType": "Push",
      "description": "Standing with the barbell at shoulder-height, press it up over your head",
      "userId": "65512a3b7409f13021857720",
      "muscleGroup": "Shoulders",
      "equipment": "Barbell",
      "reps": 12,
      "sets": 3,
      "weightClass": "Barbell",
      "weight": 40,
      "rest": 60,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/2"
    },
    "3": {
      "id": 3,
      "name": "Preacher curls",
      "type": "Strength",
      "secondaryType": "Pull",
      "description": "Grab the bar in front of you with your elbows resting on the bench and then perform a curl keeping your elbows in place",
      "userId": "65512a3b7409f13021857720",
      "muscleGroup": "Biceps",
      "equipment": "Barbell, bench",
      "reps": 12,
      "sets": 3,
      "weightClass": "Barbell",
      "weight": 40,
      "rest": 60,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/3"
    },
    "4": {
      "id": 4,
      "name": "Cable rows",
      "type": "Strength",
      "secondaryType": "Pull",
      "description": "Grab the cable with your arms stretched out in front of you, pull it back until your elbows are behind you and then release",
      "userId": "65512a3b7409f13021857720",
      "muscleGroup": "Back",
      "equipment": "Cable machine",
      "reps": 12,
      "sets": 3,
      "weightClass": "Barbell",
      "weight": 40,
      "rest": 60,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/4"
    },
    "7": {
      "id": 7,
      "name": "Squats",
      "type": "Strength",
      "secondaryType": "Legs",
      "description": "With a barbell across your shoulders, lower down into a squat and then press back up",
      "userId": "65512a3b7409f13021857720",
      "muscleGroup": "Quads",
      "equipment": "Barbell",
      "reps": 12,
      "sets": 3,
      "weightClass": "Barbell",
      "weight": 40,
      "rest": 60,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/7"
    },
    "8": {
      "id": 8,
      "name": "Leg press",
      "type": "Strength",
      "secondaryType": "Legs",
      "description": "Press your legs out and away from you and slowly lower back down.",
      "userId": "65512a3b7409f13021857720",
      "muscleGroup": "Quads",
      "equipment": "Leg press machine",
      "reps": 12,
      "sets": 3,
      "weightClass": "Barbell",
      "weight": 40,
      "rest": 60,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/8"
    }
  }',
  '1999-02-23 19:34:22'
);
INSERT INTO Workouts (user_id, exercises, date_completed)
VALUES
(
  "65512a3b7409f13021857720", 
  '{ 
    "13": {
    "id": 13,
    "name": "Dumbbell flys",
    "type": "Strength",
    "secondaryType": "Push",
    "description": "Lie with your back on a weight bench with your arms extended out to each side. Then, lift the dumbbells up over your head until they meet in the middle in front of you.",
    "userId": "65512a3b7409f13021857720",
    "muscleGroup": "Chest",
    "equipment": "Dumbells, bench",
    "reps": 12,
    "sets": 3,
    "weightClass": "Dumbbell",
    "weight": 10,
    "rest": 60,
    "timesCompleted": 0,
    "self": "http://localhost:8080/exercises/13"
  },
    "14": {
      "id": 14,
      "name": "Reverse flys",
      "type": "Strength",
      "secondaryType": "Push",
      "description": "Stand up, leaning forward, with a dumbbell in each hand and gradually raise the dumbbells out to the sides and lower them",
      "userId": "65512a3b7409f13021857720",
      "muscleGroup": "Chest",
      "equipment": "Dumbbells",
      "reps": 12,
      "sets": 3,
      "weightClass": "Dumbbell",
      "weight": 10,
      "rest": 60,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/14"
    },
      "5":  {
      "id": 5,
      "name": "Inverted rows",
      "type": "Strength",
      "secondaryType": "Pull",
      "description": "Lie flat on your back with your arms fully outstretched and grabbing the bar, then lift your body up to the bar and lower down",
      "userId": "65512a3b7409f13021857720",
      "muscleGroup": "Back",
      "equipment": "Barbell",
      "reps": 12,
      "sets": 3,
      "weightClass": "Barbell",
      "weight": 40,
      "rest": 60,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/5"
    },
    "6":  {
      "id": 6,
      "name": "Seated cable rows",
      "type": "Strength",
      "secondaryType": "Pull",
      "description": "Grab the cable with your arms stretched out in front of you, pull it back until your elbows are behind you and then release",
      "userId": "65512a3b7409f13021857720",
      "muscleGroup": "Back",
      "equipment": "Cable machine",
      "reps": 12,
      "sets": 3,
      "weightClass": "Barbell",
      "weight": 40,
      "rest": 60,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/6"
    },
    "9":  {
      "id": 9,
      "name": "Standing calf raises",
      "type": "Strength",
      "secondaryType": "Legs",
      "description": "Use a calf raise machine to apply weight to your shoulders as you stand up on tiptoes to lift it up.",
      "userId": "65512a3b7409f13021857720",
      "muscleGroup": "Calves",
      "equipment": "Calf raise machine",
      "reps": 12,
      "sets": 3,
      "weightClass": "Barbell",
      "weight": 40,
      "rest": 60,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/9"
    },
    "10": {
      "id": 10,
      "name": "Glute bridges",
      "type": "Strength",
      "secondaryType": "Legs",
      "description": "Lying on a bench with your feet on the floor and a dumbbell across your hips, raise your hips up to lift the weight and slowly lower down.",
      "userId": "65512a3b7409f13021857720",
      "muscleGroup": "Glutes",
      "equipment": "Barbell, Bench",
      "reps": 12,
      "sets": 3,
      "weightClass": "Barbell",
      "weight": 40,
      "rest": 60,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/10"
    }
  }',
  NULL
);

-- User 2: Strength intermediate
INSERT INTO Workouts (user_id, exercises, date_completed)
VALUES
(
  "65512a7064e79113efca213b", 
  '{ 
      "36": {
      "id": 36,
      "name": "Bench press",
      "type": "Strength",
      "secondaryType": "Push",
      "description": "Lie with your back on a weight bench and then lower a barbell to your chest and press it back up",
      "userId": "65512a7064e79113efca213b",
      "muscleGroup": "Chest",
      "equipment": "Bench, barbell",
      "reps": 8,
      "sets": 4,
      "weightClass": "Barbell",
      "weight": 25,
      "rest": 60,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/36"
    },
    "37": {
      "id": 37,
      "name": "Overhead press",
      "type": "Strength",
      "secondaryType": "Push",
      "description": "Standing with the barbell at shoulder-height, press it up over your head",
      "userId": "65512a7064e79113efca213b",
      "muscleGroup": "Shoulders",
      "equipment": "Barbell",
      "reps": 8,
      "sets": 4,
      "weightClass": "Barbell",
      "weight": 25,
      "rest": 60,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/37"
    },
    "38": {
      "id": 38,
      "name": "Preacher curls",
      "type": "Strength",
      "secondaryType": "Pull",
      "description": "Grab the bar in front of you with your elbows resting on the bench and then perform a curl keeping your elbows in place",
      "userId": "65512a7064e79113efca213b",
      "muscleGroup": "Biceps",
      "equipment": "Barbell, bench",
      "reps": 8,
      "sets": 4,
      "weightClass": "Barbell",
      "weight": 25,
      "rest": 60,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/38"
    },
    "39": {
      "id": 39,
      "name": "Cable rows",
      "type": "Strength",
      "secondaryType": "Pull",
      "description": "Grab the cable with your arms stretched out in front of you, pull it back until your elbows are behind you and then release",
      "userId": "65512a7064e79113efca213b",
      "muscleGroup": "Back",
      "equipment": "Cable machine",
      "reps": 8,
      "sets": 4,
      "weightClass": "Barbell",
      "weight": 25,
      "rest": 60,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/39"
    },
    "42": {
      "id": 42,
      "name": "Squats",
      "type": "Strength",
      "secondaryType": "Legs",
      "description": "With a barbell across your shoulders, lower down into a squat and then press back up",
      "userId": "65512a7064e79113efca213b",
      "muscleGroup": "Quads",
      "equipment": "Barbell",
      "reps": 8,
      "sets": 4,
      "weightClass": "Barbell",
      "weight": 25,
      "rest": 60,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/42"
    },
    "43": {
      "id": 43,
      "name": "Leg press",
      "type": "Strength",
      "secondaryType": "Legs",
      "description": "Press your legs out and away from you and slowly lower back down.",
      "userId": "65512a7064e79113efca213b",
      "muscleGroup": "Quads",
      "equipment": "Leg press machine",
      "reps": 8,
      "sets": 4,
      "weightClass": "Barbell",
      "weight": 25,
      "rest": 60,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/43"
    }
  }',
  '1999-02-23 19:34:22'
);
INSERT INTO Workouts (user_id, exercises, date_completed)
VALUES
(
  "65512a7064e79113efca213b", 
  '{ 
    "48": {
      "id": 48,
      "name": "Dumbbell flys",
      "type": "Strength",
      "secondaryType": "Push",
      "description": "Lie with your back on a weight bench with your arms extended out to each side. Then, lift the dumbbells up over your head until they meet in the middle in front of you.",
      "userId": "65512a7064e79113efca213b",
      "muscleGroup": "Chest",
      "equipment": "Dumbells, bench",
      "reps": 8,
      "sets": 4,
      "weightClass": "Dumbbell",
      "weight": 60,
      "rest": 60,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/48"
    },
    "49": {
      "id": 49,
      "name": "Reverse flys",
      "type": "Strength",
      "secondaryType": "Push",
      "description": "Stand up, leaning forward, with a dumbbell in each hand and gradually raise the dumbbells out to the sides and lower them",
      "userId": "65512a7064e79113efca213b",
      "muscleGroup": "Chest",
      "equipment": "Dumbbells",
      "reps": 8,
      "sets": 4,
      "weightClass": "Dumbbell",
      "weight": 60,
      "rest": 60,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/49"
    },
    "40":  {
      "id": 40,
      "name": "Inverted rows",
      "type": "Strength",
      "secondaryType": "Pull",
      "description": "Lie flat on your back with your arms fully outstretched and grabbing the bar, then lift your body up to the bar and lower down",
      "userId": "65512a7064e79113efca213b",
      "muscleGroup": "Back",
      "equipment": "Barbell",
      "reps": 8,
      "sets": 4,
      "weightClass": "Barbell",
      "weight": 25,
      "rest": 60,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/40"
    },
    "41":  {
      "id": 41,
      "name": "Seated cable rows",
      "type": "Strength",
      "secondaryType": "Pull",
      "description": "Grab the cable with your arms stretched out in front of you, pull it back until your elbows are behind you and then release",
      "userId": "65512a7064e79113efca213b",
      "muscleGroup": "Back",
      "equipment": "Cable machine",
      "reps": 8,
      "sets": 4,
      "weightClass": "Barbell",
      "weight": 25,
      "rest": 60,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/41"
    },
    "44":  {
      "id": 44,
      "name": "Standing calf raises",
      "type": "Strength",
      "secondaryType": "Legs",
      "description": "Use a calf raise machine to apply weight to your shoulders as you stand up on tiptoes to lift it up.",
      "userId": "65512a7064e79113efca213b",
      "muscleGroup": "Calves",
      "equipment": "Calf raise machine",
      "reps": 8,
      "sets": 4,
      "weightClass": "Barbell",
      "weight": 25,
      "rest": 60,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/44"
    },
    "45": {
      "id": 45,
      "name": "Glute bridges",
      "type": "Strength",
      "secondaryType": "Legs",
      "description": "Lying on a bench with your feet on the floor and a dumbbell across your hips, raise your hips up to lift the weight and slowly lower down.",
      "userId": "65512a7064e79113efca213b",
      "muscleGroup": "Glutes",
      "equipment": "Barbell, Bench",
      "reps": 8,
      "sets": 4,
      "weightClass": "Barbell",
      "weight": 25,
      "rest": 60,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/45"
    }
  }',
  NULL
);

-- User 3: Strength advanced
INSERT INTO Workouts (user_id, exercises, date_completed)
VALUES
(
  "65512aa4f51452e44ecddaae", 
  '{ 
    "71": {
      "id": 71,
      "name": "Bench press",
      "type": "Strength",
      "secondaryType": "Push",
      "description": "Lie with your back on a weight bench and then lower a barbell to your chest and press it back up",
      "userId": "65512aa4f51452e44ecddaae",
      "muscleGroup": "Chest",
      "equipment": "Bench, barbell",
      "reps": 5,
      "sets": 5,
      "weightClass": "Barbell",
      "weight": 45,
      "rest": 90,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/71"
    },
    "72": {
      "id": 72,
      "name": "Overhead press",
      "type": "Strength",
      "secondaryType": "Push",
      "description": "Standing with the barbell at shoulder-height, press it up over your head",
      "userId": "65512aa4f51452e44ecddaae",
      "muscleGroup": "Shoulders",
      "equipment": "Barbell",
      "reps": 5,
      "sets": 5,
      "weightClass": "Barbell",
      "weight": 45,
      "rest": 90,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/72"
    },
    "73": {
      "id": 73,
      "name": "Preacher curls",
      "type": "Strength",
      "secondaryType": "Pull",
      "description": "Grab the bar in front of you with your elbows resting on the bench and then perform a curl keeping your elbows in place",
      "userId": "65512aa4f51452e44ecddaae",
      "muscleGroup": "Biceps",
      "equipment": "Barbell, bench",
      "reps": 5,
      "sets": 5,
      "weightClass": "Barbell",
      "weight": 45,
      "rest": 90,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/73"
    },
    "74": {
      "id": 74,
      "name": "Cable rows",
      "type": "Strength",
      "secondaryType": "Pull",
      "description": "Grab the cable with your arms stretched out in front of you, pull it back until your elbows are behind you and then release",
      "userId": "65512aa4f51452e44ecddaae",
      "muscleGroup": "Back",
      "equipment": "Cable machine",
      "reps": 5,
      "sets": 5,
      "weightClass": "Barbell",
      "weight": 45,
      "rest": 90,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/74"
    },
    "77": {
      "id": 77,
      "name": "Squats",
      "type": "Strength",
      "secondaryType": "Legs",
      "description": "With a barbell across your shoulders, lower down into a squat and then press back up",
      "userId": "65512aa4f51452e44ecddaae",
      "muscleGroup": "Quads",
      "equipment": "Barbell",
      "reps": 5,
      "sets": 5,
      "weightClass": "Barbell",
      "weight": 45,
      "rest": 90,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/77"
    },
    "78": {
      "id": 78,
      "name": "Leg press",
      "type": "Strength",
      "secondaryType": "Legs",
      "description": "Press your legs out and away from you and slowly lower back down.",
      "userId": "65512aa4f51452e44ecddaae",
      "muscleGroup": "Quads",
      "equipment": "Leg press machine",
      "reps": 5,
      "sets": 5,
      "weightClass": "Barbell",
      "weight": 45,
      "rest": 90,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/78"
   }
  }',
  '1999-02-23 19:34:22'
);

INSERT INTO Workouts (user_id, exercises, date_completed)
VALUES
(
  "65512aa4f51452e44ecddaae", 
  '{ 
    "83": {
      "id": 83,
      "name": "Dumbbell flys",
      "type": "Strength",
      "secondaryType": "Push",
      "description": "Lie with your back on a weight bench with your arms extended out to each side. Then, lift the dumbbells up over your head until they meet in the middle in front of you.",
      "userId": "65512aa4f51452e44ecddaae",
      "muscleGroup": "Chest",
      "equipment": "Dumbells, bench",
      "reps": 5,
      "sets": 5,
      "weightClass": "Dumbbell",
      "weight": 90,
      "rest": 90,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/83"
    },
    "84": {
      "id": 84,
      "name": "Reverse flys",
      "type": "Strength",
      "secondaryType": "Push",
      "description": "Stand up, leaning forward, with a dumbbell in each hand and gradually raise the dumbbells out to the sides and lower them",
      "userId": "65512aa4f51452e44ecddaae",
      "muscleGroup": "Chest",
      "equipment": "Dumbbells",
      "reps": 5,
      "sets": 5,
      "weightClass": "Dumbbell",
      "weight": 90,
      "rest": 90,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/84"
    },
    "75":  {
      "id": 75,
      "name": "Inverted rows",
      "type": "Strength",
      "secondaryType": "Pull",
      "description": "Lie flat on your back with your arms fully outstretched and grabbing the bar, then lift your body up to the bar and lower down",
      "userId": "65512aa4f51452e44ecddaae",
      "muscleGroup": "Back",
      "equipment": "Barbell",
      "reps": 5,
      "sets": 5,
      "weightClass": "Barbell",
      "weight": 45,
      "rest": 90,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/75"
    },
    "76":  {
      "id": 76,
      "name": "Seated cable rows",
      "type": "Strength",
      "secondaryType": "Pull",
      "description": "Grab the cable with your arms stretched out in front of you, pull it back until your elbows are behind you and then release",
      "userId": "65512aa4f51452e44ecddaae",
      "muscleGroup": "Back",
      "equipment": "Cable machine",
      "reps": 5,
      "sets": 5,
      "weightClass": "Barbell",
      "weight": 45,
      "rest": 90,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/76"
    },
    "79": {
      "id": 79,
      "name": "Standing calf raises",
      "type": "Strength",
      "secondaryType": "Legs",
      "description": "Use a calf raise machine to apply weight to your shoulders as you stand up on tiptoes to lift it up.",
      "userId": "65512aa4f51452e44ecddaae",
      "muscleGroup": "Calves",
      "equipment": "Calf raise machine",
      "reps": 5,
      "sets": 5,
      "weightClass": "Barbell",
      "weight": 45,
      "rest": 90,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/79"
    },
    "80": {
      "id": 80,
      "name": "Glute bridges",
      "type": "Strength",
      "secondaryType": "Legs",
      "description": "Lying on a bench with your feet on the floor and a dumbbell across your hips, raise your hips up to lift the weight and slowly lower down.",
      "userId": "65512aa4f51452e44ecddaae",
      "muscleGroup": "Glutes",
      "equipment": "Barbell, Bench",
      "reps": 5,
      "sets": 5,
      "weightClass": "Barbell",
      "weight": 45,
      "rest": 90,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/80"
    }
  }',
  '1999-02-24 19:34:22'
);

-- User 4: Cardio running
INSERT INTO Workouts (user_id, exercises, date_completed)
VALUES
(
  "65512ad4f51452e44ecddac4", 
  '{ 
    "106": {
      "id": 106,
      "name": "Running",
      "type": "Cardio",
      "secondaryType": "Running",
      "description": "Run, Forrest, run!",
      "muscleGroup": null,
      "userId": "65512ad4f51452e44ecddac4",
      "duration": 15,
      "distance": 1,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/106"
    }
  }',
  NULL
);

-- User 5: Cardio cycling
INSERT INTO Workouts (user_id, exercises, date_completed)
VALUES
(
  "65512b098eaf8db1930f6e56", 
  '{ 
    "107": {
      "id": 107,
      "name": "Cycling",
      "type": "Cardio",
      "secondaryType": "Cycling",
      "description": "I want to ride my bicycle, I want to ride my bike!",
      "muscleGroup": null,
      "userId": "65512b098eaf8db1930f6e56",
      "duration": 20,
      "distance": 4,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/107"
    }
  }',
  '1999-02-24 19:34:22'
);

-- User 6: Flexibility yoga
INSERT INTO Workouts (user_id, exercises, date_completed)
VALUES
(
  "655133dd3e05dd89a157815a", 
  '{ 
    "108": {
      "id": 108,
      "name": "Mountain",
      "type": "Flexibility",
      "secondaryType": "Yoga",
      "description": "Stand upright with your arms at your sides, palms facing forward",
      "muscleGroup": null,
      "userId": "655133dd3e05dd89a157815a",
      "duration": 10,
      "difficulty": 1,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/108"
    },
    "109": {
      "id": 109,
      "name": "Standing Forward Bend",
      "type": "Flexibility",
      "secondaryType": "Yoga",
      "description": "With your legs straight, bend over and try to touch your toes",
      "muscleGroup": null,
      "userId": "655133dd3e05dd89a157815a",
      "duration": 10,
      "difficulty": 1,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/109"
    },
    "110": {
      "id": 110,
      "name": "Child\'s Pose",
      "type": "Flexibility",
      "secondaryType": "Yoga",
      "description": "Sit kneeling on the floor and bring your forehead to touch the ground with your arms outstretched overhead.",
      "muscleGroup": null,
      "userId": "655133dd3e05dd89a157815a",
      "duration": 10,
      "difficulty": 1,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/110"
    },
    "111": {
      "id": 111,
      "name": "Cat-Cow",
      "type": "Flexibility",
      "secondaryType": "Yoga",
      "description": "On all fours, arch your back on the inhale, round your back on the exhale. Repeat.",
      "muscleGroup": null,
      "userId": "655133dd3e05dd89a157815a",
      "duration": 10,
      "difficulty": 1,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/111"
    },
    "112": {
      "id": 112,
      "name": "Downward Facing Dog",
      "type": "Flexibility",
      "secondaryType": "Yoga",
      "description": "On all fours with your hands and feet 3-4 feet apart, extend your limbs and press into the floor to lift your body off the ground.",
      "muscleGroup": null,
      "userId": "655133dd3e05dd89a157815a",
      "duration": 10,
      "difficulty": 1,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/112"
    },
    "13": {
      "id": 113,
      "name": "Warrior I",
      "type": "Cardio",
      "secondaryType": "Yoga",
      "description": "Assume a lunge position, put your hands together, and lift them up over your head. Repeat on both sides.",
      "muscleGroup": null,
      "userId": "655133dd3e05dd89a157815a",
      "duration": 10,
      "distance": null,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/113"
     },
    "114": {
      "id": 114,
      "name": "Warrior II",
      "type": "Cardio",
      "secondaryType": "Yoga",
      "description": "Assume a lunge position, stretch your hands out so that your arms are straight over their respective legs. Repeat on both sides.",
      "muscleGroup": null,
      "userId": "655133dd3e05dd89a157815a",
      "duration": 10,
      "distance": null,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/114"
    },
    "115": {
      "id": 115,
      "name": "Triangle",
      "type": "Cardio",
      "secondaryType": "Yoga",
      "description": "Place one foot 3-4 feet in front of the other, reach down and grab your front foot with the same arm and stretch the other arm up overhead. Repeat on both sides.",
      "muscleGroup": null,
      "userId": "655133dd3e05dd89a157815a",
      "duration": 10,
      "distance": null,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/115"
    }
  }',
  NULL
);

-- User 7: Flexibility stretching
INSERT INTO Workouts (user_id, exercises, date_completed)
VALUES
(
  "655133f67409f13021857cfb", 
  '{ 
    "147": {
      "id": 147,
      "name": "Neck Side Stretch",
      "type": "Cardio",
      "secondaryType": "Stretching",
      "description": "Place your left hand on the right side of your head and gently pull down towards your left shoulder. Repeat on the other side.",
      "muscleGroup": null,
      "userId": "655133f67409f13021857cfb",
      "duration": 10,
      "distance": null,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/147"
    },
    "148": {
      "id": 148,
      "name": "Neck Rolls",
      "type": "Cardio",
      "secondaryType": "Stretching",
      "description": "Draw big circles with your nose in both directions.",
      "muscleGroup": null,
      "userId": "655133f67409f13021857cfb",
      "duration": 10,
      "distance": null,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/148"
    },
    "149": {
      "id": 149,
      "name": "Shoulder Rolls",
      "type": "Cardio",
      "secondaryType": "Stretching",
      "description": "Draw big circles with your shoulders in both directions.",
      "muscleGroup": null,
      "userId": "655133f67409f13021857cfb",
      "duration": 10,
      "distance": null,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/149"
    },
    "150": {
      "id": 150,
      "name": "Wrist Circles",
      "type": "Cardio",
      "secondaryType": "Stretching",
      "description": "Draw big circles with your wrists in both directions.",
      "muscleGroup": null,
      "userId": "655133f67409f13021857cfb",
      "duration": 10,
      "distance": null,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/150"
    },
    "151": {
      "id": 151,
      "name": "Cat-Cow",
      "type": "Cardio",
      "secondaryType": "Stretching",
      "description": "On all fours, arch your back on the inhale, round your back on the exhale. Repeat.",
      "muscleGroup": null,
      "userId": "655133f67409f13021857cfb",
      "duration": 10,
      "distance": null,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/151"
    },
    "152": {
      "id": 152,
      "name": "Seated Forward Bend",
      "type": "Cardio",
      "secondaryType": "Stretching",
      "description": "Sit with your legs out in front of you and reach as far forward as possible.",
      "muscleGroup": null,
      "userId": "655133f67409f13021857cfb",
      "duration": 10,
      "distance": null,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/152"
    },
    "153": {
      "id": 153,
      "name": "Standing Forward Bend",
      "type": "Cardio",
      "secondaryType": "Stretching",
      "description": "Standing with feet shoulder-width apart, reach down towards the floor as far as you can",
      "muscleGroup": null,
      "userId": "655133f67409f13021857cfb",
      "duration": 10,
      "distance": null,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/153"
    },
    "154": {
      "id": 154,
      "name": "Standing Quad Stretch",
      "type": "Cardio",
      "secondaryType": "Stretching",
      "description": "Standing on one leg, grab the other foot behind you with the opposite hand and gently pull back. Repeat on the other side.",
      "muscleGroup": null,
      "userId": "655133f67409f13021857cfb",
      "duration": 10,
      "distance": null,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/154"
    }
  }',
  '1999-02-23 19:34:22'
);

INSERT INTO Workouts (user_id, exercises, date_completed)
VALUES
(
  "655133f67409f13021857cfb", 
  '{ 
    "155": {
      "id": 155,
      "name": "Standing Calf Stretch",
      "type": "Cardio",
      "secondaryType": "Stretching",
      "description": "Using a wall or some flat object in front of you, elevate one toe on this object and then lean forward until you feel a calf stretch. Repeat on the other side.",
      "muscleGroup": null,
      "userId": "655133f67409f13021857cfb",
      "duration": 10,
      "distance": null,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/155"
    },
    "156": {
      "id": 156,
      "name": "Ankle Rolls",
      "type": "Cardio",
      "secondaryType": "Stretching",
      "description": "Draw big circles with your ankles in both directions.",
      "muscleGroup": null,
      "userId": "655133f67409f13021857cfb",
      "duration": 10,
      "distance": null,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/156"
    },
    "157": {
      "id": 157,
      "name": "Seated Side Stretch",
      "type": "Cardio",
      "secondaryType": "Stretching",
      "description": "Sitting cross-legged on the floor, place one hand at your side and stretch the other arm up and over your head, using your floor hand to balance. Repeat on the other side.",
      "muscleGroup": null,
      "userId": "655133f67409f13021857cfb",
      "duration": 10,
      "distance": null,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/157"
    },
    "158": {
      "id": 158,
      "name": "Triceps Stretch",
      "type": "Cardio",
      "secondaryType": "Stretching",
      "description": "Straighten one arm over your head, bend the elbow until your hand is behind your head and gently pull back on your elbow with the opposite hand. Repeat on both sides.",
      "muscleGroup": null,
      "userId": "655133f67409f13021857cfb",
      "duration": 10,
      "distance": null,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/158"
    },
    "159": {
      "id": 159,
      "name": "Cross-body Shoulder Stretch",
      "type": "Cardio",
      "secondaryType": "Stretching",
      "description": "Stretch one arm all the way across your chest and gently pull with the opposite hand. Repeat on both sides.",
      "muscleGroup": null,
      "userId": "655133f67409f13021857cfb",
      "duration": 10,
      "distance": null,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/159"
    },
    "160": {
      "id": 160,
      "name": "Hamstring Stretch",
      "type": "Cardio",
      "secondaryType": "Stretching",
      "description": "Sitting on the floor, bend one leg so that your foot is against the inside of the opposite thigh and stretch the other out in front of you. Stretch towards your outstretched leg with both hands. Repeat on the other side.",
      "muscleGroup": null,
      "userId": "655133f67409f13021857cfb",
      "duration": 10,
      "distance": null,
      "timesCompleted": 0,
      "self": "http://localhost:8080/exercises/160"
    },
    "147": {
      "id": 147,
      "name": "Neck Side Stretch",
      "type": "Cardio",
      "secondaryType": "Stretching",
      "description": "Place your left hand on the right side of your head and gently pull down towards your left shoulder. Repeat on the other side.",
      "muscleGroup": null,
      "userId": "655133f67409f13021857cfb",
      "duration": 10,
      "distance": null,
      "timesCompleted": 1,
      "self": "http://localhost:8080/exercises/147"
    },
    "148": {
      "id": 148,
      "name": "Neck Rolls",
      "type": "Cardio",
      "secondaryType": "Stretching",
      "description": "Draw big circles with your nose in both directions.",
      "muscleGroup": null,
      "userId": "655133f67409f13021857cfb",
      "duration": 10,
      "distance": null,
      "timesCompleted": 1,
      "self": "http://localhost:8080/exercises/148"
    }
  }',
  NULL
);

CREATE TABLE Surveys (
    id INT AUTO_INCREMENT PRIMARY KEY,
    exercise_id INT NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    datetime DATETIME,
    reps INT,
    sets INT,
    weight INT,
    rest INT,
    difficulty INT,
    duration INT,
    distance INT,
    FOREIGN KEY (exercise_id) REFERENCES UserExercises(id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
