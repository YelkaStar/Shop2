from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from .database import get_db
from . import models, schemas
from .security import get_password_hash, verify_password, create_access_token
from jose import JWTError, jwt
from .security import SECRET_KEY, ALGORITHM

router = APIRouter(prefix="/auth", tags=["auth"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

# ----------- регистрация -----------

@router.post("/register", response_model=schemas.UserOut)
def register(user_in: schemas.UserCreate, db: Session = Depends(get_db)):
    # проверяем, что email и username ещё не заняты
    if db.query(models.User).filter(models.User.email == user_in.email).first():
        raise HTTPException(status_code=400, detail="Email уже используется")

    if db.query(models.User).filter(models.User.username == user_in.username).first():
        raise HTTPException(status_code=400, detail="Логин уже используется")

    try:
        user = models.User(
            email=user_in.email,
            username=user_in.username,
            hashed_password=get_password_hash(user_in.password),
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        return user
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Ошибка при создании пользователя: {str(e)}")

# ----------- логин -----------

@router.post("/login", response_model=schemas.Token)
def login(
    login_data: schemas.LoginRequest,
    db: Session = Depends(get_db),
):
    # проверяем по email или username
    user = (
        db.query(models.User)
        .filter(
            (models.User.username == login_data.username) |
            (models.User.email == login_data.username)
        )
        .first()
    )
    if not user:
        raise HTTPException(status_code=400, detail="Неверный логин или пароль")

    if not verify_password(login_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Неверный логин или пароль")

    access_token = create_access_token({"sub": str(user.id)})

    return schemas.Token(access_token=access_token)

# ----------- получение текущего юзера по токену --00---------

def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
) -> models.User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Не удалось проверить токен",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        sub: str = payload.get("sub")
        if sub is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = db.query(models.User).filter(models.User.id == int(sub)).first()
    if user is None:
        raise credentials_exception
    return user


@router.get("/me", response_model=schemas.UserOut)
def read_me(current_user: models.User = Depends(get_current_user)):
    return current_user
