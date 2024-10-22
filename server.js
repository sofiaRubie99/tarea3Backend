const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para manejar JSON
app.use(express.json());
app.use(cors({ 
  origin: '*', 
  methods: 'GET, POST, PUT, DELETE, OPTIONS', 
}));

// Conexión a MongoDB
mongoose.connect('mongodb+srv://admin:12345@library.1hxit.mongodb.net/library?retryWrites=true&w=majority&appName=library', {
})
  .then(() => console.log('Conectado a MongoDB'))
  .catch((error) => console.error('Error conectando a MongoDB:', error));

//modelo 'authors'
const authorSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  author: { type: String, required: true },
  nationality: { type: String, required: true },
  birth_year: { type: Number, required: true },
  fields: { type: String },
  books: [
    {
      book_id: { type: Number, required: true },
      title: { type: String, required: true }
    }
  ]
});

const Author = mongoose.model('Author', authorSchema);

//modelo 'publishers'
const publisherSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  publisher: { type: String, required: true },
  country: { type: String, required: true },
  founded: { type: Number, required: true },
  genere: { type: String },
  books: [
    {
      book_id: { type: Number, required: true },
      title: { type: String, required: true }
    }
  ]
});

const Publisher = mongoose.model('Publisher', publisherSchema);

// Rutas para 'authors'

app.get('/authors', async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: 'Error obteniendo autores: ' + err.message });
  }
});

app.get('/authors/:id', async (req, res) => {
  try {
    const author = await Author.findOne({ id: req.params.id });
    if (!author) {
      return res.status(404).json({ message: 'Autor no encontrado' });
    }
    res.json(author);
  } catch (err) {
    res.status(500).json({ message: 'Error obteniendo el autor: ' + err.message });
  }
});

app.post('/authors', async (req, res) => {
  const author = new Author(req.body);
  try {
    const newAuthor = await author.save();
    res.status(201).json(newAuthor);
  } catch (err) {
    res.status(400).json({ message: 'Error al crear autor: ' + err.message });
  }
});


app.put('/authors/:id', async (req, res) => {
  try {
    const updatedAuthor = await Author.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedAuthor) {
      return res.status(404).json({ message: 'Autor no encontrado' });
    }
    res.json(updatedAuthor);
  } catch (err) {
    res.status(400).json({ message: 'Error al actualizar autor: ' + err.message });
  }
});


app.delete('/authors/:id', async (req, res) => {
  try {
    const deletedAuthor = await Author.findOneAndDelete({ id: req.params.id });
    if (!deletedAuthor) {
      return res.status(404).json({ message: 'Autor no encontrado' });
    }
    res.json({ message: 'Autor eliminado', author: deletedAuthor });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar autor: ' + err.message });
  }
});

//'publishers'

app.get('/publishers', async (req, res) => {
  try {
    const publishers = await Publisher.find();
    res.json(publishers);
  } catch (err) {
    res.status(500).json({ message: 'Error obteniendo editores: ' + err.message });
  }
});


app.get('/publishers/:id', async (req, res) => {
  try {
    const publisher = await Publisher.findOne({ id: req.params.id });
    if (!publisher) {
      return res.status(404).json({ message: 'Editor no encontrado' });
    }
    res.json(publisher);
  } catch (err) {
    res.status(500).json({ message: 'Error obteniendo el editor: ' + err.message });
  }
});


app.post('/publishers', async (req, res) => {
  const publisher = new Publisher(req.body);
  try {
    const newPublisher = await publisher.save();
    res.status(201).json(newPublisher);
  } catch (err) {
    res.status(400).json({ message: 'Error al crear editor: ' + err.message });
  }
});


app.put('/publishers/:id', async (req, res) => {
  try {
    const updatedPublisher = await Publisher.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedPublisher) {
      return res.status(404).json({ message: 'Editor no encontrado' });
    }
    res.json(updatedPublisher);
  } catch (err) {
    res.status(400).json({ message: 'Error al actualizar editor: ' + err.message });
  }
});


app.delete('/publishers/:id', async (req, res) => {
  try {
    const deletedPublisher = await Publisher.findOneAndDelete({ id: req.params.id });
    if (!deletedPublisher) {
      return res.status(404).json({ message: 'Editor no encontrado' });
    }
    res.json({ message: 'Editor eliminado', publisher: deletedPublisher });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar editor: ' + err.message });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
