const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const BookModel = require('./models/Book');
const MemberModel = require('./models/Member');
const BorrowingModel = require('./models/Borrowing')
const ReadingProgressModel = require('./models/ReadingProgress');



const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect("mongodb+srv://21b01a1264:pranya@cluster0.l4sds5b.mongodb.net/Digital_Library_Management_System?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("Database connected");
  })
  .catch(err => {
    console.error(err);
  });


//Book Model
// GET - List all books with pagination and filters
app.get('/api/books', (req, res) => {
  const { page = 1, limit = 10, genre, author } = req.query;
  const query = {};
  if (genre) query.genre = genre;
  if (author) query.author = author;

  BookModel.find(query)
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .then(books => {
      res.json(books);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});



// GET  - Get book details with availability
app.get('/api/books/:id', (req, res) => {

  BookModel.findOne({ id: req.params.id })
    .then(book => res.json(book))
    .catch(err => res.json(err))
});


// POST  - Add new book
app.post('/api/books', (req, res) => {
  BookModel.create(req.body)
    .then(book => res.json(book))
    .catch(err => res.json(err));
});


// GET- Get books by genre
app.get('/api/books/genre/:genre', (req, res) => {
  BookModel.find({ genre: req.params.genre })
    .then(book => res.json(book))
    .catch(err => res.json(err))

});
// PUT 
app.put('/api/books/:id', (req, res) => {
  BookModel.findOneAndUpdate({ id: req.params.id }, req.body, { new: true })
    .then(book => res.json(book))
    .catch(err => res.json(err))
})

// Member

//Get All Members
app.get('/api/members', (req, res) => {
  const { page = 1, limit = 10, status, membershipType } = req.query;

  // Construct the query object based on optional filters
  const query = {};
  if (status) query.status = status;
  if (membershipType) query.membershipType = membershipType;

  MemberModel.find(query)
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .then(members => {
      res.json(members);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

//  GET- Get member details with current borrowings
app.get('/api/members/:id', (req, res) => {
  MemberModel.findOne({ id: req.params.id })
    .then(member => {
      BorrowingModel.find({ memberId: req.params.id, status: 'active' })
        .then(borrowings => {
          res.json({ member, borrowings });
        });
    })
    .catch(err => res.json(err));
});

// POST- Register new member
app.post('/api/members', (req, res) => {
  MemberModel.create(req.body)
    .then(member => res.json(member))
    .catch(err => res.json(err))
})
// PUT - Update member details

app.put('/api/members/:id', (req, res) => {
  MemberModel.findOneAndUpdate({ id: req.params.id }, req.body, { new: true })
    .then(member => res.json(member))
    .catch(err => res.json(err))

})

// GET - Get member's borrowing history

app.get('/api/members/:id/history', (req, res) => {
  BorrowingModel.find({ memberId: req.params.id })
    .populate('bookId')
    .then(borrowings => {
      res.json(borrowings);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});



// Borrowing

// GET - List all borrowings with pagination

app.get('/api/borrowings', (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  BorrowingModel.find()
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .then(borrowings => {
      res.json(borrowings);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});


// POST - Create new borrowing
app.post('/api/borrowings', (req, res) => {
  BorrowingModel.create(req.body)
    .then(borrowing => res.json(borrowing))
    .catch(err => res.json(err))
})


// PUT - Process return of book

app.put('/api/borrowings/:id/return', (req, res) => {
  BorrowingModel.findOne({ id: req.params.id })
    .then(borrowing => {
      if (borrowing) {
        return borrowing.updateOne({ returnDate: new Date(), status: 'returned' })
          .then(updatedBorrowing => {
            res.json(updatedBorrowing);
          });
      } else {
        res.status(404).json({ message: 'Borrowing not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});


// GET - Get overdue borrowings
app.get('/api/borrowings/overdue', (req, res) => {

  BorrowingModel.find({
    status: 'active',
    dueDate: { $lt: new Date() },
    // returnDate: null, 
  })
    .then(overdueBorrowings => {
      res.json(overdueBorrowings);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});



//  // GET - Get member’s borrowings

app.get('/api/borrowings/member/:memberId', (req, res) => {
  const { memberId } = req.params;
  BorrowingModel.find({ memberId })
    .populate('bookId')
    .then(borrowings => {
      res.json(borrowings);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});



// Reading Progress

// GET - Get reading progress
app.get('/api/progress/:borrowingId', (req, res) => {
  const { borrowingId } = req.params;

  ReadingProgressModel.findOne({ borrowingId })
    .then(progress => {
      res.json(progress);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});



// POST - Update reading progress
app.post('/api/progress', (req, res) => {
  ReadingProgressModel.create(req.body)
    .then(progress => res.json(progress))
    .catch(err => res.json(err))
})

// GET - Get member’s reading analytics

app.get('/api/progress/analytics/member/:memberId', (req, res) => {
  ReadingProgressModel.aggregate([
    { $match: { memberId: req.params.memberId } },
    { $group: { _id: null, totalReadingTime: { $sum: '$readingTime' } } }
  ])
    .then(([analytics]) => res.json(analytics || { totalReadingTime: 0 }))
    .catch(err => res.status(500).json({ error: err.message }));
});





app.listen(3005, () => {
  console.log("Server is running on port 3005");
});
