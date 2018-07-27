import { DOMModule } from '@zbigiman/constrjs.dom.module';

export class SearchComponent {

    constructor(shared) {

        var self = this;
        self.store = shared.store;

        self.DOMModule = new DOMModule();

        // Show Search Bar:
        self.toggleVal = (val) => {
            return !val;
        };

        var showSearch = false;
        document.querySelector('#search').addEventListener('click', (event) => {
            showSearch = self.toggleVal(showSearch);
            let searchBar = document.querySelector('.search-bar');

            if (showSearch === true) {
                self.DOMModule.addClass(searchBar, 'search-bar--visible');
                self.DOMModule.addClass(document.body, 'search-bar--visible');
                document.querySelector('#searchInput').focus();
            } else {
                self.DOMModule.removeClass(searchBar, 'search-bar--visible');
                self.DOMModule.removeClass(document.body, 'search-bar--visible');
            }
        });
       
        // Search function:

        // Search Input event listener:
        document.querySelector('#searchInput').addEventListener('keyup', (event) => {          
            self.store.set(self, 'searchTable.searchInput', event.target.value);          
        });

        // Watching Search Input:       
        self.store.watch(self, 'searchTable.searchInput', (data) => {
            
            let searchQuery = data.value;          
            let books = self.store.get(self, 'booksTable');
            
            let searchResults = books.filter((book) => {
                if (book.title.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1)
                    return book.title;
            });
            if (searchResults.length === 0) {
                searchResults = books;
            }

            self.store.set(self, 'searchTable.searchResults', searchResults);           

        });    

    }
}