from django.contrib.auth.models import Group, Permission
from django.db.models.signals import post_migrate
from django.dispatch import receiver


@receiver(post_migrate)
def ensure_groups_are_created_and_permissions_are_set(*args, **kwargs):
    group, _ = Group.objects.get_or_create(name="Intra")
    group.permissions.add(*Permission.objects.filter(content_type__app_label="auth"))
