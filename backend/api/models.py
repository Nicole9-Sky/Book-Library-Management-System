from django.db import models

# Book model
class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=200)
    published = models.CharField(max_length=200)

    def __str__(self):
        return self.title


# reader model (lowercase name)
class reader(models.Model):
    reference_id = models.CharField(max_length=200)
    reader_name = models.CharField(max_length=200)
    reader_contact = models.CharField(max_length=200)
    reader_address = models.TextField()
    active = models.BooleanField(default=True)
    books_in_bag = models.ManyToManyField(Book, blank=True)

    def __str__(self):
        return self.reader_name
