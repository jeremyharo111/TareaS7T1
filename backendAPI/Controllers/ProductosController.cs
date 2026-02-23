using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backendAPI.Data;
using backendAPI.Models;

namespace backendAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductosController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Productos?estado=activos|descontinuados|todos
        // Sin parámetro o estado=activos: solo productos activos
        // estado=descontinuados: solo productos descontinuados
        // estado=todos: todos los productos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Producto>>> GetProductos([FromQuery] string? estado = "activos")
        {
            IQueryable<Producto> query = _context.Productos;

            switch (estado?.ToLower())
            {
                case "descontinuados":
                    query = query.Where(p => p.Descontinuado);
                    break;
                case "todos":
                    break;
                case "activos":
                default:
                    query = query.Where(p => !p.Descontinuado);
                    break;
            }

            return await query.ToListAsync();
        }

        // GET: api/Productos/5
        // Devuelve el producto sin importar si está descontinuado
        [HttpGet("{id}")]
        public async Task<ActionResult<Producto>> GetProducto(int id)
        {
            var producto = await _context.Productos.FindAsync(id);

            if (producto == null)
            {
                return NotFound();
            }

            return producto;
        }

        // POST: api/Productos
        [HttpPost]
        public async Task<ActionResult<Producto>> PostProducto(Producto producto)
        {
            _context.Productos.Add(producto);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProducto", new { id = producto.Id }, producto);
        }

        // PUT: api/Productos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProducto(int id, Producto producto)
        {
            if (id != producto.Id)
            {
                return BadRequest();
            }

            _context.Entry(producto).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Productos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProducto(int id)
        {
            var producto = await _context.Productos.FindAsync(id);
            if (producto == null)
            {
                return NotFound();
            }

            // Soft delete: Mark as discontinued instead of removing
            producto.Descontinuado = true;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductoExists(int id)
        {
            return _context.Productos.Any(e => e.Id == id);
        }
    }
}
