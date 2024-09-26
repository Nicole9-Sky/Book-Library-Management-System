from django.contrib import admin
from .models import reader
from .models import Book

admin.site.register(reader)
admin.site.register(Book)
