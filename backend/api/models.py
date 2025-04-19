from django.db import models
from django.utils import timezone

# Book model
class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=200)
    published = models.CharField(max_length=200)
    is_checked_out = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)  # Track when the book is created
    updated_at = models.DateTimeField(auto_now=True)  # Track when the book is last updated

    def __str__(self):
        return self.title

    def mark_as_checked_out(self):
        self.is_checked_out = True
        self.save()

    def mark_as_available(self):
        self.is_checked_out = False
        self.save()



# Reader model (lowercase name)
class reader(models.Model):
    reference_id = models.CharField(max_length=200)
    reader_name = models.CharField(max_length=200)
    reader_contact = models.CharField(max_length=200)
    reader_address = models.TextField()
    active = models.BooleanField(default=True)
    books_in_bag = models.ManyToManyField(Book, blank=True)

    def __str__(self):
        return self.reader_name

# CheckoutRecord model
class CheckoutRecord(models.Model):
    reader = models.ForeignKey('reader', on_delete=models.CASCADE)
    book = models.ForeignKey('Book', on_delete=models.CASCADE)
    checkout_date = models.DateTimeField(default=timezone.now)
    due_date = models.DateTimeField()
    return_date = models.DateTimeField(null=True, blank=True)
    is_active = models.BooleanField(default=True)  # Track whether the book is still checked out

    def __str__(self):
        return f"{self.reader.reader_name} checked out {self.book.title}"

    def mark_as_returned(self):
        self.return_date = timezone.now()
        self.is_active = False
        self.save()

    def is_overdue(self):
        if not self.return_date and self.due_date < timezone.now():
            return True
        return False
