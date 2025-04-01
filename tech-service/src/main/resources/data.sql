CREATE TABLE Technician (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    json_data CLOB
);


INSERT INTO Technician (id, json_data) VALUES ('TECH1243', '{"firstName": "John", "lastName": "Doe", "id": "TECH1243", "skills": ["Wireless","Fiber"], "phoneNumber": "123-456-7890"}');
INSERT INTO Technician (id, json_data) VALUES ('TECH2645', '{"firstName": "Jane", "lastName": "Smith", "id": "TECH2645", "skills": ["Cable", "Fiber"], "phoneNumber": "098-765-4321"}');
INSERT INTO Technician (id, json_data) VALUES ('TECH5809', '{"firstName": "Jim", "lastName": "Brown", "id": "TECH5809", "skills": ["Cable", "Wireless"], "phoneNumber": "555-555-5555"}');