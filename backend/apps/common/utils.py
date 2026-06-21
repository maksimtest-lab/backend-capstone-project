import uuid
from pytils.translit import slugify


def unique_slugify(instance, value, slug_field_name="slug"):
    """
    Генерирует уникальный slug на основе pytils.translit.slugify.
    """
    base_slug = slugify(value)
    if not base_slug:
        base_slug = str(uuid.uuid4())

    slug = base_slug
    ModelClass = instance.__class__
    counter = 1

    while ModelClass.objects.filter(**{slug_field_name: slug}).exists():
        slug = f"{base_slug}-{counter}"
        counter += 1

    return slug
