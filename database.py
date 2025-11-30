from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# для начала можешь использовать SQLite:
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
# а потом заменить на Postgres, например:
# "postgresql://user:password@localhost:5432/shop_db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False} if "sqlite" in SQLALCHEMY_DATABASE_URL else {}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# dependency для FastAPI
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
