# Journal: Operations Related to the Journal

## Routes Documentation

### Create New Journal

- **URL:** `/api/user/journal/create`
- **Method:** `POST`
- **Authentication required:** Yes
- **Description:** Creates a new journal Record for the user.

#### Request Body

```json
{
  "title": "My Monstera Deliciosa",
  "name": "Montsera",
  "species": "Montserra spp",
  "dateAcquired": "2024-09-15T09:32:00:00+0Z",
  "location": "Outdoor",
  "health": "Excellent",
  "message": "Tracking the growth of my new Monstera plant"
}
```

#### Success Response

- **Code:** 201 CREATED
- **Content:**

```json
{
  "message": "Journal created successfully."
}
```

#### Error Response

- **Code:** 400 BAD REQUEST
- **Content:**

  ```json
  {
    "message": "Unable to create journal with data."
  }
  ```

- **Code:** 401 UNAUTHORIZED
- **Content:**

```json
{
  "error": "Authentication required"
}
```

---

### Add Note To Journal

- **URL:** `/api/user/journal/add-note`
- **Method:** `PUT`
- **Authentication required:** Yes
- **Description:** Adds new entry into an existing journal record.

#### Request Body: Add Note

```json
{
  "journalId": "56743b-372334-45f",
  "content": "Message Content for the entry",
  "type": "text", // or image
  "text": "Message content here" // In case of uploading both image and text
}
```

#### Success Response: Add Note

- **Code:** 200 CREATED
- **Content:**

```json
{
  "message": "Journal note added successfully"
  "journal": updatedJournal
}
```

#### Error Response: Add Note

- **Code:** 404 BAD REQUEST
- **Content:**

  ```json
  {
    "message": "Plant journal not found for this user."
  }
  ```

- **Code:** 401 UNAUTHORIZED
- **Content:**

```json
{
  "message": "Unauthorized user"
}
```

---

### Delete Journal

- **URL:** `/api/user/journal/delete`
- **Method:** `DELETE`
- **Authentication required:** Yes
- **Description:** Deletes a journal record belonging to the user.

#### Url Parameter: Delete Journal

```json
{
  "id": "56743b-372334-45f"
}
```

#### Success Response: Delete Journal

- **Code:** 200 DELETED
- **Content:**

```json
{
  "message": "Journal deleted successfully"
}
```

#### Error Response: Delete Journal

- **Code:** 400 BAD REQUEST
- **Content:**

  ```json
  {
    "message": "Unable to delete requested journal."
  }
  ```

- **Code:** 401 UNAUTHORIZED
- **Content:**

```json
{
  "message": "Unauthorized user"
}
```
