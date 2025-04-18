from django.db import models
from django.utils import timezone

# Book model
class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=200)
    published = models.CharField(max_length=200)
    is_checked_out = models.BooleanField(default=False)


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

class CheckoutRecord(models.Model):
    reader = models.ForeignKey('reader', on_delete=models.CASCADE)
    book = models.ForeignKey('Book', on_delete=models.CASCADE)
    checkout_date = models.DateTimeField(default=timezone.now)
    due_date = models.DateTimeField()

    def __str__(self):
        return f"{self.reader.reader_name} checked out {self.book.title}"
