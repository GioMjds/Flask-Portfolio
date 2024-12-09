import mysql.connector

def get_conn():
    return mysql.connector.connect(
        host='localhost',
        user='root',
        password='',
        database='portfolio',
        auth_plugin='mysql_native_password'
    )