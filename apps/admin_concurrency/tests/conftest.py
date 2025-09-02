import pytest


@pytest.fixture()
def admin_user2(db: None, django_user_model, django_username_field: str):
    """A Django admin user.

    This uses an existing user with username "admin", or creates a new one with
    password "password".
    """
    UserModel = django_user_model
    username_field = django_username_field
    username = "admin2@example.com" if username_field == "email" else "admin2"

    try:
        user = UserModel._default_manager.get_by_natural_key(username)
    except UserModel.DoesNotExist:
        user_data = {}
        if "email" in UserModel.REQUIRED_FIELDS:
            user_data["email"] = "admin2@example.com"
        user_data["password"] = "password"
        user_data[username_field] = username
        user = UserModel._default_manager.create_superuser(**user_data)
    return user


@pytest.fixture()
def admin_client2(db: None, admin_user2):
    """A Django test client logged in as an admin user."""
    from django.test import Client

    client = Client()
    client.force_login(admin_user2)
    return client
