from django.contrib import admin
from .models import reader
from .models import Book
from .models import CheckoutRecord

admin.site.register(reader)
admin.site.register(Book)   
admin.site.register(CheckoutRecord)

