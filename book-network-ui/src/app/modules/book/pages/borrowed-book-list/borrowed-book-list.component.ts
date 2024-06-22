import {Component, OnInit} from '@angular/core';
import {borrowBook} from "../../../../services/fn/book/borrow-book";
import {BorrowedBookResponse} from "../../../../services/models/borrowed-book-response";
import {PageResponseBorrowedBookResponse} from "../../../../services/models/page-response-borrowed-book-response";
import {returnBorrowedBook} from "../../../../services/fn/book/return-borrowed-book";
import {Router} from "@angular/router";
import {BookService} from "../../../../services/services/book.service";
import {BookResponse} from "../../../../services/models/book-response";
import {FeedbackRequest} from "../../../../services/models/feedback-request";

@Component({
  selector: 'app-borrowed-book-list',
  templateUrl: './borrowed-book-list.component.html',
  styleUrl: './borrowed-book-list.component.scss'
})
export class BorrowedBookListComponent implements OnInit{
  borrowedBooks: PageResponseBorrowedBookResponse = {};
  feedbackRequest: FeedbackRequest = {bookId: 0, comment: '', note: 0};
  page = 0;
  size = 3;
  selectedBook: BorrowedBookResponse = {};

  constructor(
    private bookService: BookService,
  ) {
  }

  ngOnInit(): void {
      this.findAllBorrowedBooks();
  }

  protected readonly borrowBook = borrowBook;

  returnBorrowedBook (book: BorrowedBookResponse) {
    this.selectedBook = book;

  };

  private findAllBorrowedBooks() {
    this.bookService.findAllBorrowedBooks({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (resp: PageResponseBorrowedBookResponse) => {
        this.borrowedBooks = resp;
      }
    })
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllBorrowedBooks();
  }

  goToPreviousPage() {
    this.page--;
    this.findAllBorrowedBooks();
  }

  goToPage(page: number) {
    this.page = page;
    this.findAllBorrowedBooks();
  }

  goToNextPage() {
    this.page++;
    this.findAllBorrowedBooks();
  }

  goToLastPage() {
    this.page = this.borrowedBooks.totalPages as number - 1;
  }

  isLastPage(): boolean {
    return this.page == this.borrowedBooks.totalPages as number - 1
  }
}
