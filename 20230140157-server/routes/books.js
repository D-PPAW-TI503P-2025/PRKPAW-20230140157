const express = require('express');
const router = express.Router();

let books = [
{id: 1, title: 'Book 1', author: 'Author 1'},
{id: 2, title: 'Book 2', author: 'Author 2'}
];

// GET all books
router.get('/', (req, res) => {
res.json(books);
});

// GET a single book by ID
router.get('/:id', (req, res) => {
const book = books.find(b => b.id === parseInt(req.params.id));
if (!book) return res.status(404).send('Book not found');
res.json(book);
});

// POST a new book
router.post('/', (req, res) => {
const { title, author } = req.body;
if (!title || !author) {
    return res.status(400).json({ message: 'Title and author are required' });
}
const book = {
    // Perbaikan: gunakan ID yang unik, misalnya ID maksimum + 1
    id: Math.max(...books.map(b => b.id), 0) + 1,
    title,
    author
};
books.push(book);
res.status(201).json(book);
});

// --- PENAMBAHAN METHOD PUT (UPDATE) ---
router.put('/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    // 1. Cek keberadaan buku
    if (!book) return res.status(404).send('Book not found');

    const { title, author } = req.body;
    // 2. Validasi input
    if (!title && !author) {
        return res.status(400).json({ message: 'At least one field (title or author) is required for update' });
    }

    // 3. Update data buku
    if (title) {
        book.title = title;
    }
    if (author) {
        book.author = author;
    }

    // 4. Kirim respons dengan buku yang telah diperbarui
    res.json(book);
});

// --- PENAMBAHAN METHOD DELETE ---
router.delete('/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
    
    // 1. Cek keberadaan buku
    if (bookIndex === -1) return res.status(404).send('Book not found');
    
    // 2. Hapus buku dari array menggunakan splice
    books.splice(bookIndex, 1);
    
    // 3. Kirim respons sukses (biasanya 204 No Content atau 200 OK)
    // Menggunakan 204 No Content adalah praktik yang baik untuk DELETE
    res.status(204).send(); 
});


module.exports = router;