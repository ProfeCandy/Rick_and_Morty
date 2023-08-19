const app = require('../Server');
const session = require('supertest');
const agent = session(app);

describe("Test de RUTAS", () => {
  describe("GET /rickandmorty/character/:id", () => {
    it("Responde con status: 200", async () => {
      await agent.get('/rickandmorty/character/1').expect(200);
    });

    it("Responde un objeto con las propiedades: 'id', 'name', 'species', 'gender', 'status', 'origin' e 'image'", async () => {
      const response = await agent.get('/rickandmorty/character/1');
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("name");
      expect(response.body).toHaveProperty("species");
      expect(response.body).toHaveProperty("gender");
      expect(response.body).toHaveProperty("status");
      expect(response.body).toHaveProperty("origin");
      expect(response.body).toHaveProperty("image");
    });

    it("Si hay un error responde con status: 500", async () => {
      await agent.get('/rickandmorty/character/999999').expect(500);
    });
  });

  describe("GET /rickandmorty/login", () => {
    it("Responde con access: true para información de login correcta", async () => {
      const response = await agent.get('/rickandmorty/login').query({
        email: 'matias.quintanaballesteros@gmail.com',
        password: 'Jonylaburo16'
      });
      expect(response.body).toEqual({ access: true });
    });

    it("Responde con access: false para información de login incorrecta", async () => {
      const response = await agent.get('/rickandmorty/login').query({
        email: "email_incorrecto",
        password: 'tu-contraseña'
      });
      expect(response.body).toEqual({ access: false });
    });
  });

  describe("POST /rickandmorty/fav", () => {
    it("Lo que envíes por body debe ser devuelto en un arreglo", async () => {
      const characterToAdd = {
        id: 1,
        name: "Rick Sanchez",
        species: "Human",
        gender: "Male",
        status: "Alive",
        origin: { name: "Earth" },
        image: "https://example.com/rick.jpg"
      };
      const response = await agent.post('/rickandmorty/favs').send(characterToAdd);
      expect(response.status).toBe(200);
      expect(response.body).toContainEqual(characterToAdd);
    });

    it("Si envías un nuevo elemento por body, este debe ser devuelto en un arreglo que incluye un elemento enviado previamente", async () => {
      const character1 = {
        id: 1,
        name: "Rick Sanchez",
        species: "Human",
        gender: "Male",
        status: "Alive",
        origin: { name: "Earth" },
        image: "https://example.com/rick.jpg"
      };

      const character2 = {
        id: 2,
        name: "Morty Smith",
        species: "Human",
        gender: "Male",
        status: "Alive",
        origin: { name: "Earth" },
        image: "https://example.com/morty.jpg"
      };

      const response1 = await agent.post('/rickandmorty/favs').send(character1);
      const response2 = await agent.post('/rickandmorty/favs').send(character2);

      expect(response2.status).toBe(200);
      expect(response2.body).toContainEqual(character1);
      expect(response2.body).toContainEqual(character2);
    });
  });

  describe("DELETE /rickandmorty/favs/:id", () => {
    const myFavorites = [
      {
        gender: "Male",
        id: 1,
        image: "https://example.com/rick.jpg",
        name: "Rick Sanchez",
        origin: { name: "Earth" },
        species: "Human",
        status: "Alive",
      },
      {
        gender: "Male",
        id: 2,
        image: "https://example.com/morty.jpg",
        name: "Morty Smith",
        origin: { name: "Earth" },
        species: "Human",
        status: "Alive",
      },
    ];
  
    it("Responde con el arreglo previo si no hay un personaje con el ID enviado", async () => {
      const invalidId = 999; 
      const response = await agent.delete(`/rickandmorty/favs/${invalidId}`);
      
      const expectedIds = [...new Set(myFavorites.map(character => character.id))];
      const responseIds = [...new Set(response.body.map(character => character.id))];
      
      expect(responseIds).toEqual(expectedIds);
    });
  
    it("Elimina correctamente al personaje con el ID enviado", async () => {
      const characterToDelete = myFavorites[0];
      const response = await agent.delete(`/rickandmorty/favs/${characterToDelete.id}`);
      const updatedFavorites = myFavorites.filter(char => char.id !== characterToDelete.id);
  
      expect(response.status).toBe(200); 
      expect(response.body).toEqual(updatedFavorites);
    });
  });
  });


