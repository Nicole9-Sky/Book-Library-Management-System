from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ReaderViewSet, BookViewSet, get_reader_by_id, update_reader_bag, checkout_books,add_to_bag, get_checked_out_books, return_book

# Create the router for API viewsets
router = DefaultRouter()
router.register(r'readers', ReaderViewSet, basename='readers')
router.register(r'books', BookViewSet, basename='books')

# Include both the router URLs and the custom 'My Bag' functionality URLs
urlpatterns = [
    # Include the routes from the router for the viewsets
    path('', include(router.urls)),

    # Endpoint to get reader details by ID
    path('reader/<int:reader_id>/', get_reader_by_id, name='get_reader_by_id'),

    # Endpoint to update the reader's bag (Add or Remove books)
    path('reader/<int:reader_id>/update_bag/', update_reader_bag, name='update_reader_bag'),

    # Add book to the reader's bag
    path('reader/<int:reader_id>/add_to_bag/', add_to_bag, name='add_to_bag'),

    # Endpoint to handle book checkout
    path('reader/<int:reader_id>/checkout/', checkout_books, name='checkout_books'),
    
    path('reader/<int:reader_id>/checked_out_books/', get_checked_out_books, name='get_checked_out_books'),

    path('reader/<int:reader_id>/return_book/<int:book_id>/', return_book, name='return_book'),
]



