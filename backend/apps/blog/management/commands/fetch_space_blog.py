import requests
from datetime import datetime, timedelta
from django.core.files.base import ContentFile
from django.core.management.base import BaseCommand
from django.utils.text import slugify

from apps.blog.models import BlogPost, BlogCategory, BlogTag
from django.contrib.auth import get_user_model

User = get_user_model()


API_URL = "https://api.spaceflightnewsapi.net/v4/articles/"


class Command(BaseCommand):
    help = "Fetch space articles and import them as blog posts for last 7 days"

    def handle(self, *args, **kwargs):
        self.stdout.write("🚀 Fetching space blog posts...")

        since_date = datetime.utcnow() - timedelta(days=7)
        params = {
            "published_at_gte": since_date.isoformat() + "Z",
            "limit": 100,
        }

        response = requests.get(API_URL, params=params)
        data = response.json()

        results = data.get("results", [])

        if not results:
            self.stdout.write("⚠️ No articles found")
            return

        # Категория по умолчанию
        category, _ = BlogCategory.objects.get_or_create(
            slug="kosmos",
            defaults={"title": "Космос"}
        )

        # Автор по умолчанию
        default_author = User.objects.filter(is_superuser=True).first()

        created_count = 0

        for item in results:
            title = item["title"]
            slug = slugify(title)

            if BlogPost.objects.filter(slug=slug).exists():
                continue

            content = item.get("summary") or ""
            published_at = item.get("published_at")
            source = item.get("news_site")
            url = item.get("url")
            image_url = item.get("image_url")

            # Создаём пост
            post = BlogPost(
                title=title,
                slug=slug,
                content=content,
                category=category,
                author=default_author,
                status="published",
                created_at=published_at,
            )

            # Скачиваем картинку
            if image_url:
                try:
                    img_resp = requests.get(image_url)
                    if img_resp.status_code == 200:
                        file_name = f"{slug}.jpg"
                        post.cover_image.save(file_name, ContentFile(img_resp.content), save=False)
                except Exception as e:
                    self.stdout.write(f"⚠️ Failed to download image: {e}")

            post.save()

            # Создаём теги по ключевым словам
            keywords = item.get("keywords", [])
            for kw in keywords:
                tag_slug = slugify(kw)
                tag, _ = BlogTag.objects.get_or_create(slug=tag_slug, defaults={"name": kw})
                post.tags.add(tag)

            created_count += 1

        self.stdout.write(f"✅ Done! Created {created_count} blog posts.")
