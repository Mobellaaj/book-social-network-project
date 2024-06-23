import {Component, OnInit} from '@angular/core';
import {PageResponseBorrowedBookResponse} from "../../../../services/models/page-response-borrowed-book-response";
import {BorrowedBookResponse} from "../../../../services/models/borrowed-book-response";
import {BookService} from "../../../../services/services/book.service";

@Component({
  selector: 'app-return-books',
  templateUrl: './return-books.component.html',
  styleUrl: './return-books.component.scss'
})
export class ReturnBooksComponent implements OnInit{
  returnedBooks: PageResponseBorrowedBookResponse = {};
  page = 0;
  size = 3;
  message: string = '';
  level: string = 'success'

  constructor(
    private bookService: BookService
  ) {
  }

  ngOnInit(): void {
    this.findAllBorrowedBooks();
  }


  private findAllBorrowedBooks() {
    this.bookService.findAllReturnedBooks({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (resp: PageResponseBorrowedBookResponse) => {
        this.returnedBooks = resp;
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
    this.page = this.returnedBooks.totalPages as number - 1;
  }

  isLastPage(): boolean {
    return this.page == this.returnedBooks.totalPages as number - 1
  }

  approveBookReturn(book: BorrowedBookResponse) {
    if(!book.returned) {
      this.level = 'error';
      this.message = 'Book is not yet returned';
      return;
    }
    this.bookService.approveReturnBorrowedBook({
      'book-id': book.id as number
    }).subscribe({
      next: () => {
        this.level = 'success';
        this.message = 'Book return approved';
        this.findAllBorrowedBooks();
      }
    })
  }
}
