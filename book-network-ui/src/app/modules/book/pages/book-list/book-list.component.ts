import {Component, OnInit} from '@angular/core';
import {BookService} from "../../../../services/services/book.service";
import {Router} from "@angular/router";
import {PageResponseBookResponse} from "../../../../services/models/page-response-book-response";
import {borrowBook} from "../../../../services/fn/book/borrow-book";
import {BookResponse} from "../../../../services/models/book-response";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit{
  bookResponse: PageResponseBookResponse = {};
  page = 0;
  size = 3;
  message: string = '';
  level: string = 'success'

  constructor(
    private router: Router,
    private bookService: BookService
  ) {
  }

  ngOnInit(): void {
        this.findAllBooks();
    }

  private findAllBooks() {
    this.bookService.findAllBooks({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (books) => {
        this.bookResponse = books;
    }
    });
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllBooks();
  }

  goToPreviousPage() {
    this.page--;
    this.findAllBooks();
  }

  goToPage(page: number) {
    this.page = page;
    this.findAllBooks();
  }

  goToNextPage() {
    this.page++;
    this.findAllBooks();
  }

  goToLastPage() {
    this.page = this.bookResponse.totalPages as number - 1;
  }

  isLastPage(): boolean {
    return this.page == this.bookResponse.totalPages as number - 1
  }

  borrowBook(book: BookResponse) {
    this.message = '';
    this.bookService.borrowBook({
      'book-id': book.id as number,
    }).subscribe({
      next: () => {
        this.level = 'success'
        this.message = 'Book successfully added to your Book List'
      },
      error: (err) => {
        console.log(err);
        this.level = 'error'
        this.message = err.error.error;
      }
    })
  }
}
