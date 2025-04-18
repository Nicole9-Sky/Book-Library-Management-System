# serializers.py
from rest_framework import serializers
from .models import reader, Book, CheckoutRecord

class ReaderSerializer(serializers.ModelSerializer):
    # books_in_bag = BookSerializer(many=True, read_only=True)
    class Meta:
        model = reader
        fields = ['id', 'reference_id', 'reader_name', 'reader_contact','reader_address', 'books_in_bag']


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'published']

class CheckoutRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = CheckoutRecord
        fields = ['id', 'reader', 'book', 'checkout_date', 'due_date']
