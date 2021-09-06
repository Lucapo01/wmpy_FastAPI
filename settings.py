from fastapi_mail import ConnectionConfig


confMail = ConnectionConfig(
    MAIL_USERNAME = "pruebabavsa01@gmail.com",
    MAIL_PASSWORD = "Bavsa012",
    MAIL_FROM = "pruebabavsa01@gmail.com",
    MAIL_PORT = 587,
    MAIL_SERVER = "smtp.gmail.com",
    MAIL_FROM_NAME="Activación de Cuenta BAVSA",
    MAIL_TLS = True,
    MAIL_SSL = False,
    USE_CREDENTIALS = True,
    VALIDATE_CERTS = True
)

host_url = "localhost:8000"