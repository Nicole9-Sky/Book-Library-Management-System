from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import reader, Book  # Use 'reader' (lowercase)
from .serializers import ReaderSerializer, BookSerializer
from django.utils.timezone import now

# ReaderViewSet for handling CRUD operations via REST API
class ReaderViewSet(viewsets.ModelViewSet):
    queryset = reader.objects.all()  # Use lowercase 'reader'
    serializer_class = ReaderSerializer

# BookViewSet for handling CRUD operations via REST API
class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

# Function to get all books
def get_books(request):
    books = Book.objects.all()
    book_list = [
        {"id": book.id, "title": book.title, "author": book.author, "published": book.published}
        for book in books
    ]
    return JsonResponse(book_list, safe=False)

# Function to add a book to the reader's bag
def add_to_bag(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    book.added_to_bag = True
    book.save()
    return JsonResponse({"message": "Book added to bag!"}, status=200)

# Get reader details by ID
def get_reader_by_id(request, reader_id):
    try:
        reader_obj = reader.objects.get(id=reader_id)  # Use lowercase 'reader'
        return JsonResponse({
            'name': reader_obj.reader_name,
            'contact': reader_obj.reader_contact,
            'reference_id': reader_obj.reference_id,
        }, status=200)
    except reader.DoesNotExist:
        return JsonResponse({'error': 'Reader not found'}, status=404)

# Update reader's bag (Add/Remove books)
def update_reader_bag(request, reader_id):
    reader_obj = get_object_or_404(reader, id=reader_id)  # Use lowercase 'reader'
    
    if request.method == "POST":
        # Add a book to the reader's bag
        book_id = request.data.get('book_id')  # Use request.data for POST
        book = get_object_or_404(Book, id=book_id)
        reader_obj.books_in_bag.add(book)
        return JsonResponse({'message': 'Book added to bag'}, status=200)
    
    if request.method == "DELETE":
        # Remove a book from the reader's bag
        book_id = request.data.get('book_id')  # Use request.data for DELETE
        book = get_object_or_404(Book, id=book_id)
        reader_obj.books_in_bag.remove(book)
        return JsonResponse({'message': 'Book removed from bag'}, status=200)

# API to checkout all books in the reader's bag
@api_view(['POST'])
def checkout_books(request, reader_id):
    reader_obj = get_object_or_404(reader, id=reader_id)  # Use lowercase 'reader'

    if reader_obj.books_in_bag.count() == 0:
        return Response({'error': 'No books in the bag to checkout.'}, status=400)

    # Simulate the checkout process, clearing the books in the bag
    checked_out_books = list(reader_obj.books_in_bag.all())
    reader_obj.books_in_bag.clear()  # Clear the books after checkout

    # Serialize the checked out books for response
    checked_out_books_data = [{'title': book.title, 'author': book.author} for book in checked_out_books]

    return Response({
        'message': 'Checkout completed successfully.',
        'checked_out_books': checked_out_books_data
    }, status=200)

# API to add books to the reader's bag
@api_view(['POST'])
def add_to_bag(request, reader_id):
    reader_obj = get_object_or_404(reader, id=reader_id)  # Use lowercase 'reader'
    book_id = request.data.get('book_id')

    if not book_id:
        return Response({'error': 'Book ID is required'}, status=400)

    book = get_object_or_404(Book, id=book_id)
    reader_obj.books_in_bag.add(book)  # Add the book to the reader's bag
    reader_obj.save()

    return Response({'message': f'Book "{book.title}" added to the bag.'}, status=200)

@api_view(['POST'])
def return_book(request, reader_id, book_id):
    try:
        reader_obj = reader.objects.get(id=reader_id)
        book = Book.objects.get(id=book_id)
        reader_obj.books_in_bag.remove(book)

        return JsonResponse({'message': f'Book "{book.title}" has been returned.'}, status=200)
    except reader.DoesNotExist:
        return JsonResponse({'error': 'Reader not found'}, status=404)
    except Book.DoesNotExist:
        return JsonResponse({'error': 'Book not found'}, status=404)


@api_view(['GET'])
def get_checked_out_books(request, reader_id):
    try:
        reader_obj = reader.objects.get(id=reader_id)
        checked_out_books = reader_obj.books_in_bag.all()
        
        # Assuming you have fields for rental_date and return_date (You might need to update your models)
        checked_out_books_data = [
            {
                'id': book.id,
                'title': book.title,
                'author': book.author,
                'published': book.published,
                'rental_date': 'July 1, 2023, 5:34 p.m.',  # Example: Make sure these dates are in your data
                'expected_return_date': 'July 20, 2023, 5:34 p.m.'
            } for book in checked_out_books
        ]

        return JsonResponse({
            'reader_name': reader_obj.reader_name,
            'reader_id': reader_obj.id,
            'checked_out_books': checked_out_books_data
        }, status=200)
    except reader.DoesNotExist:
        return JsonResponse({'error': 'Reader not found'}, status=404)