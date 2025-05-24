using Microsoft.EntityFrameworkCore;
using TodoApp.Core.Entities;
using TodoApp.Core.Interfaces;
using TodoApp.Infrastructure.Data;

namespace TodoApp.Infrastructure.Repositories;

public class TodoRepository : ITodoRepository
{
    private readonly ApplicationDbContext _context;

    public TodoRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Todo>> GetAllAsync(string userId)
    {
        return await _context.Todos
            .Where(t => t.UserId == userId)
            .OrderByDescending(t => t.CreatedAt)
            .ToListAsync();
    }

    public async Task<Todo?> GetByIdAsync(Guid id, string userId)
    {
        return await _context.Todos
            .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);
    }

    public async Task<Todo> AddAsync(Todo todo)
    {
        _context.Todos.Add(todo);
        await _context.SaveChangesAsync();
        return todo;
    }

    public async Task<Todo> UpdateAsync(Todo todo)
    {
        _context.Entry(todo).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return todo;
    }

    public async Task DeleteAsync(Guid id, string userId)
    {
        var todo = await GetByIdAsync(id, userId);
        if (todo != null)
        {
            _context.Todos.Remove(todo);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<IEnumerable<Todo>> GetByStatusAsync(string userId, bool isCompleted)
    {
        return await _context.Todos
            .Where(t => t.UserId == userId && t.IsCompleted == isCompleted)
            .OrderByDescending(t => t.CreatedAt)
            .ToListAsync();
    }
} 