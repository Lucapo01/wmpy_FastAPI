import databases
import sqlalchemy

def main():
    DATABASE_URL = "sqlite:///./test.db"

    database = databases.Database(DATABASE_URL)

    engine = sqlalchemy.create_engine(
        DATABASE_URL, connect_args={"check_same_thread": False})

    metadata = sqlalchemy.MetaData()

    validation_table = sqlalchemy.Table(
        "validation table",
        metadata,
        sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
        sqlalchemy.Column("email", sqlalchemy.String),
        sqlalchemy.Column("username", sqlalchemy.String),
        sqlalchemy.Column("password", sqlalchemy.String),
        sqlalchemy.Column("token", sqlalchemy.String),
        sqlalchemy.Column("timestamp", sqlalchemy.String)
    )

    user_table = sqlalchemy.Table(
        "user table",
        metadata,
        sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
        sqlalchemy.Column("username", sqlalchemy.String),
        sqlalchemy.Column("email", sqlalchemy.String),
        sqlalchemy.Column("password", sqlalchemy.String),
    )

    metadata.create_all(engine)


    return database, validation_table, user_table