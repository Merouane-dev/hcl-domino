const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000; // ou process.env.PORT si besoin

// Middleware
app.use(cors());
app.use(express.json());

// 1) Servir les fichiers statiques depuis le dossier "public"
app.use(express.static("public"));

// 2) Route MOCK pour simuler l'API (si tu n'as pas de vrai Domino)
app.get("/api/files/:userId", (req, res) => {
  const { userId } = req.params;

  // Données simulées
  const mockDocuments = [
    {
      "@unid": "UNID123",
      userId: "12345",
      "$attachments": [
        { name: "fichier1.pdf" },
        { name: "fichier2.pdf" }
      ]
    },
    {
      "@unid": "UNID999",
      userId: "99999",
      "$attachments": [
        { name: "rapport.pdf" }
      ]
    }
  ];

  // Filtrer les "documents" pour cet userId
  const documents = mockDocuments.filter(doc => doc.userId === userId);

  // Retour si rien trouvé
  if (documents.length === 0) {
    return res.status(404).json({ message: "Aucun fichier trouvé pour cet utilisateur." });
  }

  // Construire la liste de PDFs
  const files = [];
  for (let doc of documents) {
    if (doc["$attachments"]) {
      for (let attachment of doc["$attachments"]) {
        files.push({
          name: attachment.name,
          // URL fictive puisqu'on simule
          url: `http://faux-serveur/fichiers/${attachment.name}`
        });
      }
    }
  }

  // Retourner la liste
  res.json(files);
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});
