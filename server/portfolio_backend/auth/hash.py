import bcrypt
import mysql.connector

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="portfolio",
)

cursor = db.cursor()

user_data = {
    'firstname': 'Gio',
    'middlename': 'Magaway',
    'lastname': 'Majadas',
    'birthday': '2003-04-05',
    'age': 21,
    'contact_number': '09202129617',
    'email': 'giomjds@gmail.com',
    'username': 'Mimic1',
    'password': 'mimicplays12'
}

hashed_password = bcrypt.hashpw(user_data['password'].encode('utf-8'), bcrypt.gensalt())

query = """
    INSERT INTO users (firstName, middleName, lastName, birthday, age, contactNumber, email, username, password) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
"""

values = (
    user_data['firstname'],
    user_data['middlename'],
    user_data['lastname'],
    user_data['birthday'],
    user_data['age'],
    user_data['contact_number'],
    user_data['email'],
    user_data['username'],
    hashed_password
)

cursor.execute(query, values)
db.commit()

print(f"User {user_data['firstname']} added!")

cursor.close()
db.close()