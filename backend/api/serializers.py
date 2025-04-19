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

class ReturnSerializer(serializers.ModelSerializer):
    bookTitle = serializers.CharField(source='book.title', read_only=True)
    author = serializers.CharField(source='book.author', read_only=True)
    published = serializers.CharField(source='book.published', read_only=True)
    name = serializers.CharField(source='reader.reader_name', read_only=True)
    readerId = serializers.IntegerField(source='reader.id', read_only=True)
    bookId = serializers.IntegerField(source='book.id', read_only=True)
    rentalDate = serializers.DateTimeField(source='checkout_date', read_only=True)
    returnDate = serializers.DateTimeField(source='due_date', read_only=True)

    class Meta:
        model = CheckoutRecord  # or whatever your model is
        fields = [
            'id', 'readerId', 'name',
            'bookId', 'bookTitle', 'author', 'published',
            'rentalDate', 'returnDate'
        ]
