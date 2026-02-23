<img width="1314" height="599" alt="image" src="https://github.com/user-attachments/assets/41f20171-f9bb-4d60-a571-48995a059fde" />
<img width="1308" height="601" alt="image" src="https://github.com/user-attachments/assets/9880efe3-55c1-46ee-9abe-21b5be07b3d3" />
<img width="1310" height="596" alt="image" src="https://github.com/user-attachments/assets/b462333a-8c93-49e2-b67f-e00526c909c3" />
<img width="1302" height="599" alt="image" src="https://github.com/user-attachments/assets/1ec1dcfd-2c0f-4915-8833-1be709d893c5" />
<img width="1312" height="597" alt="image" src="https://github.com/user-attachments/assets/cecf1ab5-5fcf-4b2f-ad4e-b4fe9f8a615a" />
<img width="1300" height="598" alt="image" src="https://github.com/user-attachments/assets/1bf821c4-6fa9-4d9c-8269-dd6ffee1ea6e" />
<img width="388" height="237" alt="image" src="https://github.com/user-attachments/assets/25a92b9c-7afd-4051-b5a0-0391811365b6" />

## Endpoints

### GET - Obtener productos

`GET` `https://localhost:7264/api/Productos`

`GET` `https://localhost:7264/api/Productos?estado=activos`

`GET` `https://localhost:7264/api/Productos?estado=todos`

`GET` `https://localhost:7264/api/Productos?estado=descontinuados`

**Query Params:**

- `estado`: `activos` | `descontinuados` | `todos` (default: `activos`)

### GET - Obtener producto por ID

`GET` `https://localhost:7264/api/Productos/{id}`

### POST - Crear producto

`POST` `https://localhost:7264/api/Productos`

```json
{
  "nombre": "Arroz Extra 1kg",
  "descripcion": "Arroz blanco de grano largo",
  "precio": 1.5,
  "stock": 100,
  "categoria": "Abarrotes",
  "descontinuado": false
}
```

### PUT - Actualizar producto

`PUT` `https://localhost:7264/api/Productos/{id}`

```json
{
  "id": 1,
  "nombre": "Arroz Extra 1kg (Oferta)",
  "descripcion": "Arroz blanco de grano largo - Promoción",
  "precio": 1.25,
  "stock": 90,
  "categoria": "Abarrotes",
  "descontinuado": false,
  "fechaCreacion": "2024-02-17T10:00:00Z"
}
```

### DELETE - Descontinuar producto

`DELETE` `https://localhost:7264/api/Productos/{id}`
