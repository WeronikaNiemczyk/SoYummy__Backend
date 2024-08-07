<h1>Zestawienie END POINTS</h1>
https://deploy-marek-b05855e6af89.herokuapp.com/api-docs/


SoYummy_BackEnd_groupNo_1/
│
├── .env
├── .env.example
├── app.js
├── package.json
├── package-lock.json
│
├── config/
│   └── passport.js
│
├── controllers/
│   ├── auth.controller.js
│   ├── recipe.controller.js
│   ├── auth/
│   │   ├── login.js
│   │   ├── logout.js
│   │   ├── resendVerificationEmail.js
│   │   ├── signup.js
│   │   ├── updateMail.js
│   │   ├── updateName.js
│   │   ├── updatePassword.js
│   │   ├── verifyEmail.js
│   ├── recipes/
│   │   ├── create.js
│   │   ├── get.js
│   │   ├── getById.js
│   │   ├── remove.js
│   │   ├── update.js
│
├── middlewares/
│   └── auth.js
│
├── models/
│   ├── recipe.model.js
│   └── user.model.js
│
├── routes/
│   ├── auth.routes.js
│   ├── email.routes.js
│   └── recipes.routes.js
│
├── services/
│   ├── email.service.js
│   ├── helpers.js
│   └── recipes.service.js
│
├── templates/
│   └── emailTemplate.mjml
│
└── validations/
    └── validation.js

Opis struktury
config/: Zawiera konfigurację, np. strategię Passport.js dla uwierzytelniania.
controllers/: Zawiera kontrolery odpowiedzialne za logikę biznesową. Rozdzielone na kontrolery autoryzacji i zarządzania przepisami.
middlewares/: Środkowe oprogramowanie, np. autoryzacja.
models/: Modele Mongoose definiujące schematy danych dla użytkowników i przepisów.
routes/: Definicje ścieżek API dla różnych funkcjonalności.
services/: Moduły pomocnicze, np. wysyłanie e-maili.
templates/: Szablony e-maili.
validations/: Walidacja danych wejściowych.
Graficzny schemat aplikacji

Tytuł: Schemat aplikacji "SoYummy_BackEnd_groupNo_1"

+------------------+
| Client Interface |  <--- JSON Requests (Postman/Insomnia)
+------------------+
          |
          v
+----------------+
|   app.js       |
|   (Express.js) |
+----------------+
          |
          v
+-------------------------+
|     Routes              |
| (auth, recipes, emails) |
+-------------------------+
          |
          v
+---------------------------+
|    Controllers            |
| (auth.controller,         |
|  recipe.controller,       |
|  auth/[login, signup...], |
|  recipes/[create, get...])|
+---------------------------+
          |
          v
+-----------------------+
|      Services         |
| (email.service,       |
|  recipes.service,     |
|  helpers)             |
+-----------------------+
          |
          v
+---------------------+
|      Models         |
| (user.model,        |
|  recipe.model)      |
+---------------------+
          |
          v
+------------------------+
| MongoDB Database       |
+------------------------+

Client Interface: Użytkownicy końcowi interfejsu aplikacji (np. Postman, Insomnia) wysyłają żądania HTTP.
app.js: Główny plik aplikacji Express.js, który uruchamia serwer i rejestruje ścieżki.
Routes: Definiują ścieżki API i kierują żądania do odpowiednich kontrolerów.
Controllers: Przetwarzają logikę biznesową, wywołując odpowiednie usługi i zwracając odpowiedzi.
Services: Oferują funkcje pomocnicze, np. wysyłanie e-maili, operacje na bazie danych.
Models: Definiują schematy danych w MongoDB.
MongoDB Database: Przechowuje dane użytkowników, przepisów i inne.
Ten schemat ilustruje przepływ danych od klienta do bazy danych oraz organizację kodu według funkcji i odpowiedzialności.
😊
