<img width="1334" height="631" alt="image" src="https://github.com/user-attachments/assets/b6b4e809-3376-41f1-8400-e1ed4ac6ee84" />
<img width="1362" height="634" alt="image" src="https://github.com/user-attachments/assets/feeef888-b20e-4bfb-b95b-616b5c2fb682" />


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
